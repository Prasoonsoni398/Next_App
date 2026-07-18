import Link from 'next/link';
import { Calendar, Activity, Shield, Clock, Users, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20 z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Modern Healthcare
              </span>
              <br /> for a Better Tomorrow
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Experience world-class medical care with our team of expert doctors. We prioritize your health with state-of-the-art facilities and compassionate care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/login" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300">
                Book Appointment
              </Link>
              <Link href="/about" className="px-8 py-4 rounded-full bg-gray-800 text-white font-bold text-lg border border-gray-700 hover:bg-gray-700 hover:border-gray-500 transition-all duration-300">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Medical Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Comprehensive healthcare solutions tailored to your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ServiceCard 
              icon={<Activity className="w-10 h-10 text-blue-400" />}
              title="General Checkups"
              description="Routine medical examinations to maintain your optimal health and detect any potential issues early."
            />
            <ServiceCard 
              icon={<Calendar className="w-10 h-10 text-emerald-400" />}
              title="Easy Scheduling"
              description="Book your appointments online with zero hassle, instant confirmation, and flexible rescheduling."
            />
            <ServiceCard 
              icon={<Shield className="w-10 h-10 text-purple-400" />}
              title="Secure Records"
              description="Your medical history is safely stored in our encrypted database and easily accessible to you at any time."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl font-bold leading-tight">Why Patients Choose Our Clinic</h2>
              <ul className="space-y-8">
                <FeatureItem 
                  icon={<Clock className="text-blue-400 w-6 h-6" />} 
                  title="24/7 Availability" 
                  text="Our emergency support team is available around the clock to provide you with immediate medical assistance when you need it most." 
                />
                <FeatureItem 
                  icon={<Users className="text-emerald-400 w-6 h-6" />} 
                  title="Expert Medical Team" 
                  text="Our clinic is staffed by highly qualified medical professionals with years of experience in various specialties." 
                />
              </ul>
              <div className="pt-6">
                 <Link href="/login" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors group">
                  Learn more about our team <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 text-center group">
                 <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 <Shield className="w-20 h-20 text-gray-700 mb-6" />
                 <h3 className="text-2xl font-bold text-gray-500 mb-2">Premium Medical Facility</h3>
                 <p className="text-gray-600">Equipped with the latest healthcare technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
      <div className="mb-6 p-4 bg-gray-800 rounded-2xl inline-block group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureItem({ icon, title, text }) {
  return (
    <li className="flex items-start gap-5">
      <div className="mt-1 p-3 bg-gray-800 rounded-xl shadow-md">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-400 leading-relaxed">{text}</p>
      </div>
    </li>
  );
}
