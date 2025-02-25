// frontend/src/components/header.js

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SiYoutube } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { toast } from 'react-toastify';
import { FiInfo } from 'react-icons/fi';

export default function Header({ onApiKeyChange }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(localStorage.getItem('youtubeApiKey') || '');
  const [useCustomKey, setUseCustomKey] = useState(localStorage.getItem('useCustomKey') === 'true');
  const defaultApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleSubmitKey = () => {
    if (customApiKey.trim()) {
      localStorage.setItem('youtubeApiKey', customApiKey);
      localStorage.setItem('useCustomKey', 'true');
      setUseCustomKey(true);
      onApiKeyChange(customApiKey);
      setIsDialogOpen(false);
      toast.success('Custom API Key activated!');
    } else {
      toast.error('Please enter a valid API Key');
    }
  };

  const toggleApiKey = () => {
    if (useCustomKey) {
      localStorage.setItem('useCustomKey', 'false');
      setUseCustomKey(false);
      onApiKeyChange(defaultApiKey);
      toast.info('Switched to default API Key');
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16 gap-4 sm:gap-0">
            {/* Logo Section */}
            <Link to="/" className="flex items-center">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20 
                }}
                className="text-lg sm:text-xl font-mono font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text flex items-center"
              >
                {"<"}<SiYoutube className="text-[#FF0000] mx-1 text-xl sm:text-2xl" />YouTubePlayer {"/>"}
              </motion.div>
            </Link>

            {/* Buttons Section */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
              {/* API Key Button with Tooltip */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleApiKey}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md ${
                    useCustomKey 
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                  } text-white font-medium`}
                >
                  <span>{useCustomKey ? 'Custom API Active' : 'Set Custom API'}</span>
                </motion.button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 w-max max-w-[250px]">
                  <FiInfo className="inline mr-1" />
                  Your API key is stored locally and never sent to our servers
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                </div>
              </div>

              {/* GitHub Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/hotheadhacker/youtube-player"
                target="_blank"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium hover:from-gray-700 hover:to-gray-800 transition-all"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Star on GitHub</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDialogOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            
            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 z-50 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Custom YouTube API Key
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <FiInfo className="inline mr-1" />
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
              <input
                type="text"
                placeholder="Enter your YouTube API Key"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitKey}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium"
                >
                  Apply Key
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}