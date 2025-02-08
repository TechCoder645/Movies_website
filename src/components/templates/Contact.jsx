import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen min-h-screen bg-gradient-to-b from-[#1F1E24] to-[#2a2931] text-white p-8 overflow-y-auto"
    >
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[10vh] flex items-center p-[2%]"
      >
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] mr-5 cursor-pointer transition-colors duration-300"
          ></i>
          Contact Us
        </h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-8 space-y-12"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#6556CD] to-purple-500 text-transparent bg-clip-text">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300">
            We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
          </p>
        </div>

        <div className="space-y-8">
          <form className="space-y-4">
            <div>
              <label className="block text-lg mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 rounded-lg bg-[#2a2931] text-white border border-gray-600 focus:outline-none focus:border-[#6556CD]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-lg mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded-lg bg-[#2a2931] text-white border border-gray-600 focus:outline-none focus:border-[#6556CD]"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-lg mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full p-2 rounded-lg bg-[#2a2931] text-white border border-gray-600 focus:outline-none focus:border-[#6556CD]"
                placeholder="Your Message"
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-[#6556CD] text-white font-semibold hover:bg-purple-500 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;