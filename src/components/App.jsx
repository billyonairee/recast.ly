class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClickEntryTitle = this.onClickEntryTitle.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      videoData: window.exampleVideoData,
      currentPlay: window.exampleVideoData[0],
      inputValue: null
    };
    // console.log(this.state.inputValue)
  }

  searchVideo() {
    // console.log(this.state.inputValue)
    // console.log('this',this.state.inputValue)
    const { inputValue } = this.state;
    var curInputValue = this.state.inputValue === null ? "세계 3쿠션" : inputValue;
    var dataObj = {
      query: curInputValue,
      max: "5",
      key: YOUTUBE_API_KEY,
      type: "video",
      part: "snippet"
    };
    // console.log("curInputValue", curInputValue);
    var changeState = videos => {
      this.setState({
        videoData: videos,
        currentPlay: videos[0]
      });
    };
    
    searchYouTube(dataObj, changeState);
  }
  
  componentDidMount() {
    this.searchVideo();
  }

  onClickEntryTitle(video) {
    this.setState({
      currentPlay: video
    });
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    })
    this.searchVideo()
  }
  
  render() {
    if (!this.state.videoData) {
      return <div>loding....</div>;
    }
    return (
      <div>
        <Nav
          inputValue={this.state.inputValue}
          searchVideo={this.searchVideo.bind(this)}
          updateInputValue={this.updateInputValue}
        />
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentPlay} />
        </div>
        <div className="col-md-5">
          <VideoList
            videos={this.state.videoData}
            onClickEntryTitle={this.onClickEntryTitle}
          />
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
