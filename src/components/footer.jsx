// Footer.js
import { FaGithub, FaKeyboard } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SiYoutube } from 'react-icons/si';
import { BsStars } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="flex flex-wrap justify-between items-start gap-10">
          {/* Platform Features */}
          <div className="flex-1 min-w-[280px] max-w-[400px]">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">
              Platform Features
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                <span>Ad-Free Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span>Curated Content</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                <span>Open Source</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span>Distraction-Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                <span>Multiple Playlists</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span>Saved Progress</span>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="flex-1 min-w-[280px] max-w-[400px]">
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4 flex items-center gap-2">
              <FaKeyboard className="inline-block" />
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
              <div className="flex items-center justify-between">
                <span>Play/Pause</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded">Space</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Forward 10s</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded">→</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Backward 10s</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded">←</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Toggle Fullscreen</span>
                <kbd className="px-2 py-1 bg-gray-800 rounded">F</kbd>
              </div>
            </div>
          </div>

          {/* GitHub Section */}
          <div className="flex items-end min-w-[200px]">
            <motion.a
              href="https://github.com/hotheadhacker/youtube-player"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-5 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-5 h-5" />
              <span>Source Code</span>
            </motion.a>
          </div>
        </div>

        {/* Credits Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 ml-50">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
              <div className="text-xl font-mono font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text flex items-center">
                {"<"}<SiYoutube className="text-[#FF0000] mx-1 text-2xl" />YouTubePlayer {"/>"}
              </div>
              <span className="text-gray-400 mx-4">•</span>
              <span className="text-gray-400">Developed by</span>
              <a href="https://isalman.dev" target="_blank" rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300">Salman Qureshi</a>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">Redesigned by</span>
              <div className="flex items-center">
                <a href="https://hothead.vercel.app" target="_blank" rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300">Zaid Adil</a>
                <BsStars className="text-yellow-400 ml-1 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}