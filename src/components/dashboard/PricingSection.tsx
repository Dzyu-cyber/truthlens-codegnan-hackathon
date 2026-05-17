// components/dashboard/PricingSection.tsx — Premium SaaS Pricing cards with interactive states and glowing badges

'use client';

import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Hobby Analyst',
    price: '₹0',
    desc: 'For individual verification and simple fact-checking validation.',
    features: [
      '15 verification checks per month',
      'Image Deepfake probability scanner',
      'Web-scraped credibility score analysis',
      'Standard markdown forensic reports',
      'Self-serve document verification'
    ],
    popular: false,
    cta: 'Get Started'
  },
  {
    name: 'OSINT Expert',
    price: '₹1,999',
    period: '/mo',
    desc: 'For digital journalists, media experts, and dedicated investigators.',
    features: [
      'Unlimited verification checks',
      'Advanced Video & Audio Deepfake forensics',
      'Psychological manipulation radar metrics',
      'Full Truth Timelines and bot tracking maps',
      'Priya Interactive AI Chat integration',
      'Priority RAG web search API access'
    ],
    popular: true,
    cta: 'Upgrade to Pro'
  },
  {
    name: 'Newsroom Agency',
    price: '₹14,999',
    period: '/mo',
    desc: 'For agencies, corporate public relations, and editorial newsrooms.',
    features: [
      'Multi-seat agency team collaboration',
      'High-speed batch PDF document analyzer',
      'Direct API integrations with custom CMS',
      'Real-time automated fake news notifications',
      'Priya 3D talking avatar voice generation',
      'Dedicated forensic support agents'
    ],
    popular: false,
    cta: 'Contact Sales'
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 max-w-5xl mx-auto">
      {/* ── Title ── */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-on-surface-variant">
            SaaS Subscriptions
          </span>
        </motion.div>
        <h2 className="text-[32px] md:text-[40px] leading-[48px] font-black text-on-surface font-heading tracking-tight">
          Flexible Pricing for <span className="text-primary-container">OSINT Intelligence</span>
        </h2>
        <p className="text-[14px] md:text-[15px] leading-relaxed text-on-surface-variant max-w-xl mx-auto mt-3">
          Access high-grade computational forensic power. Start for free and scale as your verification requirements grow.
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            className={`relative group rounded-3xl ${
              plan.popular ? 'lg:-translate-y-4' : ''
            }`}
          >
            {/* Poplular glowing aura */}
            {plan.popular && (
              <div className="absolute inset-0 bg-primary-container/20 rounded-3xl blur-xl pointer-events-none scale-105" />
            )}

            {/* Glowing borders */}
            <div
              className={`absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none border ${
                plan.popular
                  ? 'border-primary-container shadow-[0_0_30px_rgba(0,255,136,0.15)]'
                  : 'border-outline-variant/30 group-hover:border-primary-container/40'
              }`}
            />

            <div
              className={`relative h-full flex flex-col justify-between p-8 rounded-3xl backdrop-blur-md transition-all duration-300 ${
                plan.popular
                  ? 'bg-surface-container-high/60 border border-primary-container/30'
                  : 'bg-surface-container-lowest/40 border border-outline-variant/20'
              }`}
            >
              <div>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-6 right-6 px-3 py-1 bg-primary-container text-on-primary-container font-black text-[9px] tracking-widest uppercase rounded-full shadow-[0_0_15px_rgba(0,255,136,0.4)]">
                    Most Popular
                  </div>
                )}

                <h3 className="text-[20px] font-black text-on-surface mb-2">{plan.name}</h3>
                <p className="text-[13px] text-on-surface-variant leading-relaxed mb-6">{plan.desc}</p>
                
                {/* Pricing Display */}
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-[36px] font-black text-on-surface font-heading leading-none">{plan.price}</span>
                  {plan.period && <span className="text-[14px] text-on-surface-variant font-medium">{plan.period}</span>}
                </div>

                {/* Features List */}
                <ul className="space-y-4 border-t border-outline-variant/10 pt-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[16px] text-primary-container mt-0.5 select-none">check_circle</span>
                      <span className="text-[13px] text-on-surface font-medium leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action */}
              <button
                className={`mt-10 w-full py-4 rounded-2xl font-bold text-[12px] uppercase tracking-wider transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_35px_rgba(0,255,136,0.5)] hover:bg-[#00ff88]'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/30 hover:border-primary-container/40'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
