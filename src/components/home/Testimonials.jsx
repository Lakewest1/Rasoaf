// src/components/home/Testimonials.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Testimonials Section
//
// A premium social proof section featuring authentic pilgrim experiences.
// Designed to build trust, emotional reassurance, and credibility.
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: Featured testimonial + 3-column grid
// Animation: Fade-up on scroll, hover lift, staggered reveal
// Responsive: 3 → 2 → 1 columns (desktop → tablet → mobile)
// Mobile: Carousel slider with RTL (right to left) sliding
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Star,
  Quote,
  MapPin,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  X,
  Globe,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ── Testimonials Data ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: "Alhaja Zainab Atolagbe",
    location: "Lagos, Nigeria",
    role: "First-time Pilgrim",
    rating: 5,
    journeyType: "Hajj & Umrah",
    year: "2025",
    isVerified: true,
    isFeatured: true,
    language: "en",
    badge: "First-time Pilgrim",
    excerpt:
      "My first pilgrimage journey to Makkah and Madinah with RASAOF Travels and Tours Limited was truly memorable and highly satisfying...",
    fullText: `My first pilgrimage journey to Makkah and Madinah with RASAOF Travels and Tours Limited was truly memorable and highly satisfying. From the initial consultation at their office to the completion of the entire trip, the level of professionalism, care, and attention I received was exceptional.

The journey was well coordinated from the moment we departed from Murtala Muhammed International Airport through our arrival in Saudi Arabia. The arrangements for transportation, accommodation, and movement within Makkah, Madinah, and other locations were seamless, making the experience both comfortable and spiritually fulfilling.

Although I have not traveled with other Hajj and Umrah agencies before, my experience with RASAOF Travels and Tours Limited has given me complete confidence in their services. Their commitment to customer satisfaction, effective communication, and professional guidance throughout the pilgrimage exceeded my expectations.

Based on this remarkable experience, I have no hesitation in recommending RASAOF Travels and Tours Limited to anyone planning Hajj or Umrah. I also look forward to undertaking my future pilgrimage journeys with the same organization.`,
    arabicFull: `كانت رحلتي الأولى للحج والعمرة إلى مكة المكرمة والمدينة المنورة مع شركة رصوف للسفر والسياحة المحدودة تجربة لا تُنسى ومُرضية للغاية. منذ الاستشارة الأولية في مكتبهم وحتى انتهاء الرحلة، كان مستوى الاحترافية والرعاية والاهتمام الذي تلقيته استثنائيًا.

كانت الرحلة مُنظمة بشكل ممتاز منذ لحظة مغادرتنا من مطار مورتالا محمد الدولي وحتى وصولنا إلى المملكة العربية السعودية. كانت ترتيبات النقل والإقامة والتنقل داخل مكة المكرمة والمدينة المنورة وغيرها من المواقع سلسة للغاية، مما جعل التجربة مريحة ومُفعمة بالروحانية.

على الرغم من أنني لم أسافر مع وكالات حج وعمرة أخرى من قبل، إلا أن تجربتي مع شركة رصوف للسفر والسياحة المحدودة منحتني ثقة كاملة في خدماتهم. لقد فاق التزامهم برضا العملاء، والتواصل الفعال، والإرشاد المهني طوال فترة الحج والعمرة توقعاتي.

بناءً على هذه التجربة الرائعة، أوصي بشدة بشركة رصوف للسفر والسياحة المحدودة لكل من يُخطط لأداء فريضة الحج أو العمرة. أتطلع أيضاً إلى القيام برحلات الحج المستقبلية مع نفس المنظمة.`,
  },
  {
    id: 2,
    name: "Mrs. Bolatito Ahmeed",
    location: "Lagos, Nigeria",
    role: "Returning Pilgrim",
    rating: 5,
    journeyType: "Hajj",
    year: "2025",
    isVerified: true,
    isFeatured: false,
    language: "en",
    badge: "Returning Pilgrim",
    excerpt:
      "I understand that preparing for Hajj is not an easy task, and choosing the right travel agency is one of the most important decisions a pilgrim can make...",
    fullText: `I understand that preparing for Hajj is not an easy task, and choosing the right travel agency is one of the most important decisions a pilgrim can make. A friend of mine once told me about an organization whose services were so exceptional that anyone who traveled with them would never consider using another agency. That organization was RASAOF Travels and Tours Limited.

Before my recent pilgrimage, I had traveled to Makkah and Madinah on two separate occasions through other agencies. While I was grateful for the opportunity to perform my religious obligations, I must admit that my previous experiences were not particularly encouraging.

While discussing my concerns with a friend, she highly recommended RASAOF Travels and Tours Limited. She shared how the organization had successfully assisted her daughter with her travel plans to Canada and how impressed she was with their professionalism. When she later used their services for her Hajj journey, she described the experience as remarkable and well organized.

Based on her recommendation, I decided to travel with RASAOF Travels and Tours Limited for my most recent Hajj pilgrimage. I can confidently say that the experience exceeded my expectations. From the planning stage to the completion of the journey, every aspect of the trip was handled with professionalism, efficiency, and genuine care for the pilgrims.

The arrangements were excellent, the guidance was clear, and the overall coordination throughout the pilgrimage was outstanding. The entire journey was comfortable, spiritually fulfilling, and stress-free.

I am pleased to recommend RASAOF Travels and Tours Limited to anyone seeking a reliable and professional Hajj and Umrah travel partner. My experience with them was truly exceptional, and I look forward to traveling with them again in the future.`,
    arabicFull: `أدرك تمامًا أن الاستعداد للحج ليس بالأمر الهين، وأن اختيار وكالة السفر المناسبة يُعدّ من أهم القرارات التي يتخذها الحاج. أخبرتني صديقة لي ذات مرة عن شركة خدماتها استثنائية لدرجة أن كل من سافر معها لن يفكر أبدًا في التعامل مع أي وكالة أخرى. هذه الشركة هي رصوف للسفر والسياحة المحدودة.

قبل حجّي الأخير، سافرت إلى مكة المكرمة والمدينة المنورة مرتين منفصلتين عبر وكالات أخرى. ورغم امتناني لفرصة أداء مناسك الحج، إلا أنني أقرّ بأن تجاربي السابقة لم تكن مُشجّعة.

عندما كنت أناقش مخاوفي مع صديقتي، أوصتني بشدة بشركة رصوف للسفر والسياحة المحدودة. وأخبرتني كيف ساعدت الشركة ابنتها بنجاح في التخطيط لرحلتها إلى كندا، وكيف انبهرت باحترافيتهم. وعندما استخدمت خدماتهم لاحقًا في رحلة الحج، وصفت التجربة بأنها رائعة ومنظمة تنظيماً دقيقاً.

بناءً على توصيتها، قررتُ السفر مع شركة راسوف للسفر والسياحة المحدودة لأداء فريضة الحج الأخيرة. وبكل ثقة، أستطيع القول إن التجربة فاقت توقعاتي. فمنذ مرحلة التخطيط وحتى انتهاء الرحلة، تم التعامل مع كل جانب من جوانبها باحترافية وكفاءة واهتمام حقيقي بالحجاج.

كانت الترتيبات ممتازة، والإرشادات واضحة، والتنسيق العام طوال فترة الحج رائعًا. كانت الرحلة بأكملها مريحة، ومُرضية روحياً، وخالية من التوتر.

يسرني أن أوصي بشركة راسوف للسفر والسياحة المحدودة لكل من يبحث عن شريك سفر موثوق ومحترف لأداء فريضة الحج والعمرة. لقد كانت تجربتي معهم استثنائية حقاً، وأتطلع إلى السفر معهم مرة أخرى في المستقبل.`,
  },
  {
    id: 3,
    name: "Alhaji Abdulrahman Oke",
    location: "Ibadan, Nigeria",
    role: "Group Traveler",
    rating: 5,
    journeyType: "Umrah",
    year: "2024",
    isVerified: true,
    isFeatured: false,
    language: "en",
    badge: "Group Traveler",
    excerpt:
      "I became acquainted with RASAOF Travels and Tours Limited long before they established a strong online presence through their website...",
    fullText: `I became acquainted with RASAOF Travels and Tours Limited long before they established a strong online presence through their website. Even then, they had already built a reputation for providing reliable and professional travel services.

It was RASAOF Travels and Tours Limited that guided me through my first Umrah journey. From the initial planning stage to the completion of the pilgrimage, the experience was smooth, encouraging, and highly satisfactory. Their team provided the necessary support and guidance, ensuring that every aspect of the trip was properly organized.

One of the qualities that impressed me most was their affordability. Compared to several other travel agencies I had consulted, whose charges were significantly higher, RASAOF Travels and Tours Limited offered excellent value without compromising the quality of service. In some cases, other agencies quoted fees that were almost three times higher than what I paid through RASAOF.

Beyond the financial aspect, I found the organization to be genuinely committed to the spiritual well-being and comfort of pilgrims. Their guidance, dedication, and professionalism created an atmosphere that allowed travelers to focus on the true purpose of their pilgrimage.

Based on my experience, I can confidently say that RASAOF Travels and Tours Limited is a trustworthy and dependable partner for anyone planning Hajj or Umrah. Their commitment to excellent service, affordability, and customer satisfaction makes them a highly recommended choice for prospective pilgrims.`,
    arabicFull: `تعرفت على شركة رصيف للسفر والسياحة قبل وقت طويل من تأسيسها موقعًا إلكترونيًا قويًا. وحتى قبل ذلك، كانت قد رسخت سمعة طيبة في تقديم خدمات سفر موثوقة واحترافية.

كانت شركة رصيف للسفر والسياحة هي من أرشدتني خلال رحلتي الأولى لأداء العمرة. من مرحلة التخطيط الأولية وحتى إتمام المناسك، كانت التجربة سلسة ومشجعة ومرضية للغاية. قدم فريقهم الدعم والتوجيه اللازمين، وضمنوا تنظيم كل جانب من جوانب الرحلة على أكمل وجه.

من أكثر ما أعجبني في الشركة أسعارها المعقولة. فمقارنةً بالعديد من وكالات السفر الأخرى التي استشرتها، والتي كانت أسعارها أعلى بكثير، قدمت شركة رصيف للسفر والسياحة قيمة ممتازة دون المساس بجودة الخدمة. في بعض الحالات، طلبت وكالات أخرى رسومًا تقارب ثلاثة أضعاف ما دفعته لشركة رصيف.

وبعيدًا عن الجانب المالي، وجدت أن الشركة ملتزمة التزامًا حقيقيًا بالرفاهية الروحية وراحة المعتمرين. بفضل توجيهاتهم وتفانيهم واحترافيتهم، وفّروا جوًا سمح للمسافرين بالتركيز على الغاية الحقيقية من رحلتهم.

وبناءً على تجربتي، أستطيع أن أؤكد بثقة أن شركة رصاف للسفر والسياحة المحدودة شريكٌ جدير بالثقة والاعتماد لكل من يخطط لأداء فريضة الحج أو العمرة. فالتزامهم بتقديم خدمة ممتازة، وأسعار معقولة، ورضا العملاء يجعلهم خيارًا موصى به بشدة للحجاج المحتملين.`,
  },
  {
    id: 4,
    name: "Dr. Fatima Bello",
    location: "Abuja, Nigeria",
    role: "Medical Professional",
    rating: 5,
    journeyType: "Umrah",
    year: "2024",
    isVerified: true,
    isFeatured: false,
    language: "en",
    badge: "Medical Professional",
    excerpt:
      "As a medical professional, I was particularly concerned about health and safety during my Umrah journey...",
    fullText: `As a medical professional, I was particularly concerned about health and safety during my Umrah journey. RASAOF Travels and Tours Limited exceeded my expectations in every way. Their attention to health protocols, hygiene standards, and emergency preparedness was outstanding.

The team ensured that all our medical needs were met, from accessible facilities to prompt medical assistance when needed. They also provided clear health guidance before and during the journey, which gave me and my family complete peace of mind.

What impressed me most was the genuine care they showed for every pilgrim's well-being. The staff were attentive, compassionate, and always available to address any concerns. The entire experience was seamless, spiritually uplifting, and professionally managed.

I would highly recommend RASAOF Travels and Tours Limited to anyone seeking a pilgrimage that prioritizes both spiritual fulfillment and physical safety.`,
    arabicFull: `كطبيبة، كنت قلقة بشكل خاص بشأن الصحة والسلامة خلال رحلة العمرة. تجاوزت شركة رصوف للسفر والسياحة المحدودة توقعاتي في كل الجوانب. كان اهتمامهم ببروتوكولات الصحة، ومعايير النظافة، والاستعداد للطوارئ ممتازًا.

تأكد الفريق من تلبية جميع احتياجاتنا الطبية، بدءًا من المرافق المتاحة إلى المساعدة الطبية الفورية عند الحاجة. قدموا أيضًا إرشادات صحية واضحة قبل الرحلة وأثنائها، مما منحني أنا وعائلتي راحة بال تامة.

ما أثار إعجابي أكثر هو الاهتمام الحقيقي الذي أظهروه لرفاهية كل حاج. كان الموظفون منتبهين ومتعاطفين ومتاحين دائمًا لمعالجة أي مخاوف. كانت التجربة بأكملها سلسة ومُثرية روحياً ومدارة باحترافية.

أوصي بشدة بشركة رصوف للسفر والسياحة المحدودة لكل من يبحث عن رحلة حج وعمرة تجمع بين الإشباع الروحي والسلامة الجسدية.`,
  },
];

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, size = 16 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? "#D4A017" : "none"}
          color={i < rating ? "#D4A017" : "rgba(0,0,0,0.12)"}
          strokeWidth={i < rating ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

// ── Quote Icon ──────────────────────────────────────────────────────────────
function QuoteIcon({ size = 32 }) {
  return (
    <div
      style={{
        color: "rgba(212,160,23,0.12)",
        position: "absolute",
        top: "clamp(12px, 1.5vw, 20px)",
        right: "clamp(12px, 1.5vw, 20px)",
      }}
    >
      <Quote size={size} />
    </div>
  );
}

// ── Featured Testimonial ────────────────────────────────────────────────────
function FeaturedTestimonial({ testimonial, inView }) {
  const [expanded, setExpanded] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const delay = 0.1;

  const toggleExpand = () => {
    setShowFull(!showFull);
    if (!showFull) setExpanded(true);
  };

  const handleClose = () => {
    setShowFull(false);
    setTimeout(() => setExpanded(false), 300);
  };

  return (
    <>
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: `
            opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
          `,
          marginBottom: "clamp(32px, 5vh, 48px)",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #FFF8E6 0%, #FFFBEF 100%)",
            borderRadius: "24px",
            padding: "clamp(28px, 4vw, 48px) clamp(24px, 3vw, 40px)",
            border: "1px solid rgba(212,160,23,0.15)",
            boxShadow: "0 4px 24px rgba(212,160,23,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #D4A017, #F7C948, #D4A017)",
              borderRadius: "24px 24px 0 0",
            }}
          />

          <QuoteIcon size={48} />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.65rem, 0.75vw, 0.8rem)",
              fontWeight: 600,
              color: "#D4A017",
              background: "rgba(212,160,23,0.1)",
              padding: "4px 14px",
              borderRadius: "50px",
              marginBottom: "12px",
            }}
          >
            <BadgeCheck size={14} />
            <span>Verified Pilgrim</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "2px",
                  letterSpacing: "-0.01em",
                }}
              >
                {testimonial.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.8rem, 0.85vw, 0.9rem)",
                    color: "#5F5F5F",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MapPin size={14} />
                  {testimonial.location}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.7rem, 0.75vw, 0.8rem)",
                    color: "#5F5F5F",
                    background: "rgba(0,0,0,0.04)",
                    padding: "2px 12px",
                    borderRadius: "50px",
                  }}
                >
                  {testimonial.journeyType} {testimonial.year}
                </span>
              </div>
            </div>
            <StarRating rating={testimonial.rating} size={20} />
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.9rem, 1vw, 1rem)",
              color: "#2d3748",
              lineHeight: 1.8,
              marginBottom: "16px",
            }}
          >
            {testimonial.fullText.slice(0, 300)}
            {testimonial.fullText.length > 300 && (
              <span
                style={{
                  color: "#D4A017",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginLeft: "4px",
                }}
                onClick={toggleExpand}
              >
                ...Read More
              </span>
            )}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(212,160,23,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.7rem, 0.75vw, 0.85rem)",
                  fontWeight: 600,
                  color: "#D4A017",
                }}
              >
                ⭐ Featured Testimonial
              </span>
            </div>
            <button
              onClick={toggleExpand}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.8rem, 0.85vw, 0.9rem)",
                fontWeight: 600,
                color: "#D4A017",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 16px",
                borderRadius: "50px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,160,23,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>Read Full Story</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Full Story Modal */}
      {showFull && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 4vw, 60px)",
            animation: "modalFade 0.3s ease",
          }}
          onClick={handleClose}
        >
          <style>
            {`
              @keyframes modalFade {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes modalScale {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}
          </style>
          <div
            style={{
              maxWidth: "700px",
              width: "100%",
              maxHeight: "80vh",
              background: "#ffffff",
              borderRadius: "24px",
              padding: "clamp(28px, 4vw, 48px)",
              overflowY: "auto",
              animation: "modalScale 0.3s ease",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              style={{
                position: "sticky",
                top: 0,
                float: "right",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.04)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,160,23,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.04)";
              }}
            >
              <X size={20} />
            </button>

            <div style={{ marginTop: "8px" }}>
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}
              >
                {testimonial.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.85rem, 0.9vw, 0.95rem)",
                    color: "#5F5F5F",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MapPin size={14} />
                  {testimonial.location}
                </span>
                <StarRating rating={testimonial.rating} size={18} />
              </div>

              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  color: "#2d3748",
                  lineHeight: 1.9,
                  whiteSpace: "pre-wrap",
                }}
              >
                {testimonial.fullText}
              </div>

              {testimonial.arabicFull && (
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <details>
                    <summary
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.8rem, 0.85vw, 0.9rem)",
                        fontWeight: 600,
                        color: "#D4A017",
                        cursor: "pointer",
                      }}
                    >
                      <Globe size={14} style={{ display: "inline", marginRight: "6px" }} />
                      Read in Arabic
                    </summary>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.9rem, 1vw, 1rem)",
                        color: "#2d3748",
                        lineHeight: 1.9,
                        marginTop: "12px",
                        whiteSpace: "pre-wrap",
                        direction: "rtl",
                        textAlign: "right",
                      }}
                    >
                      {testimonial.arabicFull}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({ testimonial, index, inView, isCarousel = false }) {
  const [expanded, setExpanded] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const delay = 0.08 * (index + 1);

  const toggleExpand = () => {
    setShowFull(!showFull);
    if (!showFull) setExpanded(true);
  };

  const handleClose = () => {
    setShowFull(false);
    setTimeout(() => setExpanded(false), 300);
  };

  return (
    <>
      <div
        className="testimonial-card-wrapper"
        style={{
          opacity: isCarousel ? 1 : (inView ? 1 : 0),
          transform: isCarousel ? "none" : (inView ? "translateY(0)" : "translateY(30px)"),
          transition: isCarousel ? "none" : `
            opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
          `,
          height: "100%",
          width: "100%",
          flexShrink: 0,
        }}
      >
        <div
          className="testimonial-card"
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "clamp(20px, 2.5vw, 28px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
            transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
            position: "relative",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            if (!isCarousel) {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.06)";
              e.currentTarget.style.borderColor = "rgba(212,160,23,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isCarousel) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)";
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
            }
          }}
        >
          <QuoteIcon size={28} />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "10px",
              marginTop: "4px",
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "2px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {testimonial.name}
              </h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.65rem, 0.75vw, 0.8rem)",
                    color: "#5F5F5F",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <MapPin size={12} />
                  {testimonial.location}
                </span>
                {testimonial.badge && (
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.5rem, 0.55vw, 0.65rem)",
                      fontWeight: 600,
                      color: "#D4A017",
                      background: "rgba(212,160,23,0.08)",
                      padding: "2px 10px",
                      borderRadius: "50px",
                    }}
                  >
                    {testimonial.badge}
                  </span>
                )}
              </div>
            </div>
            <StarRating rating={testimonial.rating} size={14} />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.5rem, 0.55vw, 0.65rem)",
              fontWeight: 500,
              color: "rgba(0,0,0,0.4)",
              marginBottom: "10px",
            }}
          >
            <BadgeCheck size={12} color="#D4A017" />
            <span>Verified Pilgrim</span>
            <span style={{ color: "rgba(0,0,0,0.15)" }}>•</span>
            <span>{testimonial.journeyType} {testimonial.year}</span>
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.8rem, 0.85vw, 0.9rem)",
              color: "#2d3748",
              lineHeight: 1.7,
              flex: 1,
              marginBottom: "12px",
            }}
          >
            {testimonial.fullText.slice(0, 180)}
            {testimonial.fullText.length > 180 && (
              <span
                style={{
                  color: "#D4A017",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginLeft: "3px",
                }}
                onClick={toggleExpand}
              >
                ...Read More
              </span>
            )}
          </p>

          <div
            style={{
              paddingTop: "12px",
              borderTop: "1px solid rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.6rem, 0.65vw, 0.7rem)",
                color: "rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Calendar size={12} />
              {testimonial.year} Season
            </span>
            <button
              onClick={toggleExpand}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.65rem, 0.75vw, 0.8rem)",
                fontWeight: 600,
                color: "#D4A017",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 12px",
                borderRadius: "50px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,160,23,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>Read More</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Full Story Modal */}
      {showFull && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 4vw, 60px)",
            animation: "modalFade 0.3s ease",
          }}
          onClick={handleClose}
        >
          <div
            style={{
              maxWidth: "700px",
              width: "100%",
              maxHeight: "80vh",
              background: "#ffffff",
              borderRadius: "24px",
              padding: "clamp(28px, 4vw, 48px)",
              overflowY: "auto",
              animation: "modalScale 0.3s ease",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              style={{
                position: "sticky",
                top: 0,
                float: "right",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.04)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,160,23,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.04)";
              }}
            >
              <X size={20} />
            </button>

            <div style={{ marginTop: "8px" }}>
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}
              >
                {testimonial.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.85rem, 0.9vw, 0.95rem)",
                    color: "#5F5F5F",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MapPin size={14} />
                  {testimonial.location}
                </span>
                <StarRating rating={testimonial.rating} size={18} />
              </div>

              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  color: "#2d3748",
                  lineHeight: 1.9,
                  whiteSpace: "pre-wrap",
                }}
              >
                {testimonial.fullText}
              </div>

              {testimonial.arabicFull && (
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <details>
                    <summary
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.8rem, 0.85vw, 0.9rem)",
                        fontWeight: 600,
                        color: "#D4A017",
                        cursor: "pointer",
                      }}
                    >
                      <Globe size={14} style={{ display: "inline", marginRight: "6px" }} />
                      Read in Arabic
                    </summary>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.9rem, 1vw, 1rem)",
                        color: "#2d3748",
                        lineHeight: 1.9,
                        marginTop: "12px",
                        whiteSpace: "pre-wrap",
                        direction: "rtl",
                        textAlign: "right",
                      }}
                    >
                      {testimonial.arabicFull}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Carousel for Mobile ──────────────────────────────────────────────────────
function TestimonialCarousel({ testimonials, inView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const totalSlides = testimonials.length;

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    let newIndex = index;
    
    if (index < 0) newIndex = totalSlides - 1;
    if (index >= totalSlides) newIndex = 0;
    
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, totalSlides]);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalSlides) {
      goToSlide(0);
    } else {
      goToSlide(nextIndex);
    }
  }, [currentIndex, goToSlide, totalSlides]);

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      goToSlide(totalSlides - 1);
    } else {
      goToSlide(prevIndex);
    }
  }, [currentIndex, goToSlide, totalSlides]);

  // Auto-play - RTL (right to left)
  useEffect(() => {
    if (isPaused || !inView) return;

    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, inView, goToNext]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  const translateX = -(currentIndex * (100 / totalSlides));

  return (
    <div
      className="testimonials-carousel"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        padding: "0 4px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: "flex",
          transition: isTransitioning ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          transform: `translateX(${translateX}%)`,
          width: `${totalSlides * 100}%`,
          willChange: "transform",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            style={{
              width: `${100 / totalSlides}%`,
              padding: "0 8px",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <TestimonialCard
              testimonial={testimonial}
              index={index}
              inView={inView}
              isCarousel={true}
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="testimonials-carousel-nav testimonials-carousel-nav--prev"
        aria-label="Previous testimonial"
        style={{
          position: "absolute",
          left: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(212,160,23,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#D4A017",
          transition: "all 0.3s ease",
          zIndex: 5,
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D4A017";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.color = "#D4A017";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <button
        onClick={goToNext}
        className="testimonials-carousel-nav testimonials-carousel-nav--next"
        aria-label="Next testimonial"
        style={{
          position: "absolute",
          right: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(212,160,23,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#D4A017",
          transition: "all 0.3s ease",
          zIndex: 5,
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D4A017";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.color = "#D4A017";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "16px",
          paddingBottom: "4px",
          flexWrap: "wrap",
        }}
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: index === currentIndex ? "#D4A017" : "rgba(212,160,23,0.2)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [sectionRef, inView] = useInView(0.08);
  const [headerInView, setHeaderInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeaderInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const featuredTestimonial = TESTIMONIALS.find((t) => t.isFeatured) || TESTIMONIALS[0];
  const otherTestimonials = TESTIMONIALS.filter((t) => !t.isFeatured);

  return (
    <>
      <style>{`
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        .testimonials-section {
          padding: clamp(48px, 8vh, 80px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF8E6 0%, #FFFBEF 50%, #FFFDF5 100%);
          position: relative;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 30%, rgba(212,160,23,0.04) 0%, transparent 40%),
            radial-gradient(circle at 90% 70%, rgba(212,160,23,0.04) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Section Header ────────────────────────────────────────────── */
        .testimonials-header {
          text-align: center;
          margin-bottom: clamp(32px, 5vh, 48px);
        }

        .testimonials-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .testimonials-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px);
          height: 1.5px;
          background: #D4A017;
          border-radius: 999px;
        }

        .testimonials-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
        }

        .testimonials-header .trust-line {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.85rem);
          font-weight: 500;
          color: #5F5F5F;
          margin-top: 4px;
          margin-bottom: 8px;
        }

        .testimonials-header .trust-line .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #D4A017;
          opacity: 0.4;
        }

        .testimonials-header h2 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #111111;
          margin-bottom: 12px;
        }

        .testimonials-header h2 .highlight {
          color: #D4A017;
          position: relative;
        }

        .testimonials-header h2 .highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2));
          border-radius: 3px;
        }

        .testimonials-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          max-width: 520px;
          margin: 0 auto;
        }

        .testimonials-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Testimonials Grid ──────────────────────────────────────────── */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2vw, 24px);
          align-items: stretch;
        }

        .testimonial-card-wrapper {
          display: flex;
          height: 100%;
        }

        /* ── Carousel ────────────────────────────────────────────────────── */
        .testimonials-carousel {
          position: relative;
          overflow: hidden;
          width: 100%;
          display: none;
        }

        .testimonials-carousel-nav {
          transition: all 0.3s ease;
        }
        .testimonials-carousel-nav:active {
          transform: translateY(-50%) scale(0.95) !important;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(18px, 2.2vw, 24px);
          }
        }

        /* Mobile: Carousel */
        @media (max-width: 768px) {
          .testimonials-section {
            padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px);
          }
          .testimonials-grid {
            display: none;
          }
          .testimonials-carousel {
            display: block !important;
          }
          .testimonials-header h2 {
            font-size: 1.4rem;
          }
          .testimonials-header p {
            font-size: 13px;
          }
        }

        @media (min-width: 769px) {
          .testimonials-carousel {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .testimonials-section {
            padding: 28px 12px 40px;
          }
          .testimonials-carousel-nav {
            width: 32px !important;
            height: 32px !important;
          }
          .testimonials-carousel-nav svg {
            width: 16px !important;
            height: 16px !important;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .testimonial-card-wrapper {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .testimonials-header .header-animate {
            opacity: 1 !important;
            transform: none !important;
          }
          .testimonial-card {
            transition: none !important;
          }
          .testimonial-card:hover {
            transform: none !important;
          }
          .testimonials-carousel > div:first-child {
            transition: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .testimonial-card {
            transform: none !important;
          }
          .testimonial-card:hover {
            transform: none !important;
          }
        }

        /* Scrollbar styling for modals */
        .testimonials-modal-content::-webkit-scrollbar {
          width: 4px;
        }
        .testimonials-modal-content::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.04);
          border-radius: 4px;
        }
        .testimonials-modal-content::-webkit-scrollbar-thumb {
          background: #D4A017;
          border-radius: 4px;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="testimonials-section"
        aria-labelledby="testimonials-heading"
        id="testimonials"
      >
        <div className="testimonials-container">
          {/* Section Header */}
          <div className="testimonials-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">What Our Pilgrims Say</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>

              <div className="trust-line">
                <span>⭐</span>
                <span>100% Satisfied Pilgrims</span>
                <span className="dot" />
                <span>4.9 Average Rating</span>
                <span className="dot" />
                <span>200+ Pilgrims Served</span>
              </div>

              <h2 id="testimonials-heading">
                Real Stories from <span className="highlight">Real Pilgrims</span>
              </h2>

              <p>
                Hear from those who have experienced the spiritual journey with us —
                honest, heartfelt, and inspiring stories of faith and service.
              </p>
            </div>
          </div>

          {/* Featured Testimonial */}
          <FeaturedTestimonial
            testimonial={featuredTestimonial}
            inView={inView}
          />

          {/* ── Desktop/Tablet Grid ── */}
          <div className="testimonials-grid">
            {otherTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                inView={inView}
                isCarousel={false}
              />
            ))}
          </div>

          {/* ── Mobile Carousel ── */}
          <TestimonialCarousel testimonials={otherTestimonials} inView={inView} />

          {/* Bottom Divider */}
          <div
            style={{
              marginTop: "clamp(40px, 6vh, 56px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 20px)",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.12))",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#D4A017",
                opacity: 0.4,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(212,160,23,0.12), transparent)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}