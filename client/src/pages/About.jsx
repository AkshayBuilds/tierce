import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="pb-20 bg-[#f8fafc]">

      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 bg-[#0f172a] rounded-2xl overflow-hidden mb-14 flex items-center px-10 md:px-16">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #3b82f6 0%, transparent 60%)' }}
        />
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-[#3b82f6]"></div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6]">Our Story</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">About <span className="text-[#3b82f6]">TIERCE</span></h1>
          <p className="text-[#94a3b8] text-sm mt-2">Premium fashion, accessible to everyone.</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="flex flex-col md:flex-row gap-10 mb-16 items-center">
        <div className="w-full md:w-2/5 shrink-0">
          <img
            className="w-full rounded-2xl object-cover shadow-sm"
            src={assets.about_img}
            alt="About Tierce"
          />
        </div>
        <div className="flex flex-col gap-5 text-[#64748b] leading-relaxed text-sm">
          <div>
            <h2 className="text-lg font-bold text-[#0f172a] mb-2">How it started</h2>
            <p>Tierce was born out of a passion for fashion and a desire to make premium clothing accessible to everyone. We've worked to curate a collection that blends contemporary trends with timeless elegance.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f172a] mb-2">Where we are today</h2>
            <p>From a simple idea — quality meets affordability — we've grown into a trusted destination for fashion-forward individuals who demand both style and substance in their wardrobe choices.</p>
          </div>

          {/* Mission Card */}
          <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-[#3b82f6] rounded-md flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-bold">✦</span>
              </div>
              <p className="text-sm font-bold text-[#0f172a]">Our Mission</p>
            </div>
            <p className="text-sm text-[#334155] leading-relaxed">
              To empower customers with choice, convenience, and confidence — delivering a seamless shopping experience where every product exceeds expectations.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { num: '50K+', label: 'Happy Customers' },
              { num: '5,200+', label: 'Products' },
              { num: '99%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-[#0f172a]">{stat.num}</p>
                <p className="text-xs text-[#94a3b8] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-0.5 bg-[#3b82f6]"></div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6]">Why us</p>
        </div>
        <h2 className="text-2xl font-bold text-[#0f172a]">What sets us apart</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {[
          {
            icon: '✓',
            iconBg: '#eff6ff',
            iconColor: '#3b82f6',
            title: 'Quality Assurance',
            desc: 'Every product is meticulously selected and vetted to meet our stringent quality standards before it reaches you.',
          },
          {
            icon: '⚡',
            iconBg: '#fefce8',
            iconColor: '#ca8a04',
            title: 'Seamless Experience',
            desc: 'Our user-friendly interface and hassle-free ordering process make shopping faster and easier than ever.',
          },
          {
            icon: '♥',
            iconBg: '#fef2f2',
            iconColor: '#ef4444',
            title: 'Dedicated Support',
            desc: 'Our team of professionals is available 24/7 to assist you at every step — from browsing to delivery.',
          },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-[#e2e8f0] rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ background: card.iconBg, color: card.iconColor }}
            >
              {card.icon}
            </div>
            <div>
              <p className="font-bold text-[#0f172a] mb-1">{card.title}</p>
              <p className="text-sm text-[#64748b] leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Strip */}
      <div className="bg-[#0f172a] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-xl">Ready to explore?</p>
          <p className="text-[#94a3b8] text-sm mt-1">Browse thousands of curated products today.</p>
        </div>
        <a
          href="/collection"
          className="shrink-0 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Shop Now →
        </a>
      </div>
    </div>
  );
};

export default About;