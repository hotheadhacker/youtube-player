import React, {useState} from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'

import PythonImg from "./../imgs/python.png"
import ReactImg from "./../imgs/reactjs.jpg"
import ReactNativeImg from "./../imgs/reactnative.png"
import GraphQLImg from "./../imgs/graphql.png"
import JSImg from "./../imgs/javascript.png"
import NodeImg from "./../imgs/nodejs.png"
import DenoImg from "./../imgs/deno.svg"
import TSImg from "./../imgs/typescript.png"
import DockerImg from "./../imgs/docker.png"

export default () => {
    const [data, setData] = useState('');
    const [searchBoxFlag, setSearchBoxFlag] = useState(false);
    const [skills, setSkills] = useState("Select a skill to load tutorial");
    const [playlistResponse, setPlaylistResponse] = useState([]);
    const [currentVideo, setCurrentvideo] = useState('');
    const [title, setTitle] = useState('Click n the video title from the play list to begin with');
    const [description, setDescription] = useState('Select a video');


    const [print,setPrint]=useState(false)
    const [btnState,setBtnState]=useState(true)
    const [space,setSpace]=useState(false)
    const [apPlaylistAPI]=useState('loading...')
    const [buffer,setBuffer]=useState('Enter Domain Name To Get Details....')
    const [showDomain, setDomain] = useState('')

// Function For Saving text to state
function getData(val){
    // console.warn(val.target.value)
    setData(val.target.value)
    if(data !== ''){
        setBtnState(false)
    }
    if(data === ''){
        setBtnState(true)
    }
    setPrint(false)
}
// Send data to API server
function submitData(){
    
    if(data === ''){
        // setBtnState(true)
        alert("Text box can't be empty!")
    }
    else{
        setSearchBoxFlag(true)
        console.log("correct");
        // setData(''); //clear state buffer for user
        // Send data to API
        // var newUrl = 

        // Set loading gif after click
        setSpace(false)
        // setBuffer(<img src={preloader} alt="Preloader" />)
        console.log("clicked");
        axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBWLybXWaAdV7-7tlm9aClkSPiPAdm7boA&type=video&maxResults=20&q=' +data)
            .then((response) => {
                // console.log(response.data);
               
                setPlaylistResponse(response.data.items);
               
                
            });
    }
    

}

    // buttons
    
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


    //next video of playlist

    function nextVideo(nextVideo, title, description){
        setTitle(title)
        setDescription(description)
        setCurrentvideo("https://www.youtube.com/watch?v="+nextVideo)
        // console.log(description);
    }


    return(
        <div className="bg-secon">

            <center><small className="text-black">Welcome To Distraction Free Youtube Learning Experience 👓</small>
                <h1 className="text-danger">What Do You Wanna Learn Today?</h1></center>
            <center><div className="my-2">
                        <img
                            className="pointer skill-img mx-1"
                            style={{width: "80px"}}
                            src={PythonImg}
                            onClick={() => {submitSkillButton('python')}} />

                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={ReactImg}
                        onClick={() => {submitSkillButton('reactjs')}}
                        />
                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={ReactNativeImg}
                        onClick={() => {submitSkillButton('reactnative')}}
                        />
                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={GraphQLImg}
                        onClick={() => {submitSkillButton('graphql')}}
                        />
                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={JSImg}
                        onClick={() => {submitSkillButton('reactjs')}}
                        />
                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={NodeImg}
                        onClick={() => {submitSkillButton('nodejs')}}
                        />
                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={DenoImg}
                        onClick={() => {submitSkillButton('deno')}}
                        />
                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={TSImg}
                        onClick={() => {submitSkillButton('typescript')}}
                        />
                        <img
                        className="pointer skill-img mx-1"
                        style={{width: "80px"}}
                        src={DockerImg}
                        onClick={() => {submitSkillButton('docker')}}
                        />

                    </div>
                    <h3>OR</h3>
                    </center>

            <center>
                <div className="box" style={{textAign: "center"}} >
                    <div className="my-2">
                        <input type="text"
                        placeholder="Machine Learning..."
                        value = {data}        
                        onChange={getData}
                        required

                        />
                    </div>
                    <div className="my-2">
                        <button className="btn-danger"
                        disabled = {btnState}
                        onClick={() => {submitData()}}
                        >Go!</button>
                    </div>
                </div>
            </center>
                
            {/* main player  */}{
            searchBoxFlag ?

                    
                    <div className="mainPlayer row">
                        <h1 style={{textAlign: "center"}}>Search Results For: {data}</h1>
                <div className="col-md-8 py-4 embed-responsive embed-responsive-4by3" style={{backgroundColor: "#fcfcfc"}}>
                
                <center>
                    <ReactPlayer
                    className="align-self-baseline"
                    url={currentVideo}
                    controls
                    light
                    width="100%"
                    onEnded={() => {alert("video ended!")}}
                    />


                    {/* <button onClick={() => {nextVideo()}}>Next Video</button> */}
                    <h3>{title}</h3>
                    <hr />
                    <pre>{description}</pre>
                </center>
                </div>

                
                <div className="col-md-4 overflow-auto" style={{height: "500px"}}>
                    {playlistResponse.length}

                    {playlistResponse.map(function(d, idx){
                        return (<div className="playlistBox" key={idx}>
                                    {}
                                <div className="d-flex flex-row pointer" onClick={() => nextVideo(d.id.videoId, d.snippet.title, d.snippet.description)}>
                                    <div className="p-2">
                                        <img src={d.snippet.thumbnails.default.url} className="media-object" />
                                    </div>
                                    <div className="p-2">
                                        <p className="display media-heading">{idx+1}) {d.snippet.title}</p>
                                        
                                    </div>
                                </div>
                                <hr />

                        </div>)
                    })}
                    
                </div>
                
            </div>


                    :
            <div className="mainPlayer row">
                
                <div className="col-md-8 py-4 embed-responsive embed-responsive-4by3" style={{backgroundColor: "#fcfcfc"}}>
                {/* // Render a YouTube video player */}
                <h3 style={{textAlign: "center"}}>{skills}</h3>

                <center>
                    <ReactPlayer
                    className="align-self-baseline"
                    url={currentVideo}
                    controls
                    width="100%"
                    onEnded={() => {alert("Congratulations! You Have Completed This Module! Keep Learning and growing 👍")}}
                    />


                    {/* <button onClick={() => {nextVideo()}}>Next Video</button> */}
                    <h3>{title}</h3>
                    <hr />
                    <pre>{description}</pre>
                </center>
                </div>

                
                <div className="col-md-4 overflow-auto" style={{height: "500px"}}>
                    <p className="bg-danger" style={{textAlign: "center"}}>Total items: {playlistResponse.length}</p>

                    {playlistResponse.map(function(d, idx){
                        return (<div className="playlistBox" key={idx}>
                                    {}
                                <div className="d-flex flex-row pointer" onClick={() => nextVideo(d.snippet.resourceId.videoId, d.snippet.title, d.snippet.description)}>
                                    <div className="p-2">
                                        <img src={d.snippet.thumbnails.default.url} className="media-object" />
                                    </div>
                                    <div className="p-2">
                                        <p className="display media-heading">{idx+1}) {d.snippet.title}</p>
                                        {/* <p>{d.snippet.description}</p> */}
                                    </div>
                                </div>
                                <hr />

                        </div>)
                    })}
                    
                </div>
                
            </div>
            }


            



        </div>
    )
  };
  
