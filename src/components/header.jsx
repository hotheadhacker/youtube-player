// frontend/src/components/header.js
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SiYoutube } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

export default function Header() {
  const { language, toggleLanguage, translations } = useContext(LanguageContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-xl font-mono font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text flex items-center"
            >
              {"<"}<SiYoutube className="text-[#FF0000] mx-1 text-2xl" />YouTubePlayer {"/>"}
            </motion.div>
          </Link>

          <div className="flex space-x-4 items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium hover:from-gray-700 hover:to-gray-800 transition-all"
            >
              <AnimatePresence exitBeforeEnter>
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {language}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/hotheadhacker/youtube-player"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium hover:from-gray-700 hover:to-gray-800 transition-all"
            >
              <FaGithub className="w-5 h-5" />
              <span>{translations[language].header.star}</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
