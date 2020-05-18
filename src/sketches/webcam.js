export default class Webcam {
  constructor(videoElement, customConfigs) {
    this.video = videoElement;
    const configs = {
      video: true,
      audio: false,
      ...customConfigs,
    };

    navigator.mediaDevices.getUserMedia(configs)
      .then(this.onGetMediaSuccess)
      .catch(this.onGetMediaError)
  }

  onGetMediaSuccess = (stream) => {
    // window.steam = stream;
    this.video.srcObject = stream;
  }

  onGetMediaError = (error) => {
    console.debug(`unable to get user media [${error.name}]: ${error.message} `);
  }
}
