import { useState, useEffect, useRef, type ReactNode, type ComponentType, type FormEvent } from "react";
import { motion, useInView } from "motion/react";
import {
  Menu, X, ArrowRight, Phone, MessageCircle, Mail, MapPin,
  GraduationCap, Hotel, UtensilsCrossed, Church, Building2,
  FileText, Code2, Wrench, Monitor, Shield, Zap, BarChart3,
  Database, CreditCard, Smartphone, ChevronDown, CheckCircle2,
  Clock, Headphones, Layers, TrendingUp, Server, Search,
  Heart, Factory, Stethoscope, Home, Globe, Target, Package,
  Cpu, Lightbulb, Users,
} from "lucide-react";
import logo from "../imports/logo-removebg-preview.png";
import whatsappIcon from "../imports/whatsapp-icon.png";

// ─── Types ────────────────────────────────────────────────────────────────────
type Icon = ComponentType<{ size?: number; className?: string; strokeWidth?: number; fill?: string }>;

// ─── Constants ────────────────────────────────────────────────────────────────
const PHONE_NUM = "08065660391";
const WA_LINK = `https://wa.me/2347039312869?text=${encodeURIComponent("Hi OctaDevs! I'd like to discuss a website project for my business.")}`;
const EMAIL_ADDR = "hello@octadevs.com";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(155,229,58,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(155,229,58,0.04) 1px,transparent 1px)",
  backgroundSize: "48px 48px",
};

function go(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrolled(threshold = 60) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const h = () => setPast(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return past;
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

// ─── Primitives ───────────────────────────────────────────────────────────────
function Reveal({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const D = 1800;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / D, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function SectionLabel({ text }: { text: string }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 text-[#9BE53A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4"
    >
      <span className="block w-4 h-px bg-[#9BE53A]" />
      {text}
    </motion.span>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#071E16]/96 backdrop-blur-xl border-b border-[#9BE53A]/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <button onClick={() => go("#home")} className="flex-shrink-0">
          <img src={logo} alt="OctaDevs" className="h-10 sm:h-11 w-auto" />
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <button
              key={n.label}
              onClick={() => go(n.href)}
              className="text-[#A7B2AD] hover:text-[#F8FAFC] text-sm font-medium transition-colors duration-200"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#9BE53A] text-sm font-semibold hover:text-[#B8F35A] transition-colors"
          >
            <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  /> WhatsApp
          </a>
          <button
            onClick={() => go("#contact")}
            className="bg-[#9BE53A] hover:bg-[#B8F35A] text-[#071E16] px-5 py-2.5 rounded-lg text-sm font-bold transition-colors"
          >
            Start Your Project
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-[#F8FAFC]"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`lg:hidden bg-[#071E16] border-t border-[#9BE53A]/10 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-4 py-5 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.label}
              onClick={() => { setMenuOpen(false); go(n.href); }}
              className="block w-full text-left px-4 py-3.5 text-[#A7B2AD] hover:text-white rounded-xl text-base font-medium transition-colors"
            >
              {n.label}
            </button>
          ))}
          <div className="pt-4 grid grid-cols-2 gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 border border-[#9BE53A]/30 rounded-xl text-[#9BE53A] font-bold text-sm"
            >
               <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  /> WhatsApp
            </a>
            <button
              onClick={() => { setMenuOpen(false); go("#contact"); }}
              className="py-3.5 bg-[#9BE53A] text-[#071E16] rounded-xl font-bold text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWA() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full font-bold text-sm shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.65)] hover:scale-105 transition-all duration-200"
    >
      <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  />
      Chat Now
    </a>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#071E16] overflow-hidden"
      style={GRID_BG}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(155,229,58,0.14) 0%, transparent 65%)" }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="inline-flex items-center gap-2.5 bg-[#122E24] border border-[#9BE53A]/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9BE53A] animate-pulse" />
            <span className="text-[11px] text-[#9BE53A] font-bold tracking-widest uppercase">
              Nigeria&apos;s Premium Software Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#F8FAFC] text-4xl sm:text-6xl lg:text-[72px] font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Websites That{" "}
            <span className="text-[#9BE53A]">Grow</span>
            {" "}Businesses.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#A7B2AD] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          >
            We design modern websites and custom software that help businesses attract customers,
            increase credibility, automate operations and grow faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => go("#contact")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#9BE53A] text-[#071E16] px-8 py-4 rounded-xl font-extrabold text-base hover:bg-[#B8F35A] transition-all hover:scale-105 shadow-[0_4px_28px_rgba(155,229,58,0.32)]"
            >
              Start Your Project
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-white/15 text-[#F8FAFC] px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/5 transition-colors"
            >
               <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center justify-center gap-10 sm:gap-16 pt-8 border-t border-white/[0.08]"
          >
            {[
              { to: 50, suffix: "+", label: "Projects Delivered" },
              { to: 5, suffix: "+", label: "Years Experience" },
              { to: 100, suffix: "%", label: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[#F8FAFC] text-2xl sm:text-3xl font-extrabold">
                  <AnimCounter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[#A7B2AD] text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(transparent, #071E16)" }}
      />
    </section>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  "Custom Built", "SEO Optimized", "Mobile First", "Fast Loading",
  "Secure & Reliable", "Scalable", "WhatsApp Integration", "Admin Dashboard",
  "Nationwide Service", "24/7 Support", "Clean Code", "Modern Design",
];

function TrustBar() {
  return (
    <div className="bg-[#0d3627] border-y border-[#9BE53A]/10 py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 32s linear infinite", width: "max-content" }}
      >
        {[...TRUST_ITEMS, ...TRUST_ITEMS].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 px-6 text-[#A7B2AD] text-sm font-medium">
            <span className="w-1 h-1 rounded-full bg-[#9BE53A] flex-shrink-0" />
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

// ─── Why Websites ─────────────────────────────────────────────────────────────
const WHY_ITEMS: { icon: Icon; title: string; body: string }[] = [
  { icon: Clock, title: "24/7 Availability", body: "Your website never sleeps. It works for you while you rest — generating leads and answering customer questions round the clock." },
  { icon: Shield, title: "Instant Credibility", body: "Customers trust businesses with professional websites. A polished web presence signals quality before you say a word." },
  { icon: TrendingUp, title: "More Leads & Revenue", body: "A well-designed website is your best salesperson — driving inquiries, capturing contacts, and converting browsers into buyers." },
  { icon: Globe, title: "Nationwide Reach", body: "Your storefront is no longer limited to your street. Reach customers across Nigeria and beyond with zero extra cost." },
  { icon: Smartphone, title: "Mobile Ready", body: "90% of Nigerians access the internet on mobile. Your website will perform flawlessly on every screen size." },
  { icon: BarChart3, title: "Measurable Growth", body: "Track visitors, see which pages convert, understand your audience. Data-driven decisions grow businesses faster." },
];

function WhyWebsites() {
  return (
    <Reveal id="about" className="py-20 sm:py-28 bg-[#053825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <SectionLabel text="Why Your Business Needs a Website" />
          <motion.h2
            variants={fadeUp}
            className="text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
          >
            The internet is where your customers are already looking for you.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#A7B2AD] mt-5 text-base leading-relaxed">
            Whether you&apos;re a hotel, restaurant, school, or growing startup — a professional website is no
            longer optional. It&apos;s your most powerful business tool.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="bg-[#071E16] border border-[#9BE53A]/8 rounded-2xl p-6 hover:border-[#9BE53A]/25 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#9BE53A]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#9BE53A]/20 transition-colors">
                <Icon size={20} className="text-[#9BE53A]" />
              </div>
              <h3 className="text-[#F8FAFC] font-bold text-base mb-2">{title}</h3>
              <p className="text-[#A7B2AD] text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES: { icon: Icon; name: string; problem: string; solution: string; outcome: string }[] = [
  { icon: Globe, name: "Business Websites", problem: "Customers can't find or trust you online.", solution: "A stunning, fast website positioning you as #1 in your industry.", outcome: "More credibility, more leads, more revenue." },
  { icon: GraduationCap, name: "School Portals", problem: "Manual processes slow enrollment and communication.", solution: "Complete portal with management, fee payments, and parent access.", outcome: "Streamlined operations and happier parents." },
  { icon: Hotel, name: "Hotel Booking Systems", problem: "Guests call to book, reservations get lost.", solution: "Real-time booking with online payments and availability management.", outcome: "More bookings, less admin, better guest experience." },
  { icon: UtensilsCrossed, name: "Restaurant Websites", problem: "Losing customers to competitors with online presence.", solution: "Beautiful site with digital menu, reservations, and location.", outcome: "More foot traffic and stronger brand recognition." },
  { icon: Church, name: "Church Websites", problem: "Members miss events, sermons aren't accessible online.", solution: "Church website with archives, event calendar, and online giving.", outcome: "Stronger community engagement and ministry reach." },
  { icon: Building2, name: "Real Estate Websites", problem: "Listings scattered across WhatsApp and social media.", solution: "Professional listing platform with photos, pricing, and inquiry forms.", outcome: "Qualified leads and faster property sales." },
  { icon: FileText, name: "Landing Pages", problem: "Marketing campaigns have nowhere quality to send traffic.", solution: "High-converting landing pages designed to capture leads and drive action.", outcome: "Lower ad costs and higher conversion rates." },
  { icon: Code2, name: "Custom Software", problem: "Off-the-shelf software doesn't fit your unique processes.", solution: "We build exactly what your business needs — nothing more, nothing less.", outcome: "Maximum efficiency and competitive advantage." },
  { icon: Wrench, name: "Website Maintenance", problem: "Your website is outdated, slow, or broken.", solution: "Regular updates, optimization, security patches, and content management.", outcome: "Always fast, secure, and up to date." },
];

function Services() {
  return (
    <Reveal id="services" className="py-20 sm:py-28 bg-[#071E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel text="Our Services" />
          <motion.h2 variants={fadeUp} className="text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Everything your business needs to dominate online.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, name, problem, solution, outcome }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="group bg-[#0B241B] border border-[#9BE53A]/8 rounded-2xl p-6 hover:border-[#9BE53A]/28 hover:bg-[#122E24] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 bg-[#9BE53A]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#9BE53A]/20 transition-colors">
                  <Icon size={21} className="text-[#9BE53A]" />
                </div>
                <h3 className="text-[#F8FAFC] font-bold text-base pt-1">{name}</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <p className="text-[#A7B2AD]">
                  <span className="text-[#9BE53A]/80 font-semibold">Problem: </span>
                  {problem}
                </p>
                <p className="text-[#A7B2AD]">
                  <span className="text-[#9BE53A]/80 font-semibold">Solution: </span>
                  {solution}
                </p>
                <p className="text-[#F8FAFC]/85 font-semibold border-t border-[#9BE53A]/10 pt-3 flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#9BE53A] flex-shrink-0 mt-0.5" />
                  {outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <button
            onClick={() => go("#contact")}
            className="inline-flex items-center gap-2.5 bg-[#9BE53A] text-[#071E16] px-8 py-4 rounded-xl font-bold hover:bg-[#B8F35A] transition-colors shadow-[0_4px_20px_rgba(155,229,58,0.25)]"
          >
            Discuss Your Project <ArrowRight size={17} />
          </button>
        </motion.div>
      </div>
    </Reveal>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────
const INDUSTRIES: { icon: Icon; name: string; text: string }[] = [
  { icon: GraduationCap, name: "Schools & Education", text: "Portals, e-learning platforms, fee systems, and parent communication for schools of all sizes." },
  { icon: Hotel, name: "Hotels & Hospitality", text: "Booking engines, room management, guest portals, and restaurant integrations." },
  { icon: Stethoscope, name: "Hospitals & Clinics", text: "Appointment scheduling, patient portals, doctor directories, and health information systems." },
  { icon: UtensilsCrossed, name: "Restaurants & Food", text: "Digital menus, online ordering, table reservations, and delivery platform integrations." },
  { icon: Church, name: "Churches & NGOs", text: "Event calendars, sermon archives, online giving, and volunteer management systems." },
  { icon: Building2, name: "Real Estate", text: "Property listings, virtual tours, mortgage calculators, and professional agent portals." },
  { icon: Factory, name: "Manufacturers", text: "Product catalogs, B2B ordering systems, distributor portals, and supply chain tools." },
  { icon: Heart, name: "Nonprofits & NGOs", text: "Donation platforms, volunteer management, project showcases, and impact reporting." },
  { icon: Home, name: "SMEs & Retailers", text: "Online stores, inventory management, loyalty programs, and WhatsApp commerce tools." },
  { icon: Cpu, name: "Startups & Tech", text: "MVPs, SaaS platforms, investor-ready websites, and scalable technical infrastructure." },
];

function Industries() {
  return (
    <Reveal id="industries" className="py-20 sm:py-28 bg-[#0B241B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel text="Industries We Serve" />
          <motion.h2 variants={fadeUp} className="text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            We understand your industry&apos;s unique digital needs.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map(({ icon: Icon, name, text }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="group bg-[#071E16] border border-[#9BE53A]/8 rounded-2xl p-2.5 hover:border-[#9BE53A]/28 hover:bg-[#0d2318] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#9BE53A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#9BE53A]/20 transition-colors">
                <Icon size={19} className="text-[#9BE53A]" />
              </div>
              <h3 className="text-[#F8FAFC] font-bold text-sm mb-2">{name}</h3>
              <p className="text-[#A7B2AD] text-xs leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES: { icon: Icon; title: string; text: string }[] = [
  { icon: MessageCircle, title: "WhatsApp Integration", text: "Every visitor reaches you instantly with one tap." },
  { icon: Monitor, title: "Admin Dashboard", text: "Manage content, leads, and bookings from a simple panel." },
  { icon: CreditCard, title: "Online Payments", text: "Accept Paystack, Flutterwave, and bank transfers." },
  { icon: Search, title: "SEO Optimized", text: "Show up on Google when customers search for you." },
  { icon: Server, title: "Fast Hosting", text: "Speed-optimized on reliable Nigerian and global servers." },
  { icon: BarChart3, title: "Analytics & Insights", text: "See traffic, conversions, and growth data in real time." },
  { icon: Database, title: "Booking Systems", text: "Let customers schedule without a single phone call." },
  { icon: Shield, title: "Security Built In", text: "SSL, malware protection, and backups always active." },
  { icon: Smartphone, title: "Fully Responsive", text: "Perfect on every device — phone, tablet, laptop." },
  { icon: Zap, title: "Lightning Fast", text: "Pages load in under 2 seconds to keep users engaged." },
  { icon: Target, title: "Conversion Focused", text: "Every design decision turns visitors into paying clients." },
  { icon: Package, title: "CMS Included", text: "Update your content without touching any code." },
];

function Features() {
  return (
    <Reveal className="py-20 sm:py-28 bg-[#071E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel text="What's Included" />
          <motion.h2 variants={fadeUp} className="text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Built to convert visitors into clients.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group bg-[#0B241B] border border-[#9BE53A]/8 rounded-xl p-2.5 hover:border-[#9BE53A]/28 hover:bg-[#122E24] transition-all duration-300"
            >
             <div className="w-9 h-9 bg-[#9BE53A]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#9BE53A]/20 transition-colors">
  {title === "WhatsApp Integration" ? (
    <img
      src={whatsappIcon}
      alt="WhatsApp"
      className="w-8 h-6 object-contain"
    />
  ) : (
    <Icon size={17} className="text-[#9BE53A]" />
  )}
</div>
              <h3 className="text-[#F8FAFC] font-bold text-sm mb-1.5">{title}</h3>
              <p className="text-[#A7B2AD] text-xs leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
const STEPS: { icon: Icon; num: string; title: string; text: string }[] = [
  { icon: Search, num: "01", title: "Discovery", text: "We learn everything about your business, goals, target audience, and competitors." },
  { icon: Lightbulb, num: "02", title: "Planning", text: "We create a detailed sitemap, feature list, and project timeline — no surprises." },
  { icon: Layers, num: "03", title: "UI / UX Design", text: "Every screen is designed for your users — beautiful, intuitive, conversion-optimized." },
  { icon: Code2, num: "04", title: "Development", text: "We build with clean, modern code that is fast, secure, and built to scale." },
  { icon: CheckCircle2, num: "05", title: "Testing", text: "Rigorous testing across all devices, browsers, and real-world scenarios." },
  { icon: Zap, num: "06", title: "Launch", text: "We deploy your site and monitor closely for a flawless go-live experience." },
  { icon: Headphones, num: "07", title: "Ongoing Support", text: "We don't disappear after launch — support, updates, and growth consulting." },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28 bg-[#071E16] overflow-hidden" style={GRID_BG}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #071E16 0%, transparent 12%, transparent 88%, #071E16 100%)" }}
      />
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel text="How We Work" />
          <motion.h2 variants={fadeUp} className="text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            A proven process. Zero guesswork.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#A7B2AD] mt-5 text-base leading-relaxed">
            Every project follows the same disciplined approach — so you always know what&apos;s happening
            and what comes next.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ icon: Icon, num, title, text }) => (
            <motion.div
              key={num}
              variants={fadeUp}
              className="bg-[#0B241B]/80 backdrop-blur-sm border border-[#9BE53A]/10 rounded-2xl p-6 hover:border-[#9BE53A]/28 transition-colors"
            >
              <div className="text-[#9BE53A]/[0.18] text-5xl font-extrabold leading-none mb-4 font-mono select-none">
                {num}
              </div>
              <div className="w-9 h-9 bg-[#9BE53A]/10 rounded-lg flex items-center justify-center mb-4">
                <Icon size={17} className="text-[#9BE53A]" />
              </div>
              <h3 className="text-[#F8FAFC] font-bold mb-2">{title}</h3>
              <p className="text-[#A7B2AD] text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Why OctaDevs ─────────────────────────────────────────────────────────────
const WHY_US: { icon: Icon; title: string; text: string }[] = [
  { icon: Target, title: "Business-First Approach", text: "We build digital assets that directly impact your revenue and growth — not just pretty websites." },
  { icon: Code2, title: "Clean, Modern Code", text: "Every project is hand-coded with modern technologies — no bloated templates or generic page builders." },
  { icon: Headphones, title: "Reliable Communication", text: "You're always in the loop. We communicate clearly, respond promptly, and never leave you guessing." },
  { icon: TrendingUp, title: "Long-Term Partnership", text: "Our relationship doesn't end at launch. We invest in your success and grow with your business." },
  { icon: Lightbulb, title: "Custom-Built Solutions", text: "We build specifically for your goals and audience — no one-size-fits-all templates." },
  { icon: Server, title: "Scalable Architecture", text: "Your website grows with your business — from 100 to 100,000 users without breaking a sweat." },
  { icon: Users, title: "Expert Nigerian Team", text: "We deeply understand Nigerian businesses, culture, and market dynamics. We build for your real audience." },
  { icon: Zap, title: "Premium Post-Launch Support", text: "Dedicated support so your website always performs at its best — no issue left unresolved." },
];

function WhyOctaDevs() {
  return (
    <Reveal className="py-20 sm:py-28 bg-[#0B241B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="mb-12 lg:mb-0 lg:sticky lg:top-28">
            <SectionLabel text="Why OctaDevs" />
            <motion.h2
              variants={fadeUp}
              className="text-[#F8FAFC] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
            >
              We don&apos;t just build websites. We build growth engines.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A7B2AD] mt-5 text-base leading-relaxed">
              Hundreds of agencies can build a website. Very few can build one that consistently generates
              leads, builds trust, and grows revenue. That&apos;s the OctaDevs difference.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => go("#contact")}
                className="inline-flex items-center justify-center gap-2.5 bg-[#9BE53A] text-[#071E16] px-7 py-4 rounded-xl font-bold hover:bg-[#B8F35A] transition-colors"
              >
                Work With Us <ArrowRight size={17} />
              </button>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-[#9BE53A]/25 text-[#9BE53A] px-7 py-4 rounded-xl font-semibold hover:bg-[#9BE53A]/8 transition-colors text-sm"
              >
                <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  /> Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_US.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-[#071E16] border border-[#9BE53A]/8 rounded-xl p-5 hover:border-[#9BE53A]/28 transition-all duration-300 group"
              >
                <div className="w-9 h-9 bg-[#9BE53A]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#9BE53A]/20 transition-colors">
                  <Icon size={17} className="text-[#9BE53A]" />
                </div>
                <h3 className="text-[#F8FAFC] font-bold text-sm mb-1.5">{title}</h3>
                <p className="text-[#A7B2AD] text-xs leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Recommender ──────────────────────────────────────────────────────────────
const QUIZ = [
  {
    q: "What type of business do you run?",
    opts: ["Hotel / Restaurant / Hospitality", "School or Educational Institution", "Church / NGO / Organization", "Real Estate or Construction", "Retail / E-commerce", "Healthcare / Hospital or Clinic", "Other Business"],
  },
  {
    q: "Do customers need to book appointments or reservations online?",
    opts: ["Yes, bookings are very important", "Somewhat — it would be useful", "No, not needed for now"],
  },
  {
    q: "Do you need to sell products or accept payments online?",
    opts: ["Yes, I want to sell online", "I need to collect payments (fees, donations)", "No, just information for now"],
  },
  {
    q: "What is most important for your website right now?",
    opts: ["Generate leads and inquiries", "Build credibility and trust", "Automate bookings and payments", "Reach more customers online"],
  },
];

const RECS: Record<string, { title: string; desc: string }> = {
  hotel: { title: "Hotel / Restaurant Booking System", desc: "A professional website with integrated booking, real-time availability, online payments, and automatic WhatsApp notifications for every new reservation." },
  school: { title: "School Management Portal", desc: "A complete portal with student enrollment, fee payments, results management, timetables, and a parent communication dashboard." },
  church: { title: "Church & Ministry Website", desc: "A beautiful church website with service schedules, sermon archives, event calendar, online giving, and member directory." },
  realestate: { title: "Real Estate Listing Website", desc: "A professional property listing platform with galleries, pricing, virtual tours, mortgage calculator, and lead inquiry forms." },
  ecommerce: { title: "E-Commerce Website", desc: "A full online store with product catalog, shopping cart, Paystack / Flutterwave integration, order management, and WhatsApp checkout notifications." },
  default: { title: "Professional Business Website", desc: "A premium business website that generates leads, builds credibility, and converts visitors into paying clients — 24 hours a day, 7 days a week." },
};

function getRecommendation(answers: string[]) {
  const a0 = answers[0] || "";
  if (a0.includes("Hotel") || a0.includes("Restaurant")) return RECS.hotel;
  if (a0.includes("School")) return RECS.school;
  if (a0.includes("Church")) return RECS.church;
  if (a0.includes("Real Estate")) return RECS.realestate;
  if (a0.includes("Retail")) return RECS.ecommerce;
  return RECS.default;
}

function Recommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (step < QUIZ.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const reset = () => { setStep(0); setAnswers([]); setDone(false); };
  const rec = done ? getRecommendation(answers) : null;

  return (
    <Reveal className="py-20 sm:py-28 bg-[#071E16]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionLabel text="Website Recommender" />
          <motion.h2 variants={fadeUp} className="text-[#F8FAFC] text-3xl sm:text-4xl font-extrabold tracking-tight">
            What does your business need?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#A7B2AD] mt-4 text-base">
            Answer 4 quick questions and we&apos;ll recommend the perfect digital solution for you.
          </motion.p>
        </div>

        {!done ? (
          <motion.div key={`step-${step}`} variants={fadeUp} className="bg-[#0B241B] rounded-2xl p-6 sm:p-8 border border-[#9BE53A]/12">
            <div className="flex items-center gap-1.5 mb-8">
              {QUIZ.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-[#9BE53A]" : "bg-[#122E24]"}`}
                />
              ))}
            </div>
            <p className="text-[#A7B2AD] text-xs font-bold uppercase tracking-wide mb-2">
              Question {step + 1} of {QUIZ.length}
            </p>
            <h3 className="text-[#F8FAFC] text-xl font-extrabold mb-6">{QUIZ[step].q}</h3>
            <div className="space-y-2.5">
              {QUIZ[step].opts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="w-full text-left px-5 py-4 rounded-xl border border-[#9BE53A]/12 text-[#F8FAFC] hover:border-[#9BE53A]/50 hover:bg-[#122E24] transition-all duration-200 font-medium text-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0B241B] rounded-2xl p-8 border border-[#9BE53A]/30 text-center"
          >
            <div className="w-16 h-16 bg-[#9BE53A]/12 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={28} className="text-[#9BE53A]" />
            </div>
            <p className="text-[#9BE53A] text-xs font-bold uppercase tracking-wide mb-2">Our Recommendation</p>
            <h3 className="text-[#F8FAFC] text-2xl font-extrabold mb-4">{rec?.title}</h3>
            <p className="text-[#A7B2AD] leading-relaxed mb-8 max-w-md mx-auto">{rec?.desc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#9BE53A] text-[#071E16] px-7 py-3.5 rounded-xl font-bold hover:bg-[#B8F35A] transition-colors"
              >
                <MessageCircle size={17} /> Request a Quote
              </a>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/12 text-[#A7B2AD] hover:text-white hover:border-white/25 transition-colors font-medium text-sm"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Reveal>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "How much does a website cost?", a: "Website pricing depends on the type, features, and complexity. A professional business website starts from ₦150,000 while complex systems like school portals or booking platforms start from ₦350,000. We provide a detailed, transparent quote after understanding your specific needs — no hidden charges, ever." },
  { q: "How long does it take to build a website?", a: "Most professional business websites are completed within 2–4 weeks. Complex platforms like school portals, booking systems, or custom software may take 4–8 weeks. We provide a detailed timeline upfront and keep you updated at every stage of the project." },
  { q: "Do you provide hosting and domain setup?", a: "Yes. We handle everything — domain registration, hosting setup, SSL certificate, and deployment. Your website will be live on a reliable, fast server with 99.9% uptime. We can also migrate an existing domain if you already have one." },
  { q: "Can I update my website myself after it's built?", a: "Absolutely. Every website we build includes a user-friendly CMS (Content Management System) that lets you update text, images, prices, and blog posts without any technical knowledge. We also provide training on how to use it effectively." },
  { q: "Do you work with businesses outside Awka?", a: "Yes, we work with clients across Nigeria and internationally. We handle everything remotely — discovery, design, development, and delivery — using video calls, WhatsApp, and email. Distance has never been a barrier for us." },
  { q: "What information do I need to provide to get started?", a: "To get started, we need your business name, logo, contact details, and a description of what you want the website to do. Everything else — design concepts, copy suggestions, and structure — we handle. You don't need to be technical at all." },
  { q: "Do you offer ongoing maintenance and support?", a: "Yes. We offer monthly maintenance packages that include regular updates, security monitoring, backups, performance optimization, and priority support. Your website will always be fast, secure, and up to date." },
  { q: "Will my website work on mobile phones?", a: "100%. All our websites are built mobile-first — designed and optimized specifically for Android and iOS smartphones. We test every page on multiple screen sizes before delivery to ensure a flawless experience on all devices." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Reveal id="faq" className="py-20 sm:py-28 bg-[#0B241B]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <SectionLabel text="Frequently Asked Questions" />
          <motion.h2 variants={fadeUp} className="text-[#F8FAFC] text-3xl sm:text-4xl font-extrabold tracking-tight">
            Questions? We have answers.
          </motion.h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#071E16] border border-[#9BE53A]/8 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="text-[#F8FAFC] font-semibold text-sm sm:text-base">{q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#9BE53A] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-64" : "max-h-0"}`}
              >
                <p className="px-6 pb-5 text-[#A7B2AD] text-sm leading-relaxed">{a}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="text-[#A7B2AD] text-sm mb-4">Still have questions?</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#9BE53A] font-semibold hover:text-[#B8F35A] transition-colors"
          >
             <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  /> Ask us on WhatsApp
          </a>
        </motion.div>
      </div>
    </Reveal>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Reveal id="contact" className="py-20 sm:py-28 bg-[#071E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="mb-12 lg:mb-0">
            <SectionLabel text="Get In Touch" />
            <motion.h2 variants={fadeUp} className="text-[#F8FAFC] text-3xl sm:text-4xl font-extrabold tracking-tight mb-5">
              Ready to build something exceptional?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A7B2AD] text-base leading-relaxed mb-10">
              Tell us about your project. We&apos;ll respond within 2 hours with a clear next step —
              no pushy sales, no obligations.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#0B241B] border border-[#9BE53A]/12 rounded-xl hover:border-[#9BE53A]/30 transition-colors group"
              >
                <div className="w-11 h-11 bg-[#25D366]/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/25 transition-colors">
                   <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  />
                </div>
                <div>
                  <p className="text-[#F8FAFC] font-bold text-sm">WhatsApp</p>
                  <p className="text-[#A7B2AD] text-sm">07039312869 — Instant response</p>
                </div>
              </a>

              <a
                href={`tel:${PHONE_NUM}`}
                className="flex items-center gap-4 p-4 bg-[#0B241B] border border-[#9BE53A]/12 rounded-xl hover:border-[#9BE53A]/30 transition-colors group"
              >
                <div className="w-11 h-11 bg-[#9BE53A]/12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#9BE53A]/22 transition-colors">
                  <Phone size={20} className="text-[#9BE53A]" />
                </div>
                <div>
                  <p className="text-[#F8FAFC] font-bold text-sm">Phone</p>
                  <p className="text-[#A7B2AD] text-sm">{PHONE_NUM}</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL_ADDR}`}
                className="flex items-center gap-4 p-4 bg-[#0B241B] border border-[#9BE53A]/12 rounded-xl hover:border-[#9BE53A]/30 transition-colors group"
              >
                <div className="w-11 h-11 bg-[#9BE53A]/12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#9BE53A]/22 transition-colors">
                  <Mail size={20} className="text-[#9BE53A]" />
                </div>
                <div>
                  <p className="text-[#F8FAFC] font-bold text-sm">Email</p>
                  <p className="text-[#A7B2AD] text-sm">{EMAIL_ADDR}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-[#0B241B] border border-[#9BE53A]/12 rounded-xl">
                <div className="w-11 h-11 bg-[#9BE53A]/12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#9BE53A]" />
                </div>
                <div>
                  <p className="text-[#F8FAFC] font-bold text-sm">Location</p>
                  <p className="text-[#A7B2AD] text-sm">Awka, Anambra State · Serving Nigeria &amp; Beyond</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="bg-[#0B241B] border border-[#9BE53A]/12 rounded-2xl p-6 sm:p-8"
          >
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#9BE53A]/12 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={28} className="text-[#9BE53A]" />
                </div>
                <h3 className="text-[#F8FAFC] text-xl font-extrabold mb-3">Message Received!</h3>
                <p className="text-[#A7B2AD] text-sm leading-relaxed mb-6">
                  Thank you for reaching out. We&apos;ll review your message and get back to you within 2 hours.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#9BE53A] font-semibold hover:text-[#B8F35A] transition-colors text-sm"
                >
                  <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  /> Or chat with us on WhatsApp now
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-[#F8FAFC] font-extrabold text-lg mb-6">Send us a message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A7B2AD] text-xs font-semibold mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Okafor"
                      className="w-full bg-[#071E16] border border-[#9BE53A]/15 rounded-lg px-4 py-3 text-[#F8FAFC] text-sm placeholder:text-[#A7B2AD]/40 focus:outline-none focus:border-[#9BE53A]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A7B2AD] text-xs font-semibold mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@business.com"
                      className="w-full bg-[#071E16] border border-[#9BE53A]/15 rounded-lg px-4 py-3 text-[#F8FAFC] text-sm placeholder:text-[#A7B2AD]/40 focus:outline-none focus:border-[#9BE53A]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A7B2AD] text-xs font-semibold mb-1.5">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="08012345678"
                      className="w-full bg-[#071E16] border border-[#9BE53A]/15 rounded-lg px-4 py-3 text-[#F8FAFC] text-sm placeholder:text-[#A7B2AD]/40 focus:outline-none focus:border-[#9BE53A]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A7B2AD] text-xs font-semibold mb-1.5">Business Type</label>
                    <input
                      type="text"
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      placeholder="Hotel, School, Restaurant..."
                      className="w-full bg-[#071E16] border border-[#9BE53A]/15 rounded-lg px-4 py-3 text-[#F8FAFC] text-sm placeholder:text-[#A7B2AD]/40 focus:outline-none focus:border-[#9BE53A]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A7B2AD] text-xs font-semibold mb-1.5">Tell us about your project *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe what you need — the more detail, the better we can help..."
                    className="w-full bg-[#071E16] border border-[#9BE53A]/15 rounded-lg px-4 py-3 text-[#F8FAFC] text-sm placeholder:text-[#A7B2AD]/40 focus:outline-none focus:border-[#9BE53A]/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#9BE53A] hover:bg-[#B8F35A] text-[#071E16] py-4 rounded-xl font-extrabold text-base transition-colors shadow-[0_4px_20px_rgba(155,229,58,0.25)]"
                >
                  Send Message
                </button>

                <p className="text-[#A7B2AD] text-xs text-center">
                  Or reach us directly on{" "}
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#9BE53A] hover:underline font-semibold">
                    WhatsApp
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 sm:py-28 bg-[#071E16] overflow-hidden" style={GRID_BG}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(155,229,58,0.1) 0%, transparent 65%)" }}
      />
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <SectionLabel text="Let's Work Together" />
        <motion.h2
          variants={fadeUp}
          className="text-[#F8FAFC] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mt-2"
        >
          Let&apos;s Build Something That{" "}
          <span className="text-[#9BE53A]">Grows</span>
          {" "}Your Business.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[#A7B2AD] mt-5 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          The best time to invest in your digital presence was yesterday. The second best time is today.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={() => go("#contact")}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#9BE53A] text-[#071E16] px-8 py-4 rounded-xl font-extrabold text-base hover:bg-[#B8F35A] transition-all hover:scale-105 shadow-[0_4px_28px_rgba(155,229,58,0.32)]"
          >
            Start Your Project
            <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-white/15 text-[#F8FAFC] px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/5 transition-colors"
          >
            <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-8 h-6"
  />
            Chat on WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071E16] border-t border-[#9BE53A]/10 pt-14 pb-8" style={GRID_BG}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <button onClick={() => go("#home")} className="mb-5 block">
              <img src={logo} alt="OctaDevs" className="h-14 w-auto" />
            </button>
            <p className="text-[#A7B2AD] text-sm leading-relaxed max-w-xs mb-6">
              Nigeria&apos;s premium software agency. We build websites and custom software that help businesses
              attract customers and grow faster.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A7B2AD] hover:text-[#9BE53A] text-sm transition-colors">
                <img
    src={whatsappIcon}
    alt="WhatsApp"
     className="w-6 h-4"
  /> 07039312869 (WhatsApp)
              </a>
              <a href={`tel:${PHONE_NUM}`} className="flex items-center gap-2 text-[#A7B2AD] hover:text-[#9BE53A] text-sm transition-colors">
                <Phone size={15} className="text-[#9BE53A]" /> {PHONE_NUM}
              </a>
              <a href={`mailto:${EMAIL_ADDR}`} className="flex items-center gap-2 text-[#A7B2AD] hover:text-[#9BE53A] text-sm transition-colors">
                <Mail size={15} className="text-[#9BE53A]" /> {EMAIL_ADDR}
              </a>
              <span className="flex items-center gap-2 text-[#A7B2AD] text-sm">
                <MapPin size={15} className="text-[#9BE53A]" /> Awka, Anambra State, Nigeria
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[#F8FAFC] font-bold text-sm mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.label}>
                  <button
                    onClick={() => go(n.href)}
                    className="text-[#A7B2AD] hover:text-[#9BE53A] text-sm transition-colors"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#F8FAFC] font-bold text-sm mb-5">Services</h4>
            <ul className="space-y-3">
              {["Business Websites", "School Portals", "Hotel Booking", "Restaurant Sites", "Church Websites", "Custom Software"].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => go("#services")}
                    className="text-[#A7B2AD] hover:text-[#9BE53A] text-sm transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#9BE53A]/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A7B2AD] text-xs">
            &copy; {year} OctaDevs. All rights reserved.
          </p>
          <p className="text-[#A7B2AD] text-xs">
            Built with precision &middot; Awka, Nigeria &middot; Serving clients nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#071E16] antialiased">
      <Header />
      <FloatingWA />
      <Hero />
      <TrustBar />
      <WhyWebsites />
      <Services />
      <Industries />
      <Features />
      <Process />
      <WhyOctaDevs />
      <Recommender />
      <FAQ />
      <Contact />
      <CTABanner />
      <Footer />
    </div>
  );
}
