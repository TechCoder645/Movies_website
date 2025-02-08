import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const navigate = useNavigate();

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] mr-5 cursor-pointer transition-colors duration-300"
          ></i>
          About Us
        </h1>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto mt-8 space-y-12"
      >
        {/* Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#6556CD] to-purple-500 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Your Ultimate Entertainment Guide
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            variants={itemVariants}
          >
            Discover the latest in movies, TV shows, and entertainment news
          </motion.p>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="p-6 bg-[#2a2931]/30 rounded-xl backdrop-blur-sm border border-[#6556CD]/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg">
              Welcome to our website! We are dedicated to providing you with the latest information on movies, TV shows, and celebrities. Our goal is to create a comprehensive and user-friendly platform where you can find all the information you need about your favorite entertainment.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-6 bg-[#2a2931]/30 rounded-xl backdrop-blur-sm border border-[#6556CD]/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg">
              Our team is passionate about movies and TV shows, and we work hard to bring you the most accurate and up-to-date information. Whether you're looking for the latest movie releases, TV show schedules, or celebrity news, we've got you covered.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-6 bg-[#2a2931]/30 rounded-xl backdrop-blur-sm border border-[#6556CD]/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg">
              Thank you for visiting our website. We hope you enjoy your time here and find the information you're looking for. If you have any questions or feedback, please don't hesitate to contact us.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-8 bg-[#2a2931]/40 rounded-xl backdrop-blur-sm border border-[#6556CD]/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4 text-[#6556CD]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Our Mission
            </motion.h2>
            <p className="text-lg">
              Our mission is to provide a one-stop platform for all your entertainment needs. We strive to offer the most comprehensive and accurate information on movies, TV shows, and celebrities, making it easy for you to stay informed and entertained.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-8 bg-[#2a2931]/40 rounded-xl backdrop-blur-sm border border-[#6556CD]/30 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4 text-[#6556CD]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Contact Us
            </motion.h2>
            <p className="text-lg">
              If you have any questions, comments, or feedback, please feel free to reach out to us at{' '}
              <motion.a 
                href="mailto:info@ourwebsite.com" 
                className="text-[#6556CD] hover:text-purple-400 transition-colors duration-300 underline"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                info@ourwebsite.com
              </motion.a>
              . We would love to hear from you!
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;