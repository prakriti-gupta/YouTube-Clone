import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: 'reactjs',
      listOfVideos: [],
        listOfData:[],
      loadingStatus: null,
        height:200,
        widht:200
    };
  }
    
 
    
    
setSearchValue = (event) => {

this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)
}
searchVideo = async () => {
    this.setState({
    loadingStatus: "LOADING"
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyA8NDVEyQl1bquX4-Z211e2UjrCKLj1jLY`);
const myJson = await response.json();
console.log(myJson.items);
this.setState({
  listOfVideos: myJson.items,
listOfData:myJson.items.text   
})
console.log(this.state.listOfData)
  this.setState({
    loadingStatus: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingStatus: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=30&regionCode=IN&key=AIzaSyA8NDVEyQl1bquX4-Z211e2UjrCKLj1jLY`);
const myJson = await response.json();
console.log(myJson);
this.setState({
  listOfVideos: myJson.items,
    listOfData:myJson.items.data, 
  loadingStatus: "LOADED"
})

}


componentDidMount() {
  this.showMostPopularVideos()
}
  render() {
  
    let videos = this.state.listOfVideos.map(eachVideo => (
        

        <div className="showOuter" >

<iframe className="showInner"  src={`https://www.youtube.com/embed/${eachVideo.id.videoId}`}allowFullScreen>
</iframe>

<div className="headingDiv">
<img className="videoIcon" src={eachVideo.snippet.thumbnails.default.url} align="middle"/>
<h1 className="heading"> &nbsp; {eachVideo.snippet.title}</h1>
</div>
<br/>
<br/>

</div>


        ))

    return (
    
      <div>
    <div className="mySidenav">
  <a href="#" className="about">About</a>
  <a href="#" className="blog">Blog</a>
  <a href="#" className="projects">Projects</a>
  <a href="#" className="contact">Contact</a>
</div>
<div>
        <input className="searchBar" placeholder="Search here..." onChange={this.setSearchValue} />
        
        <button  id="btnSeach" onClick={this.searchVideo}>Search
          </button>
</div>
        <br/>
        <br/>
        <br/>
<div className="content">
        {this.state.loadingStatus == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
      </div>
</div>
    );
  }
}

export default App;