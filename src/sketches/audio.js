export default class Audio {
  constructor({ audioElement, audioSrc, fftSize = 64, dataLength = 110 }) {
    this.fftSize = fftSize;

    this.audioElement = audioElement;
    this.configElement(audioSrc);

    this.context = new AudioContext();
    this.source = this.context.createMediaElementSource(this.audioElement);
    this.analyser = this.context.createAnalyser();

    this.source.connect(this.analyser);
    this.source.connect(this.context.destination);

    this.frequencyData = new Uint8Array(dataLength);

    this.play();
  }

  close() {
    if(this.context) {
      this.context.close();
    }
  }

  setSmoothingTimeConstant(val) {
    this.analyser.smoothingTimeConstant = val;
  }

  configElement(audioSrc) {
    const { audioElement } = this;
    audioElement.crossOrigin = 'anonymous';
    audioElement.type = 'audio/mp3';
    audioElement.src = audioSrc;
  }

  play() {
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }

  stop() {
    this.pause();
    this.audioElement.currentTime = 0;
  }

  volume(vol = 1) {
    this.audioElement.volume = vol
  }

  getByteFrequencyData() {
    this.analyser.getByteFrequencyData(this.frequencyData);
  }

  getAverageFrequency() {
    const sum = this.frequencyData.reduce((acc, node) => {
      acc += node;
      return acc;
    }, 0);
    return sum / (this.frequencyData.length - 1);
  }

  createGain() {
    return this.context.createGain();
  }

  createBiquadFilter() {
    return this.context.createBiquadFilter();
  }
}
