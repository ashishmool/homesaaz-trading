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
        <section className="padding">
            <div id="contact-us" className="max-container flex flex-col items-center justify-start gap-5">
                <h2 className="text-4xl font-palanquin font-bold text-center">
                    Contact
                    <span className="text-coral-red"> Us</span>
                </h2>
                <div className="flex xl:flex-row flex-col justify-center items-center w-full gap-10 mt-6">
                    {/* Left side - Google Maps */}
                    <div className="xl:w-1/2 w-full h-[500px]">
                        <h2 className="font-palanquin text-5xl font-bold mb-6">Find Us on Google</h2>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.098050776102!2d85.334969!3d27.708313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197525847505%3A0xf704d925d08588f6!2sFashion%20Furnishing!5e0!3m2!1sen!2snp!4v1694160808102!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Fashion Furnishing"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* Right side - Contact Form */}
                    <div className="xl:w-1/2 w-full flex flex-col justify-center items-center">
                        <h2 className="font-palanquin text-5xl font-bold mb-6">Send Us a Message</h2>
                        <p className="font-montserrat text-sm text-slate-gray dark:text-gray-400 mb-10 text-center">
                            For any queries, feel free to reach out to us via email or phone. We typically respond within 1-2 working days.
                        </p>

                        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="p-4 border rounded-lg w-full"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-4 border rounded-lg w-full"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="p-4 border rounded-lg w-full h-32"
                                required
                            />
                            <Button type="submit">Submit Query</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
