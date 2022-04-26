var VideoPlayer = (props) => (
  <div className="video-player">
    <div className="embed-responsive embed-responsive-16by9">
      <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${props.video.items ? props.video.items[0].id : ''}${props.autoPlay ? '?autoplay=1&mute=1' : ''}`} allowFullScreen></iframe>
    </div>
    <div className="video-player-details">
      <h3>{props.video.items ? props.video.items[0].snippet.title : ''}</h3>
      <div>Comments: {props.video.items ? props.video.items[0].statistics.commentCount : ''}</div>
      <div>Favorites: {props.video.items ? props.video.items[0].statistics.favoriteCount : ''}</div>
      <div>Likes: {props.video.items ? props.video.items[0].statistics.likeCount : ''}</div>
      <div>Views: {props.video.items ? props.video.items[0].statistics.viewCount : ''}</div>
      <div>Description: {props.video.items ? props.video.items[0].snippet.description : ''}</div>
    </div>
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoPlayer.propTypes = {
  video: PropTypes.object
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default VideoPlayer;
