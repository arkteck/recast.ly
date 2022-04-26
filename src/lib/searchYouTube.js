import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var searchYouTube = (query, callback, pageToken = '') => {
  // TODO
  // $.ajax({
  //   url: 'https://app-hrsei-api.herokuapp.com/api/recastly/videos',
  //   type: 'GET',
  //   data: {q: query, youtube_api_key: YOUTUBE_API_KEY, part: 'statistics', maxResults: 25},
  //   contentType: 'application/json',
  //   success: callback,
  //   error: function(error) {
  //     console.error('YouTube: Failed to fetch videos', error);
  //   }
  // });
  var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video${pageToken ? `&pageToken=${pageToken}` : ''}${query ? `&q=${query}` : ''}&key=${YOUTUBE_API_KEY}`;
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      callback(data);
    }).catch((error) => {
      console.error('Error:', error);
    });
};

var detailsYouTube = (videoId = '', callback) => {
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/videos?part=statistics%2C+snippet%2C+contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`,
    type: 'GET',
    data: {},
    contentType: 'application/json',
    success: callback,
    error: function(error) {
      console.error('YouTube: Failed to fetch videos', error);
    }
  });
};

export var searchYouTube, detailsYouTube;


// url: 'https://app-hrsei-api.herokuapp.com/api/recastly/videos',

// url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${query}&key=${YOUTUBE_API_KEY}`,