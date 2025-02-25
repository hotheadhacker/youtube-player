import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function ApiKeyManager({ onApiKeyChange }) {
  const [useCustomKey, setUseCustomKey] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const defaultApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    const savedKey = localStorage.getItem('youtubeApiKey');
    const savedUseCustom = localStorage.getItem('useCustomKey') === 'true';
    if (savedKey) setCustomApiKey(savedKey);
    if (savedUseCustom) setUseCustomKey(savedUseCustom);
  }, []);

  const handleToggle = () => {
    const newValue = !useCustomKey;
    setUseCustomKey(newValue);
    localStorage.setItem('useCustomKey', newValue);
    onApiKeyChange(newValue ? customApiKey : defaultApiKey);
  };

  const handleSubmitKey = () => {
    if (customApiKey.trim()) {
      localStorage.setItem('youtubeApiKey', customApiKey);
      onApiKeyChange(customApiKey);
      toast.success('API Key updated successfully!');
    } else {
      toast.error('Please enter a valid API Key');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={useCustomKey}
            onChange={handleToggle}
          />
          <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
          <div className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${useCustomKey ? 'translate-x-5' : 'translate-x-1'} top-1`}></div>
        </div>
        <span className="ml-3 text-gray-700 dark:text-gray-300">
          Use Custom API Key
        </span>
      </label>
      
      {useCustomKey && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your YouTube API Key"
            value={customApiKey}
            onChange={(e) => setCustomApiKey(e.target.value)}
            className="w-64 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmitKey}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium"
          >
            Apply Key
          </motion.button>
        </div>
      )}
    </div>
  );
} 