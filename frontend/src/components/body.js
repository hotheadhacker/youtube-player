import React, { useState } from 'react';
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

export default () => {
  const [data, setData] = useState('');
  const [searchBoxFlag, setSearchBoxFlag] = useState(false);
  const [skills, setSkills] = useState('Select a skill to load tutorial');
  const [playlistResponse, setPlaylistResponse] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [title, setTitle] = useState('Click on the video title from the playlist to begin');
  const [description, setDescription] = useState('Select a video');

  function getData(val) {
    setData(val.target.value);
  }

  function submitData() {
    if (data === '') {
      alert("Text box can't be empty!");
    } else {
      setSearchBoxFlag(true);
      axios
        .get('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBWLybXWaAdV7-7tlm9aClkSPiPAdm7boA&type=video&maxResults=20&q=' +data)
        .then((response) => {
          setPlaylistResponse(response.data.items);
        });
    }
  }

  function submitSkillButton(skill){
    setSkills(skill)
    setSearchBoxFlag(false)
    var playlistId = '';
    if(skill == 'python'){
        playlistId = "PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3"
    }
    if(skill == 'reactjs'){
        playlistId = "PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG"
    }
    if(skill == 'reactnative'){
        playlistId = "PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ"
    }
    if(skill == 'graphql'){
        playlistId = "PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f"
    }
    if(skill == 'javascript'){
        playlistId = "PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET"
    }
    if(skill == 'nodejs'){
        playlistId = "PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp"
    }
    if(skill == 'deno'){
        playlistId = "PL4cUxeGkcC9gnaJdxuGvEGYQ9iHb8mxsh"
    }
    if(skill == 'typescript'){
        playlistId = "PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI"
    }
    if(skill == 'docker'){
        playlistId = "PLhW3qG5bs-L99pQsZ74f-LC-tOEsBp2rK"
    }

    console.log("Python button clicked!");
    axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&key=AIzaSyBWLybXWaAdV7-7tlm9aClkSPiPAdm7boA&playlistId=' +playlistId)
        .then((response) => {
           
            setPlaylistResponse(response.data.items);
            
            console.log("inside skills image");

            
           
        });

}

function nextVideo(video, title, description) {
    let videoId = video.id?.videoId || video.snippet?.resourceId?.videoId;
  
    if (!videoId) {
      console.error("Video ID not found");
      return;
    }
  
    setTitle(title);
    setDescription(description);
    setCurrentVideo(`https://www.youtube.com/watch?v=${videoId}`);
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <center>
        <small className="text-gray-600">
          Welcome To Distraction-Free YouTube Learning Experience 👓
        </small>
        <h1 className="text-4xl text-blue-600 my-4">What Do You Wanna Learn Today?</h1>
      </center>

      {/* Skills Section */}
      <center>
        <div className="flex flex-wrap justify-center space-x-4 my-6">
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={PythonImg}
            onClick={() => submitSkillButton('python')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={ReactImg}
            onClick={() => submitSkillButton('reactjs')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={ReactNativeImg}
            onClick={() => submitSkillButton('reactnative')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={GraphQLImg}
            onClick={() => submitSkillButton('graphql')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={JSImg}
            onClick={() => submitSkillButton('javascript')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={NodeImg}
            onClick={() => submitSkillButton('nodejs')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={DenoImg}
            onClick={() => submitSkillButton('deno')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={TSImg}
            onClick={() => submitSkillButton('typescript')}
          />
          <img
            className="cursor-pointer transition-transform transform hover:scale-110"
            style={{ width: '80px' }}
            src={DockerImg}
            onClick={() => submitSkillButton('docker')}
          />
        </div>
        <h3 className="text-gray-700">OR</h3>
      </center>

      {/* Search Box */}
      <center>
        <div className="bg-white p-4 shadow-lg rounded-lg w-full md:w-1/2 flex items-center justify-between space-x-4">
          <input
            type="text"
            placeholder="Machine Learning..."
            value={data}
            onChange={getData}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                submitData();
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={!data}
            onClick={submitData}
          >
            Go!
          </button>
        </div>
      </center>
      

      {/* Video & Playlist Section */}
      <div className="flex flex-col md:flex-row mt-6 space-x-0 md:space-x-6">
        {/* Video Player */}
        <div className="w-full md:w-2/3 bg-white shadow-lg p-4 rounded-lg">
          <ReactPlayer url={currentVideo} controls width="100%" />
          <h3 className="text-2xl mt-4">{title}</h3>
          <hr className="my-2" />
          <p>
  {description.split('\n').map((line, index) => (
    <span key={index}>{line}<br/></span>
  ))}
</p>

        </div>

        {/* Playlist */}
        <div className="w-full md:w-1/3 bg-white shadow-lg p-4 rounded-lg overflow-y-scroll h-[700px]">
  <h3 className="text-xl text-gray-700">Playlist</h3>
  <p className="text-center text-gray-500 mb-2">Total videos: {playlistResponse.length}</p>
  {playlistResponse.map((video, idx) => (
  <div
    key={idx}
    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
    onClick={() => nextVideo(video, video.snippet.title, video.snippet.description)}
  >
    <img src={video.snippet.thumbnails.default.url} className="w-16 h-16 rounded-lg" />
    <p className="text-gray-600">{video.snippet.title}</p>
  </div>
))}

</div>


      </div>
    </div>
  );
};
