
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import exampleVideoData from '../data/exampleVideoData.js';
import {searchYouTube, detailsYouTube} from '../lib/searchYouTube.js';
import {errorVideoData, errorNowPlaying} from '../data/errorData.js';

var autoPlay = false;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      videoList: [],
      nowPlaying: {},
      query: 'Rick Astley',
      debounceTimer: undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.detailsCallback = this.detailsCallback.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  handleClick(video) {
    console.log(video.id.videoId);
    let videoDetails = detailsYouTube(video.id.videoId, this.detailsCallback);
  }
  handleSubmit(event) {
    event.preventDefault();
    searchYouTube(this.state.query, this.searchCallback);
  }
  searchCallback(data) {
    console.log('the data', data);
    if (data.error) {
      this.setState({nowPlaying: errorNowPlaying, videoList: errorVideoData});
    } else {
      this.setState({data: data, videoList: data.items});
      detailsYouTube(data.items[0].id.videoId, this.detailsCallback);

    }
  }
  detailsCallback(data) {
    this.setState({nowPlaying: data});
  }
  handleChange(event) {
    this.setState({query: event.target.value});
    clearTimeout(this.state.debounceTimer);
    this.setState({debounceTimer: setTimeout(searchYouTube.bind(this, event.target.value, this.searchCallback), 500)});

  }
  componentDidMount() {
    searchYouTube('Rick Astley', this.searchCallback);
  }
  handleToggle(event) {
    autoPlay = !autoPlay;
  }
  handlePrevious(event) {
    if (this.state.data.prevPageToken) {
      searchYouTube(this.state.query, this.searchCallback, this.state.data.prevPageToken);
    }
  }
  handleNext(event) {
    if (this.state.data.nextPageToken) {
      searchYouTube(this.state.query, this.searchCallback, this.state.data.nextPageToken);

    }
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.nowPlaying} autoPlay={autoPlay}/>
          </div>
          <div className="col-md-5">
            <span style={{paddingRight: '0.5rem' }} >AutoPlay</span>
            <label className="switch">
              <input type="checkbox" onClick={this.handleToggle}></input>
              <span className="slider"></span>
            </label>
            <span onClick={this.handlePrevious}>Previous Page</span>
            <span onClick={this.handleNext}>Next Page</span>
            <VideoList videos={this.state.videoList} handleClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
