// src/pages/NotFound.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-9xl font-bold font-['Manrope'] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
          >
            404
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-yellow-200 rounded-full opacity-50"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-['Manrope'] mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let us help you find your way back.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Compass className="w-5 h-5" />
            Explore Services
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-400">
          <p>Need help? Contact our support team</p>
          <a
            href="mailto:rasoaf24@gmail.com"
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            rasoaf24@gmail.com
          </a>
        </div>
      </motion.div>
    </div>
  );
}