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
  createGain() {
    return this.context.createGain();
  }
  createBiquadFilter() {
    return this.context.createBiquadFilter();
  }
}