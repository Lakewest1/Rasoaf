// src/pages/Services.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star, Plane, Building2, MapPin,
  ArrowRight, Sparkles, ShieldCheck,
  Users, Clock, Phone
} from "lucide-react";

const services = [
  {
    id: "hajj",
    title: "Hajj Packages",
    description: "Complete Hajj journey with premium accommodations in Makkah & Madinah, guided rituals, and seamless logistics.",
    icon: Star,
    link: "/services/hajj",
    color: "#D4A017",
    features: ["5-Star Hotels", "Guided Tours", "VIP Transport", "24/7 Support"],
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop"
  },
  {
    id: "umrah",
    title: "Umrah Packages",
    description: "Spiritual Umrah journeys year-round with flexible durations, comfortable stays, and dedicated guidance.",
    icon: Sparkles,
    link: "/services/umrah",
    color: "#2E7D32",
    features: ["Flexible Dates", "All Inclusive", "Group Packages", "Ramadan Special"],
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&h=400&fit=crop"
  },
  {
    id: "flight",
    title: "Flight Booking",
    description: "Competitive fares on major airlines worldwide. We handle complex itineraries and multi-city bookings.",
    icon: Plane,
    link: "/services/flight-booking",
    color: "#1565C0",
    features: ["Global Airlines", "Best Prices", "Flexible Changes", "Multi-City"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109bb05?w=600&h=400&fit=crop"
  },
  {
    id: "hotel",
    title: "Hotel Reservation",
    description: "Curated accommodations from luxury suites to comfortable stays, matched to your preferences and budget.",
    icon: Building2,
    link: "/services/hotel-reservation",
    color: "#6A1B9A",
    features: ["Worldwide Hotels", "Best Rates", "Free Cancellation", "24/7 Booking"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"
  }
];

const stats = [
  { icon: Users, value: "15,000+", label: "Happy Travelers" },
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: ShieldCheck, value: "100%", label: "Satisfaction" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
              Our Premium Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Manrope']">
              Your Journey,{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From sacred pilgrimages to global adventures, we provide end-to-end travel solutions 
              tailored to your needs with uncompromising quality and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <Icon className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 font-['Manrope']">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-['Manrope'] mb-4">
            Explore Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of travel services, each designed 
            to provide you with an exceptional experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-['Manrope']">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: service.color }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)`
                    }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Manrope'] mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contact us today for personalized travel planning and exclusive deals.
            </p>
            <a
              href="tel:+234XXXXXXXXX"
              className="inline-flex items-center gap-2 bg-white text-yellow-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}