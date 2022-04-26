
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: exampleVideoData,
      nowPlaying: exampleVideoData[0],
      query: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick(video) {
    this.setState({nowPlaying: video});
  }
  handleSubmit(event) {
    event.preventDefault();
    searchYouTube(this.state.query, this.searchCallback);
  }
  searchCallback(data) {
    this.setState({videoList: data, nowPlaying: data[0]});
  }
  handleChange(event) {
    this.setState({query: event.target.value});
    searchYouTube(this.state.query, this.searchCallback);
  }
  componentDidMount() {
    // this.setState({videoList: exampleVideoData, nowPlaying: exampleVideoData[0]});
    searchYouTube('cats', this.searchCallback);
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
          <div className="col-md-7" id="videoPlayer">
            <VideoPlayer video={this.state.nowPlaying} />
          </div>
          <div className="col-md-5">
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
