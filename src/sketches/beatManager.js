export default class BeatManager {
  constructor(context) {
    this.context = context;
    /**
     * {
     *  bass: number
     *  midrange: number
     *  highrange: number
     * }
     */
    this.spectrumStart = context.spectrumStart;

    const totalFrequencies = context.frequencyDataLength - 1;
    this.bassWeight = (this.spectrumStart.midrange - this.spectrumStart.bass) / totalFrequencies;
    this.midrangeWeight = (this.spectrumStart.highrange - this.spectrumStart.midrange) / totalFrequencies;
    this.highrangeWeight = (totalFrequencies - this.spectrumStart.highrange) / totalFrequencies;

    this.bassAverages = [];

    this.midrangeAverages = [];
    this.highrangeAverages = [];

    this.overallAverages = [];
  }

  update() {
    this.updateBassAverage();
    this.updateMidrangeAverage();
    this.updateHighrangeAverage();
    this.updateOverallAverage();
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

  updateOverallAverage() {
    this.overallAverages.push(
      this.bassAverages[this.bassAverages.length - 1] * this.bassWeight +
      this.midrangeAverages[this.midrangeAverages.length - 1] * this.midrangeWeight +
      this.highrangeAverages[this.highrangeAverages.length - 1] * this.highrangeWeight
    );
  }
}
