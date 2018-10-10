var searchYouTube = (options, callback) => {

  $.ajax({
    url: "https://www.googleapis.com/youtube/v3/search",
    contentType: "application/json",
    type: "GET",
    data: {
      part: "snippet",
      key: options.key,
      q: options.query,
      maxResults: options.max,
      type: "video"
    },
    success: function(data) {
      // console.log('successdata:',data)
      callback(data.items)
    },
    error: function(data) {
      // console.log(data);
    }
  });
};

window.searchYouTube = searchYouTube;
