export default class Audio {
  constructor({ audioSrc, fftSize = 64, dataLength = 110 }) {
    this.fftSize = fftSize;

    this.audioElement = this.createAudioElement(audioSrc);
    this.context = new AudioContext();
    this.source = this.context.createMediaElementSource(this.audioElement);
    this.analyser = this.context.createAnalyser();

    this.source.connect(this.analyser);
    this.source.connect(this.context.destination);

    this.frequencyData = new Uint8Array(dataLength);

    this.play();
  }
  createAudioElement(audioSrc) {
    const elem = document.createElement('audio');
    elem.src = audioSrc;
    elem.loop = true;
    elem.type = 'audio/mp3';
    return elem;
  }
  play() {
    this.audioElement.play();
  }
  pause() {
    this.audioElement.pause();
  }
  volume(vol = 1) {
    this.audioElement.volume = vol
  }
  getByteFrequencyData() {
    this.analyser.getByteFrequencyData(this.frequencyData);
  }
}