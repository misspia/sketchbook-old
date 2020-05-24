export default class BeatManager {
  constructor(context) {
    this.context = context;
    this.spectrumStart = context.spectrumStart;
    this.bassAverages = [];
    this.bassThreshold = 24;

    this.midrangeAverages = [];
    this.highrangeAverages = [];
  }

  update() {
    this.updateBassAverage();
    this.updateMidrangeAverage();
    this.updateHighrangeAverage();
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

  updateMidrangeAverage() {
    const { midrange, highrange } = this.spectrumStart;
    let avg = 0;
    for(let i = midrange; i < highrange; i++) {
      avg += this.context.audio.frequencyData[i];
    }
    avg /= (highrange - midrange);
    this.midrangeAverages.push(avg);
  }

  updateHighrangeAverage() {
    const { highrange } = this.spectrumStart;
    const total = this.context.frequencyDataLength - 1;
    let avg = 0;
    for(let i = highrange; i < total; i++) {
      avg += this.context.audio.frequencyData[i];
    }
    avg /= (total - highrange);
    this.highrangeAverages.push(avg);
  }
}
