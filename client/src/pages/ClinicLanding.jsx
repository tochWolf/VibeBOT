import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck2,
  Clock3,
  MapPin,
  Menu,
  Sparkles,
  Star,
  Stethoscope,
  MessageCircle,
  X,
  Smile,
  ShieldCheck,
  WandSparkles,
  AlignJustify,
  Syringe,
} from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Doctor', href: '#doctor' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  { title: 'Teeth Cleaning', icon: Sparkles },
  { title: 'Root Canal Treatment', icon: Stethoscope },
  { title: 'Tooth Extraction', icon: Syringe },
  { title: 'Dental Implants', icon: ShieldCheck },
  { title: 'Cosmetic Dentistry', icon: WandSparkles },
  { title: 'Braces & Aligners', icon: AlignJustify },
];

const reviews = [
  {
    quote: 'She is very genuine about the treatment and does work very sincerely.',
    author: 'Saher Shk',
  },
  {
    quote: 'Dr Sneha has treated well and provided proper solution...also very kind hearted.',
    author: 'Vivek Vyas',
  },
  {
    quote: 'Excellent service as a dentist 👍',
    author: 'Megha Adsod Wakode',
  },
];

const sectionAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function ClinicLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [formDone, setFormDone] = useState(false);

  useEffect(() => {
    document.title = 'Sarvadnya Dental Clinic | Trusted Dental Care in Nagpur';
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const closesSoon = useMemo(() => {
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    const closingMins = 21 * 60;
    return mins < closingMins && closingMins - mins <= 90;
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormDone(true);
    e.target.reset();
    setTimeout(() => setFormDone(false), 3000);
  };

  return (
    <div className="bg-[#f4fbfd] text-slate-800">
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold text-teal-700">
            <Smile className="h-5 w-5" /> Sarvadnya Dental Clinic
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="transition hover:text-teal-600">
                {link.name}
              </a>
            ))}
            <a href="tel:+919999999999" className="rounded-full bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-700">
              Call Now
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {mobileOpen && (
          <div className="space-y-3 border-t border-teal-100 bg-white px-4 py-4 md:hidden">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-slate-700">
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(110deg, rgba(3, 105, 161, 0.88), rgba(13, 148, 136, 0.8)), url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="mx-auto grid min-h-[85vh] max-w-7xl place-items-center px-4 py-24 md:px-8">
            <motion.div initial="hidden" animate="show" variants={sectionAnim} className="max-w-2xl rounded-3xl border border-white/30 bg-white/20 p-7 text-center text-white shadow-2xl backdrop-blur-xl md:p-10">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs font-medium tracking-wide">
                <ShieldCheck className="h-4 w-4" /> Premium Dental Care in Nagpur
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">Your Smile, Our Priority</h1>
              <p className="mt-4 text-base text-white/90 md:text-lg">
                Trusted dental care with advanced treatment and a compassionate approach.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#booking" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 transition hover:scale-[1.02]">
                  Book Appointment
                </a>
                <a href="tel:+919999999999" className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section id="about" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <article className="rounded-3xl border border-teal-100 bg-white p-7 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900">Sarvadnya Dental Clinic</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                A highly rated dental clinic in Nagpur known for quality treatment, patient trust, and gentle care. We blend modern dental science with clear communication so every patient feels informed, comfortable, and confident.
              </p>
            </article>
            <article className="rounded-3xl border border-teal-100 bg-gradient-to-br from-[#e6f7fb] to-[#d6f5ee] p-7 shadow-lg">
              <p className="text-sm font-medium text-slate-600">Patient Satisfaction</p>
              <p className="mt-2 flex items-center gap-2 text-4xl font-bold text-slate-900">
                <Star className="h-8 w-8 fill-amber-400 text-amber-400" /> 4.9
              </p>
              <p className="mt-2 text-slate-600">based on 27 reviews</p>
            </article>
          </div>
        </motion.section>

        <motion.section id="services" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
          <h2 className="text-center text-3xl font-semibold text-slate-900">Our Services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article key={service.title} whileHover={{ y: -6 }} className="rounded-3xl border border-teal-100 bg-white/90 p-6 shadow-md transition">
                  <div className="mb-4 inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{service.title}</h3>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section id="doctor" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
          <div className="grid gap-6 rounded-3xl border border-teal-100 bg-white p-8 shadow-lg md:grid-cols-[220px_1fr] md:items-center">
            <div className="mx-auto h-[220px] w-[220px] overflow-hidden rounded-3xl bg-gradient-to-br from-teal-100 to-blue-100">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80" alt="Dr. Sneha" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700">Lead Dentist</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Dr. Sneha</h2>
              <p className="mt-3 text-slate-600">
                Experienced, kind-hearted dentist known for proper diagnosis and genuine treatment. Dr. Sneha focuses on patient education and ethical dentistry with long-term oral health outcomes.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section id="reviews" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mx-auto max-w-4xl px-4 pb-16 md:px-8">
          <h2 className="text-center text-3xl font-semibold text-slate-900">What Patients Say</h2>
          <div className="mt-8 rounded-3xl border border-teal-100 bg-white p-7 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div key={activeReview} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                <div className="mb-3 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-slate-700">“{reviews[activeReview].quote}”</p>
                <p className="mt-4 font-semibold text-slate-900">– {reviews[activeReview].author}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveReview(index)}
                  className={`h-2.5 w-8 rounded-full transition ${activeReview === index ? 'bg-teal-600' : 'bg-slate-200'}`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" variants={sectionAnim} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:grid-cols-2 md:px-8">
          <article className="rounded-3xl border border-teal-100 bg-white p-7 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-900">Location & Contact</h2>
            <p className="mt-4 flex gap-2 text-slate-600">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
              Mangalmurti Square, Jaitala Rd, opposite Raahi Sabhagruh, Jaitala, Nagpur, Maharashtra 440036
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Mangalmurti+Square+Jaitala+Road+Nagpur"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Get Directions
              </a>
              <a href="tel:+919999999999" className="rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700">
                Call Now
              </a>
            </div>
            <iframe
              title="Sarvadnya Dental Clinic map"
              className="mt-6 h-64 w-full rounded-2xl border border-teal-100"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=Mangalmurti+Square+Jaitala+Road+Nagpur&output=embed"
            />
          </article>

          <article id="timings" className="rounded-3xl border border-teal-100 bg-white p-7 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-900">Clinic Timings</h2>
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#e8f8fd] to-[#dff8f1] p-5">
              <p className="flex items-center gap-2 text-slate-700"><Clock3 className="h-5 w-5 text-teal-700" /> Open: 10:00 AM</p>
              <p className="mt-2 flex items-center gap-2 text-slate-700"><Clock3 className="h-5 w-5 text-teal-700" /> Close: 9:00 PM</p>
              <p className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${closesSoon ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                <CalendarCheck2 className="h-4 w-4" />
                {closesSoon ? 'Closes Soon' : 'Open Today'}
              </p>
            </div>

            <form id="booking" onSubmit={onSubmit} className="mt-7 space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Book an Appointment</h3>
              <input required placeholder="Name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-teal-200 transition focus:ring" />
              <input required type="tel" placeholder="Phone" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-teal-200 transition focus:ring" />
              <input required type="date" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-teal-200 transition focus:ring" />
              <textarea rows="4" placeholder="Message" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-teal-200 transition focus:ring" />
              <button className="w-full rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700">Submit Request</button>
              <AnimatePresence>
                {formDone && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-medium text-emerald-600">
                    Appointment request sent successfully.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </article>
        </motion.section>
      </main>

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>

      <footer className="bg-[#0f172a] px-4 py-10 text-slate-200 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Sarvadnya Dental Clinic</h3>
            <p className="mt-2 text-sm text-slate-300">Professional and compassionate dental care in Nagpur, Maharashtra.</p>
          </div>
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.name}><a href={link.href}>{link.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Connect</h4>
            <div className="mt-3 flex gap-3 text-sm">
              <a className="rounded-full border border-slate-600 px-3 py-1" href="#">Instagram</a>
              <a className="rounded-full border border-slate-600 px-3 py-1" href="#">Facebook</a>
              <a className="rounded-full border border-slate-600 px-3 py-1" href="#">YouTube</a>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl border-t border-slate-700 pt-4 text-xs text-slate-400">
          © {new Date().getFullYear()} Sarvadnya Dental Clinic. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
