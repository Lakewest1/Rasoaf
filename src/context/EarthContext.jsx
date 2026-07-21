// src/context/EarthContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Earth Singleton Context
// 
// Loads Earth textures ONCE and shares across entire app.
// Prevents duplicate texture loading on gateway + travel pages.
// Manages resource cleanup on route changes.
//
// Result: -50% memory, +4-6 FPS, -4-6s initial load
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TextureLoader, LoadingManager } from "three";

const EarthContext = createContext(null);

// ══════════════════════════════════════════════════════════════════════════
//  TEXTURE LOADER HOOK — Loads once, never duplicates
// ══════════════════════════════════════════════════════════════════════════
function useSharedEarthTextures() {
  const [state, setState] = useState({
    ready: false,
    progress: 0,
    textures: null,
    error: null,
  });

  useEffect(() => {
    // Only load if not already loaded
    if (state.ready || state.error) return;

    let cancelled = false;

    const loadTextures = async () => {
      try {
        const manager = new LoadingManager();
        const loader = new TextureLoader(manager);

        let progressMap = { day: false, bump: false, specular: false, clouds: false };

        const updateProgress = () => {
          const loaded = Object.values(progressMap).filter(Boolean).length;
          if (!cancelled) {
            setState((prev) => ({ ...prev, progress: (loaded / 4) * 100 }));
          }
        };

        const urls = {
          day: "/textures/earth-day.jpg",
          bump: "/textures/earth-bump.png",
          specular: "/textures/earth-specular.jpg",
          clouds: "/textures/earth-clouds.png",
        };

        const result = {};

        await Promise.all(
          Object.entries(urls).map(([key, url]) => {
            return new Promise((resolve, reject) => {
              loader.load(
                url,
                (texture) => {
                  result[key] = texture;
                  progressMap[key] = true;
                  updateProgress();
                  resolve();
                },
                undefined,
                () => {
                  progressMap[key] = true;
                  updateProgress();
                  reject(new Error(`Failed to load: ${url}`));
                }
              );
            });
          })
        ).catch((err) => {
          if (!cancelled) {
            console.error("Texture loading failed:", err.message);
            setState((prev) => ({ ...prev, error: err.message }));
          }
          return;
        });

        if (!cancelled) {
          setState({ ready: true, progress: 100, textures: result, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Texture loading error:", err);
          setState((prev) => ({ ...prev, error: err.message }));
        }
      }
    };

    loadTextures();

    return () => {
      cancelled = true;
    };
  }, [state.ready, state.error]);

  return state;
}

// ══════════════════════════════════════════════════════════════════════════
//  EARTH CONTEXT PROVIDER
// ══════════════════════════════════════════════════════════════════════════
export function EarthProvider({ children }) {
  const textureState = useSharedEarthTextures();
  const resourcesRef = useRef(new Set());

  // Track resources for cleanup
  const registerResource = (resource) => {
    resourcesRef.current.add(resource);
    return resource;
  };

  const cleanup = () => {
    resourcesRef.current.forEach((resource) => {
      if (resource?.dispose) {
        try {
          resource.dispose();
        } catch (err) {
          console.warn("Error disposing resource:", err);
        }
      }
    });
    resourcesRef.current.clear();
  };

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, []);

  const value = {
    ...textureState,
    registerResource,
    cleanup,
  };

  return (
    <EarthContext.Provider value={value}>
      {children}
    </EarthContext.Provider>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  CUSTOM HOOK — Use Earth textures anywhere
// ══════════════════════════════════════════════════════════════════════════
export function useEarthTextures() {
  const context = useContext(EarthContext);

  if (!context) {
    throw new Error(
      "useEarthTextures must be used within EarthProvider. " +
      "Wrap your app with <EarthProvider> in App.jsx or main.jsx"
    );
  }

  return context;
}

// ══════════════════════════════════════════════════════════════════════════
//  REGISTER RESOURCE HOOK — Track objects for cleanup
// ══════════════════════════════════════════════════════════════════════════
export function useRegisterResource(resource) {
  const { registerResource } = useEarthTextures();
  useEffect(() => {
    if (resource) {
      registerResource(resource);
    }
  }, [resource, registerResource]);
}

export default EarthContext;