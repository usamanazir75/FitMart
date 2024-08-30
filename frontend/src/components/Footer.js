import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setMessage('Thank you for subscribing!');
      setEmail('');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-slate-200 relative bottom-0 w-full">
      <div className="container mx-auto py-6 px-4">
        {/* Main Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-6"
        >
          <p className="text-lg font-semibold text-black mb-2">
            &copy; {new Date().getFullYear()} FitMart. All Rights Reserved.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0">
          {/* Find Us Here Section with Cool Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="box text-center lg:text-left"
          >
            <h3 className="text-xl font-bold mb-2 text-red-600">Find Us Here</h3>
            <p className="text-black">Connect with us on social media for the latest updates, fitness tips, and exclusive offers!</p>
            <div className="flex justify-center lg:justify-start mt-3 space-x-4">
              <a href="#" className="text-red-600 text-2xl"><FaFacebook /></a>
              <a href="#" className="text-red-600 text-2xl"><FaTwitter /></a>
              <a href="#" className="text-red-600 text-2xl"><FaLinkedin /></a>
              <a href="#" className="text-red-600 text-2xl"><FaPinterest /></a>
            </div>
          </motion.div>

          {/* Contact Us Section with Cool Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="box text-center lg:text-left lg:mx-4"
          >
            <h3 className="text-xl font-bold mb-2 text-red-600">Contact Us</h3>
            <p className="text-black mb-1"><FaPhone className="inline-block mr-2 text-red-600" />+92 3177265576</p>
            <p className="text-black mb-1"><FaPhone className="inline-block mr-2 text-red-600" />+92 3083320890</p>
            <p className="text-black"><FaEnvelope className="inline-block mr-2 text-red-600" />info@fitmart.com</p>
          </motion.div>

          {/* Newsletter Section with Cool Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false }}
            className="box text-center lg:text-left lg:mx-4"
          >
            <h3 className="text-xl font-bold mb-2 text-red-600">Newsletter</h3>
            <p className="text-black mb-2">Subscribe for latest updates</p>
            <form onSubmit={handleSubscribe} className="flex flex-col items-center">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded mb-2"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
            {message && <p className="mt-2 text-black">{message}</p>}
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-black">Made with ❤️ By <span className="text-red-600 font-bold">Usama Nazeer</span>&<span className="text-red-600 font-bold">Qasim Ali</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
