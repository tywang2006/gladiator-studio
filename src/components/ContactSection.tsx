import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, Globe } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent('Contact Form Submission from Gladiator Studio Website');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\n` +
      `This message was sent from the Gladiator Studio website contact form.`
    );
    
    // Open email client
    window.location.href = `mailto:cwang@metawin.inc?subject=${subject}&body=${body}`;
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // Show success message
    alert('Thank you for your message! Your email client should open with the message ready to send.');
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "cwang@metawin.inc",
      action: () => window.location.href = 'mailto:cwang@metawin.inc',
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+44 7737 244081",
      action: () => window.location.href = 'tel:+447737244081',
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      description: "Our headquarters",
      value: "London, UK",
      action: () => {},
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Business Hours",
      description: "Monday - Friday",
      value: "9:00 AM - 6:00 PM GMT",
      action: () => {},
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-white/60" />
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Contact</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Questions about our games or interested in collaboration? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Contact Methods - Enhanced Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  onClick={method.action}
                  className={`group premium-card bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-500 ${
                    method.action !== (() => {}) ? 'cursor-pointer hover:scale-105' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color} text-white group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm md:text-base mb-1 group-hover:text-red-400 transition-colors duration-300">
                        {method.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm mb-2">{method.description}</p>
                      <p className="text-gray-300 text-xs md:text-sm font-medium truncate">{method.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form - Desktop Only, Compact */}
          <div className="hidden lg:block">
            <div className="premium-card bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Send className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Quick Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 text-sm backdrop-blur-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 text-sm backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-300 text-sm backdrop-blur-sm"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 btn-primary overflow-hidden text-sm relative"
                >
                  {/* Button shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="lg:hidden mt-8 text-center">
          <button
            onClick={() => window.location.href = 'mailto:cwang@metawin.inc?subject=Inquiry from Gladiator Studio Website'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Send us an Email
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;