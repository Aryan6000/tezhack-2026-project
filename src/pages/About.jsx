import { Shield, Target, Users, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#f4f8ff] min-h-[calc(100vh-76px)]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full border-[60px] border-[#eaf2ff] opacity-50" />
          <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-blue-50 opacity-50 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Empowering Citizens.<br />
              <span className="text-blue-600">Building Better Cities.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              PIRT (Public Issue Resolution Tracker) is a transparent, citizen-first platform designed to bridge the gap between residents and municipal authorities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We believe in accountability, speed, and community-driven governance.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon={Shield} 
              title="Transparency First" 
              desc="Every reported issue is publicly tracked. No hidden tickets, no unrecorded grievances."
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <ValueCard 
              icon={Zap} 
              title="Speed & SLA" 
              desc="Issues are routed directly to the responsible ward officers with strict resolution timelines."
              color="text-amber-600"
              bg="bg-amber-50"
            />
            <ValueCard 
              icon={Users} 
              title="Citizen Verified" 
              desc="A ticket is only marked as resolved when the reporting citizen approves the fix."
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
          </div>
        </div>
      </section>

      {/* Story / Detailed Info */}
      <section className="py-20 px-4 bg-[#f4f8ff]">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Built PIRT</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              For too long, reporting civic issues like broken streetlights, potholes, and uncollected garbage has felt like shouting into a void. Paper trails get lost, and responsibilities are shifted.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              PIRT was created to automate the routing of these issues directly to the ground workers and engineers responsible for your specific ward. By making the data public and attaching Service Level Agreements (SLAs), we hold authorities accountable and give power back to the citizens.
            </p>
            <div className="flex items-center gap-3 text-slate-800 font-bold bg-gray-50 p-4 rounded-xl border border-gray-100 w-max">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <MapPin size={20} />
              </div>
              <span>Currently serving 42 Wards.</span>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-inner relative">
               <img src="/hero-image.webp" alt="Clean City" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon: Icon, title, desc, color, bg }) => (
  <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
    <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-6`}>
      <Icon size={28} className={color} strokeWidth={2} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-[15px]">{desc}</p>
  </div>
);

export default About;

