/** @format */

import Button from '../components/Button';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Query submitted:', formData);
    alert('Your query has been sent. We will respond within 1-2 working days.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="section-shell bg-white dark:bg-surface-dark">
      <div id="contact-us" className="max-container scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Support</p>
          <h2 className="section-heading">
            Contact <span className="text-brand">us</span>
          </h2>
          <p className="section-lede">
            Questions about products, specifications, or delivery? Reach out — we typically respond within 1–2 working days.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-brand-lg border border-black/[0.06] dark:border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.098050776102!2d85.334969!3d27.708313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197525847505%3A0xf704d925d08588f6!2sFashion%20Furnishing!5e0!3m2!1sen!2snp!4v1694160808102!5m2!1sen!2snp"
              width="100%"
              height="100%"
              className="min-h-[320px] w-full lg:min-h-[440px]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Homesaaz location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-display text-2xl font-semibold text-ink dark:text-white">Send a message</h3>
            <p className="mt-2 text-sm text-ink-muted dark:text-gray-400">
              Prefer email or phone? Use the details in the footer, or submit the form below.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className="input min-h-[140px] resize-y"
                required
              />
              <Button type="submit" className="mt-2 self-start">
                Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
