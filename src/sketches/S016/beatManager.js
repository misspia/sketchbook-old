export default class BeatManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.bassAverages = [];
    this.bassThreshold = 24;
    this.isBassTriggered = false;
  }

  update() {
    this.updateBassAverage();
  }

  updateBassAverage() {
    const { bass, midrange } = this.spectrumStart;

    let avg = 0;
    for(let i = bass; i < midrange; i++) {
      avg += this.context.audio.frequencyData[i];
    }
    avg /= (midrange - bass);

    this.bassAverages.push(avg);
  }
}
