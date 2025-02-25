import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { motion } from 'framer-motion';
import { SiPython, SiReact, SiGraphql, SiJavascript, SiNodedotjs, 
         SiDeno, SiTypescript, SiDocker, SiCplusplus, SiGo, SiRust, SiPrisma } from 'react-icons/si';
import { FaPlay, FaPause, FaForward, FaBackward, FaJava } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchVideos, getPlaylistItems, setApiKey } from '../api/youtube';

export default function Body() {
    
  const [data, setData] = useState('');
  const [searchBoxFlag, setSearchBoxFlag] = useState(false);
  const [skills, setSkills] = useState('Select a skill to load tutorial');
  const [playlistResponse, setPlaylistResponse] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [title, setTitle] = useState('Search a video or select from the playlist to begin');
  const [description, setDescription] = useState('Select a video');
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const playerRef = useRef(); 
const [isPlaying, setIsPlaying] = useState(false); 
const [startTime, setStartTime] = useState(0); // Track video start time for resuming
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve saved video ID, time, search query, and playlist from localStorage on load
    const savedVideoId = localStorage.getItem('savedVideoId');
    const savedTime = parseFloat(localStorage.getItem('savedTime')) || 0;
    const savedSearchQuery = localStorage.getItem('savedSearchQuery');
    const savedPlaylist = JSON.parse(localStorage.getItem('savedPlaylist') || '[]');

    if (savedVideoId) {
      setCurrentVideo(`https://www.youtube.com/watch?v=${savedVideoId}`);
      setStartTime(savedTime);
    }

    if (savedSearchQuery) {
      setData(savedSearchQuery); // Restore search term in the input
    }

    if (savedPlaylist.length) {
      setPlaylistResponse(savedPlaylist); // Restore playlist
    }
  }, []);

  function getData(val) {
    const query = val.target.value;
    setData(query);
    localStorage.setItem('savedSearchQuery', query); // Save search term to localStorage
  }
  function submitData() {
    if (data === '') {
      toast.warning("Please enter a search term!");
      return;
    }

    setSearchBoxFlag(true);
    searchVideos(data)
      .then((response) => {
        setPlaylistResponse(response.data.items);
        localStorage.setItem('savedPlaylist', JSON.stringify(response.data.items));
      })
      .catch((error) => {
        console.error('API Error:', error);
        
        let errorMessage = "An unexpected error occurred.";
        
        if (error.response) {
          // Handle specific error codes
          switch (error.response.status) {
            case 403:
              errorMessage = "API quota exceeded. Please try again later or use your own YouTube API key.";
              break;
            case 400:
              errorMessage = "Invalid request. Please check your search term.";
              break;
            case 429:
              errorMessage = "Too many requests. Please wait a moment and try again.";
              break;
            default:
              errorMessage = `Error: ${error.response.data.error?.message || "Something went wrong"}`;
          }
        } else if (error.request) {
          errorMessage = "Network error. Please check your internet connection.";
        }

        // Show error toast
        toast.error(<div className="flex flex-col w-96"><span className="font-bold mb-1">Error</span><span>{errorMessage}</span></div>, {
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Clear the playlist if there's an error
        setPlaylistResponse([]);
        setSearchBoxFlag(false);
      });
  }

  const playlistIds = {
    python: "PLEiEAq2VkUUJO27b6PyoSd7CJjWIPyHYO",
    reactjs: "PLSsAz5wf2lkKm0BG9wUWWSgYWBzDa-dFs",
    reactnative: "PLRAV69dS1uWSjBBJ-egNNOd4mdblt1P4c",
    graphql: "PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f",
    javascript: "PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET",
    nodejs: "PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC",
    deno: "PL4cUxeGkcC9gnaJdxuGvEGYQ9iHb8mxsh",
    typescript: "PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI",
    docker: "PLhW3qG5bs-L99pQsZ74f-LC-tOEsBp2rK",
    "c++": "PLVlQHNRLflP8_DGKcMoRw-TYJJALgGu4J",
    java: "PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ",
    golang: "PL4cUxeGkcC9gC88BEo9czgyS72A3doDeM",
    rust: "PLai5B987bZ9CoVR-QEIN9foz4QCJ0H2Y8",
    prisma: "PLsvvBhdpMqBwrKGF8TytiLlcCT3gB_bmW"
  };

  function submitSkillButton(skill) {
    setSkills(skill);
    setSearchBoxFlag(false);
    setIsLoading(true);
    setError(null);

    const playlistId = playlistIds[skill];
    
    if (!playlistId) {
      setError(`No playlist found for ${skill}`);
      setIsLoading(false);
      return;
    }

    getPlaylistItems(playlistId)
      .then((response) => {
        setPlaylistResponse(response.data.items);
        localStorage.setItem('savedPlaylist', JSON.stringify(response.data.items));
      })
      .catch((error) => {
        console.error('Playlist API Error:', error);
        let errorMessage = "Failed to load playlist.";
        
        if (error.response?.status === 403) {
          errorMessage = "API quota exceeded. Please try again later or use your own YouTube API key.";
        } else if (error.response?.status === 404) {
          errorMessage = `Playlist for ${skill} not found or is private.`;
        }

        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function nextVideo(video, title, description) {
    let videoId = video.id?.videoId || video.snippet?.resourceId?.videoId;

    if (!videoId) {
      console.error('Video ID not found');
      return;
    }

    setTitle(title);
    setDescription(description);
    setCurrentVideo(`https://www.youtube.com/watch?v=${videoId}`);
    setStartTime(0); // Reset start time for new video
    setIsDescriptionVisible(true);

    // Save current video ID to localStorage
    localStorage.setItem('savedVideoId', videoId);
  }

  const handleProgress = (progress) => {
    // Save current time to localStorage
    if (progress.playedSeconds > 0) {
      localStorage.setItem('savedTime', progress.playedSeconds);
    }
  };

  const skillIcons = [
    { icon: SiPython, name: 'python', color: '#3776AB' },
    { icon: SiJavascript, name: 'javascript', color: '#F7DF1E' },
    { icon: SiReact, name: 'reactjs', color: '#61DAFB' },
     { icon: SiNodedotjs, name: 'nodejs', color: '#339933' },
    { icon: SiReact, name: 'reactnative', color: '#61DAFB' },
    { icon: SiTypescript, name: 'typescript', color: '#3178C6' },
    { icon: SiCplusplus, name: 'c++', color: '#00599C' },
    { icon: FaJava, name: 'java', color: '#007396' },
    { icon: SiGo, name: 'golang', color: '#00ADD8' },
    { icon: SiRust, name: 'rust', color: '#c7c3c3' },
    { icon: SiDeno, name: 'deno', color: '#c7c3c3' },
    { icon: SiGraphql, name: 'graphql', color: '#E535AB' },
    { icon: SiPrisma, name: 'prisma', color: '#336791' },
    { icon: SiDocker, name: 'docker', color: '#2496ED' },
   
  ];

  const linkify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split('\n').map((line, lineIndex) => (
      <p key={lineIndex} className="mb-2">
        {line.split(urlRegex).map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-600 underline"
              >
                {part}
              </a>
            );
          }
          return part;
        })}
      </p>
    ));
  };

  const handleApiKeyChange = (newKey) => {
    setApiKey(newKey);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-10 bg-white dark:bg-black min-h-screen"
    >
      <ToastContainer />
      {/* Header Section */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-4 mb-10"
      >
        {/* <h3 className="text-gray-600 dark:text-gray-400 text-lg">
          Welcome To Distraction-Free YouTube Learning Experience 👨‍💻
        </h3> */}
        <h1 className="text-4xl bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-bold">
          What Do You Want To Learn Today?
        </h1>
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-7 md:grid-cols-14 gap-4 max-w-7xl mx-auto mb-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {skillIcons.map((skill, index) => (
          <motion.div
            key={skill.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => submitSkillButton(skill.name)}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <skill.icon size={40} color={skill.color} />
            <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Search and API Key Section */}
      <motion.div 
        className="relative w-full max-w-2xl mx-auto mb-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <input
          type="text"
          placeholder="Search for tutorials..."
          value={data}
          onChange={getData}
          onKeyPress={(e) => e.key === 'Enter' && submitData()}
          className="w-full p-4 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={submitData}
          disabled={!data}
          className="absolute right-2 top-1/2 transform -translate-y-1/2
                   px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500
                   text-white font-medium disabled:opacity-50"
        >
          Search
        </motion.button>
      </motion.div>

      {/* Video and Playlist Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video Player */}
        <motion.div 
          className="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative pt-[56.25%]">
            <div className="absolute inset-0">
              <ReactPlayer
                ref={playerRef}
                url={currentVideo}
                width="100%"
                height="100%"
                playing={isPlaying}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onProgress={handleProgress}
                onStart={() => playerRef.current.seekTo(startTime)}
                className="absolute top-0 left-0"
              />
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {title}
            </h3>

            {/* Control Buttons */}
            <div className="flex justify-center items-center gap-6 mb-6">
              {/* Backward 10s */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)}
                className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  <FaBackward className="w-4 h-4" />
                </span>
              </motion.button>

              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative inline-flex h-16 w-16 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {isPlaying ? (
                    <FaPause className="w-6 h-6" />
                  ) : (
                    <FaPlay className="w-6 h-6 ml-1" />
                  )}
                </span>
              </motion.button>

              {/* Forward 10s */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)}
                className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  <FaForward className="w-4 h-4" />
                </span>
              </motion.button>
            </div>

            {/* Description Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
              className="relative inline-flex w-full h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                {isDescriptionVisible ? 'Hide Description' : 'Show Description'}
              </span>
            </motion.button>

            {isDescriptionVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 text-gray-700 dark:text-gray-300"
              >
                {linkify(description)}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div 
          className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Playlist</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Total videos: {playlistResponse.length}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-[600px] text-red-500 px-4 text-center">
              {error}
            </div>
          ) : (
            <div className="overflow-y-auto h-[600px] playlist-scroll">
              {playlistResponse.map((video, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                  className="p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700"
                  onClick={() => nextVideo(video, video.snippet.title, video.snippet.description)}
                >
                  <div className="flex gap-4">
                    <img 
                      src={video.snippet.thumbnails.default.url} 
                      className="w-24 h-16 object-cover rounded-md"
                      alt={video.snippet.title}
                    />
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                      {video.snippet.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};