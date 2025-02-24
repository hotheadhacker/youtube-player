import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player/youtube';

import PythonImg from './../imgs/python.png';
import ReactImg from './../imgs/reactjs.jpg';
import ReactNativeImg from './../imgs/reactnative.png';
import GraphQLImg from './../imgs/graphql.png';
import JSImg from './../imgs/javascript.png';
import NodeImg from './../imgs/nodejs.png';
import DenoImg from './../imgs/deno.svg';
import TSImg from './../imgs/typescript.png';
import DockerImg from './../imgs/docker.png';

const Body = () => {
  const [data, setData] = useState('');
  const [playlistResponse, setPlaylistResponse] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [title, setTitle] = useState('Search a video or select from the playlist to begin');
  const [description, setDescription] = useState('Select a video');
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const playerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [skills, setSkills] = useState('Select a skill to load tutorial');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedVideoId = localStorage.getItem('savedVideoId');
    const savedTime = parseFloat(localStorage.getItem('savedTime')) || 0;
    const savedSearchQuery = localStorage.getItem('savedSearchQuery');
    const savedPlaylist = JSON.parse(localStorage.getItem('savedPlaylist') || '[]');

    if (savedVideoId) {
      setCurrentVideo(`https://www.youtube.com/watch?v=${savedVideoId}`);
      setStartTime(savedTime);
    }

    if (savedSearchQuery) {
      setData(savedSearchQuery);
    }

    if (savedPlaylist.length) {
      setPlaylistResponse(savedPlaylist);
    }
  }, []);

  const getData = (val) => {
    const query = val.target.value;
    setData(query);
    setError(null);
    localStorage.setItem('savedSearchQuery', query);
  };

  const submitData = async () => {
    if (data === '') {
      setError("Text box can't be empty!");
      return;
    }

    if (!process.env.REACT_APP_YOUTUBE_API_KEY) {
      setError('YouTube API key is not configured. Please add it to your environment variables.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            type: 'video',
            maxResults: 20,
            q: data
          }
        }
      );
      setPlaylistResponse(response.data.items);
      localStorage.setItem('savedPlaylist', JSON.stringify(response.data.items));
      setError(null);
    } catch (error) {
      console.error('Error fetching search results:', error);
      if (error.response?.status === 403) {
        setError('Please configure a valid YouTube API key in your environment variables (REACT_APP_YOUTUBE_API_KEY)');
      } else {
        setError('Failed to fetch search results. Please try again.');
      }
      setPlaylistResponse([]);
      localStorage.removeItem('savedPlaylist');
    } finally {
      setIsLoading(false);
    }
  };

  const submitSkillButton = async (skill) => {
    if (!process.env.REACT_APP_YOUTUBE_API_KEY) {
      setError('YouTube API key is not configured. Please add it to your environment variables.');
      return;
    }

    setSkills(skill);
    setError(null);
    setIsLoading(true);
    
    const playlistIds = {
      python: "PLEiEAq2VkUUJO27b6PyoSd7CJjWIPyHYO",
      reactjs: "PLSsAz5wf2lkKm0BG9wUWWSgYWBzDa-dFs", 
      reactnative: "PLRAV69dS1uWSjBBJ-egNNOd4mdblt1P4c",
      graphql: "PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f",
      javascript: "PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET",
      nodejs: "PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC",
      deno: "PL4cUxeGkcC9gnaJdxuGvEGYQ9iHb8mxsh",
      typescript: "PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI",
      docker: "PLhW3qG5bs-L99pQsZ74f-LC-tOEsBp2rK"
    };

    const playlistId = playlistIds[skill];
    if (!playlistId) {
      setError('Invalid skill selected');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems`, {
          params: {
            part: 'snippet',
            maxResults: 100,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            playlistId: playlistId
          }
        }
      );
      setPlaylistResponse(response.data.items);
      localStorage.setItem('savedPlaylist', JSON.stringify(response.data.items));
    } catch (error) {
      console.error('Error fetching playlist:', error);
      if (error.response?.status === 403) {
        setError('Please configure a valid YouTube API key in your environment variables (REACT_APP_YOUTUBE_API_KEY)');
      } else {
        setError('Failed to fetch playlist. Please try again.');
      }
      setPlaylistResponse([]);
      localStorage.removeItem('savedPlaylist');
    } finally {
      setIsLoading(false);
    }
  };

  const nextVideo = (video, title, description) => {
    const videoId = video.id?.videoId || video.snippet?.resourceId?.videoId;

    if (!videoId) {
      setError('Video ID not found');
      return;
    }

    setTitle(title);
    setDescription(description);
    setCurrentVideo(`https://www.youtube.com/watch?v=${videoId}`);
    setStartTime(0);
    setIsDescriptionVisible(true);
    localStorage.setItem('savedVideoId', videoId);
  };

  const handleProgress = (progress) => {
    if (progress.playedSeconds > 0) {
      localStorage.setItem('savedTime', progress.playedSeconds);
    }
  };

  return (
    <div className="p-10">
      <div className="fullscreen-bg"></div>
      
      <center>
        <h3 className="text-gray-600 text-lg">
          Welcome To Distraction-Free YouTube Learning Experience 👨‍💻
        </h3>
        <h1 className="text-4xl text-blue-600 my-4">What Do You Wanna Learn Today?</h1>
      </center>

      <center>
        <div className="flex flex-wrap justify-center space-x-4 my-6">
          {[
            { img: PythonImg, skill: 'python' },
            { img: ReactImg, skill: 'reactjs' },
            { img: ReactNativeImg, skill: 'reactnative' },
            { img: GraphQLImg, skill: 'graphql' },
            { img: JSImg, skill: 'javascript' },
            { img: NodeImg, skill: 'nodejs' },
            { img: DenoImg, skill: 'deno' },
            { img: TSImg, skill: 'typescript' },
            { img: DockerImg, skill: 'docker' }
          ].map((item, index) => (
            <img
              key={index}
              className={`cursor-pointer transition-transform transform hover:scale-110 ${isLoading ? 'opacity-50' : ''}`}
              style={{ width: '80px' }}
              src={item.img}
              alt={item.skill}
              onClick={() => !isLoading && submitSkillButton(item.skill)}
            />
          ))}
        </div>
        <h2 className="text-gray-700">OR</h2>
      </center>

      <br />

      <center>
        <div className="bg-white p-4 shadow-lg rounded-lg w-full md:w-1/2 flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between space-x-4">
            <input
              type="text"
              placeholder="Machine Learning..."
              value={data}
              onChange={getData}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && submitData()}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={!data || isLoading}
              onClick={submitData}
            >
              {isLoading ? 'Loading...' : 'Go!'}
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm w-full text-center">
              {error}
            </div>
          )}
        </div>
      </center>

      <div className="flex flex-col md:flex-row mt-6 space-x-0 md:space-x-6">
        <div className="w-full md:w-2/3 bg-white shadow-lg p-4 rounded-lg">
          <ReactPlayer
            ref={playerRef}
            url={currentVideo}
            controls
            width="100%"
            height="500px"
            playing={isPlaying}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onProgress={handleProgress}
            onStart={() => playerRef.current.seekTo(startTime)}
          />

          <h3 className="text-2xl mt-2 text-black">{title}</h3>
          <hr className="my-2" />

          <div className="flex justify-center space-x-4 my-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)}
            >
              -10s
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)}
            >
              +10s
            </button>
          </div>

          <div className="flex justify-center my-3">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
            >
              {isDescriptionVisible ? "Hide Description" : "Show Description"}
            </button>
          </div>

          {isDescriptionVisible && (
            <p className="text-black mt-2">
              {description.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          )}
        </div>

        <div className="w-full md:w-1/3 bg-white shadow-lg p-4 rounded-lg overflow-y-scroll h-[700px]">
          <h3 className="text-xl text-gray-700">Playlist</h3>
          <p className="text-center text-gray-500 mb-2">Total videos: {playlistResponse.length}</p>
          {isLoading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            playlistResponse.map((video, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => nextVideo(video, video.snippet.title, video.snippet.description)}
              >
                <img 
                  src={video.snippet.thumbnails.default.url} 
                  alt={video.snippet.title}
                  className="w-16 h-16 rounded-lg" 
                />
                <p className="text-gray-600">{video.snippet.title}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <h3 className="text-gray-600 text-lg">
        {skills}
      </h3>
    </div>
  );
};

export default Body;
