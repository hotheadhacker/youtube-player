import React, {useState} from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'


export default () => {
    const [data, setData] = useState('');
    const [playlistResponse, setPlaylistResponse] = useState([]);
    const [currentVideo, setCurrentvideo] = useState('https://www.youtube.com/watch?v=QXeEoD0pB3E');

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
        console.log("correct");
        // setData(''); //clear state buffer for user
        // Send data to API
        // var newUrl = 

        // Set loading gif after click
        setSpace(false)
        // setBuffer(<img src={preloader} alt="Preloader" />)
        console.log("clicked");
        axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBWLybXWaAdV7-7tlm9aClkSPiPAdm7boA&type=video&maxResults=50&q=' +data)
            .then((response) => {
                console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
                // JSON.parse(PlaylistAPI(response.data);
                // setDomain(data)
                // setSpace(true)
                // domainURL = data;
                // var data2 = JSON.parse(response.data)
                // console.log(str);
                // for(var i in response.data){
                //     result.push([i, response.data [i]]);
                // }
                console.log(typeof(apiData));
                
                // console.log(result);
                // console.log(typeof(data2));
            });
    }
    

}

    // buttons
    function submitPythonButton(){
        console.log("Python button clicked!");
        axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3&key=AIzaSyBWLybXWaAdV7-7tlm9aClkSPiPAdm7boA')
            .then((response) => {
                console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
                // JSON.parse()
                setPlaylistResponse(response.data.items);
                // setDomain(data)
                // setSpace(true)
                // domainURL = data;
                // var data2 = JSON.parse(response.data)
                // console.log(str);
                // for(var i in response.data){
                //     result.push([i, response.data [i]]);
                // }
                console.log(typeof(playlistResponse));

                buildPlaylistDisplay()
                
                // console.log(result);
                // console.log(typeof(data2));
            });

    }

    // function for bulding playlist that can be displayed on thre right side of player 
    function buildPlaylistDisplay(){
        for (const property in playlistResponse) {
            // console.log(`${property}: ${playlistResponse[property]}`);
            // console.log(`img: ${playlistResponse[property].thumbnails.default.url}`);
          }
    }

    //next video of playlist

    function nextVideo(){
        setCurrentvideo('https://www.youtube.com/watch?v=hEgO047GxaQ')
    }


    return(
        <div className="bg-secondary">
            <center><h1 className="text-white">What Do You Wanna Learn Today?</h1></center>
            <center><div className="my-2">
                        <button className="btn-success"
                        // disabled = {btnState}
                        onClick={() => {submitPythonButton()}}
                        >Python!</button>
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
                
            {/* main player  */}
            <div className="mainPlayer row">
                <div className="bg-warning col-md-8 py-4 embed-responsive embed-responsive-4by3">
                {/* // Render a YouTube video player */}
                <center>
                    <ReactPlayer
                    className="align-self-baseline"
                    url={currentVideo}
                    controls
                    light
                    width="100%"
                    onEnded={() => {alert("video ended!")}}
                    />


                    <button onClick={() => {nextVideo()}}>Next Video</button>
                </center>
                </div>

                <div className="col-md-4 overflow-auto" style={{height: "500px"}}>
                    {playlistResponse.length}

                    {playlistResponse.map(function(d, idx){
                        return (<div className="playlistBox" key={idx}>
                                <div className="d-flex flex-row">
                                    <div className="p-2">
                                        <img src={d.snippet.thumbnails.default.url} className="media-object" />
                                    </div>
                                    <div className="p-2">
                                        <p className="display media-heading">{d.snippet.title}</p>
                                        {/* <p>{d.snippet.description}</p> */}
                                    </div>
                                </div>
                        </div>)
                    })}
                    
                </div>
            </div>


            



        </div>
    )
  };
  