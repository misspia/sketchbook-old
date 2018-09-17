import * as THREE from 'three';

export default class Audio {
  constructor({ camera, audioFile, fftSize = 64 }) {
    this.file = audioFile;
    this.camera = camera;
    this.fftSize = fftSize;

    this.listener = {};
    this.sound = {};
    this.analyser = {};
    this.data = [];

    this.init();
  }
  init() {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);

    this.sound = new THREE.Audio(this.listener);
    this.loadFile();
    this.initAnalyser();
  }
  loadFile() {
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.file, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.volume = 1;
      this.play();
    })
  }
  initAnalyser() {
    this.analyser = new THREE.AudioAnalyser(this.sound, this.fftSize);
    this.getFrequencyData
  }
  play() {
    this.sound.play();
  }
  pause() {
    this.sound.pause();
  }
  getFrequencyData() {
    this.data = this.analyser.getFrequencyData();
    return this.data;
  }
  get context() {
    return this.sound.context;
  }
  get gainNode() {
    return this.sound.gain;
  }
  set volume(vol) {
    this.sound.setVolume(vol);
  }
};
