import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className='pb-20 bg-[#f8fafc]'>

      {/* Hero Banner */}
      <div className='relative w-full h-44 md:h-56 bg-[#0f172a] rounded-2xl overflow-hidden mb-14 flex items-center px-10 md:px-16'>
        <div className='absolute inset-0 opacity-10'
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 60%)' }}
        />
        <div>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-8 h-0.5 bg-[#3b82f6]'></div>
            <p className='text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6]'>Get in touch</p>
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-white'>Contact <span className='text-[#3b82f6]'>Us</span></h1>
          <p className='text-[#94a3b8] text-sm mt-2'>We'd love to hear from you. We're always here to help.</p>
        </div>
      </div>

      {/* Info Cards Row */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14'>
        {[
          {
            icon: '📍',
            bg: '#eff6ff',
            title: 'Our Store',
            lines: ['Ahmedabad, Gujarat', 'India — 380001'],
          },
          {
            icon: '📞',
            bg: '#f0fdf4',
            title: 'Phone & Email',
            lines: ['+91 931-684-7190', 'support@tierce.in'],
          },
          {
            icon: '🕐',
            bg: '#fefce8',
            title: 'Working Hours',
            lines: ['Mon – Sat: 9am – 6pm', 'Sunday: Closed'],
          },
        ].map((card, i) => (
          <div key={i} className='bg-white border border-[#e2e8f0] rounded-2xl p-6 flex flex-col gap-3'>
            <div
              className='w-10 h-10 rounded-xl flex items-center justify-center text-xl'
              style={{ background: card.bg }}
            >
              {card.icon}
            </div>
            <p className='font-bold text-sm text-[#0f172a]'>{card.title}</p>
            {card.lines.map((line, j) => (
              <p key={j} className='text-sm text-[#64748b] leading-snug'>{line}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Main Section — Image + Form */}
      <div className='flex flex-col md:flex-row gap-8 items-stretch'>

        {/* Left Image + Careers */}
        <div className='flex flex-col gap-4 w-full md:w-2/5 shrink-0'>
          <img
            src={assets.contact_img}
            alt="Contact"
            className='w-full h-64 md:h-auto object-cover rounded-2xl flex-1'
          />
          {/* Careers Card */}
        </div>

        {/* Right — Contact Form */}
        <div className='flex-1 bg-white border border-[#e2e8f0] rounded-2xl p-8'>
          <div className='mb-6'>
            <h2 className='text-lg font-bold text-[#0f172a]'>Send us a message</h2>
            <p className='text-sm text-[#94a3b8] mt-1'>Fill out the form and we'll get back to you within 24 hours.</p>
          </div>

          {submitted ? (
            <div className='flex flex-col items-center justify-center py-16 gap-4'>
              <div className='w-14 h-14 bg-[#f0fdf4] rounded-full flex items-center justify-center text-2xl'>✓</div>
              <p className='font-bold text-[#0f172a]'>Message sent!</p>
              <p className='text-sm text-[#94a3b8]'>We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-semibold text-[#0f172a] uppercase tracking-wider'>Your Name</label>
                  <input
                    type='text'
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='John Doe'
                    className='border border-[#e2e8f0] rounded-lg px-4 py-2.5 text-sm text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none focus:border-[#3b82f6] transition-colors bg-[#f8fafc]'
                  />
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-semibold text-[#0f172a] uppercase tracking-wider'>Email Address</label>
                  <input
                    type='email'
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder='john@example.com'
                    className='border border-[#e2e8f0] rounded-lg px-4 py-2.5 text-sm text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none focus:border-[#3b82f6] transition-colors bg-[#f8fafc]'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-semibold text-[#0f172a] uppercase tracking-wider'>Subject</label>
                <select className='border border-[#e2e8f0] rounded-lg px-4 py-2.5 text-sm text-[#64748b] focus:outline-none focus:border-[#3b82f6] transition-colors bg-[#f8fafc]'>
                  <option>Order Issue</option>
                  <option>Return / Exchange</option>
                  <option>Product Query</option>
                  <option>Other</option>
                </select>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-xs font-semibold text-[#0f172a] uppercase tracking-wider'>Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder='Tell us how we can help...'
                  className='border border-[#e2e8f0] rounded-lg px-4 py-2.5 text-sm text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none focus:border-[#3b82f6] transition-colors bg-[#f8fafc] resize-none'
                />
              </div>

              <button
                type='submit'
                className='w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold py-3 rounded-lg text-sm transition-colors active:scale-[0.99]'
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact