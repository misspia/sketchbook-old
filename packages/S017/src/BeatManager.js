export class BeatManager {
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
    const totalFrequencies = context.numFrequencyNodes - 1;
    this.bassWeight = (this.spectrumStart.midrange - this.spectrumStart.bass) / totalFrequencies;
    this.midrangeWeight = (this.spectrumStart.highrange - this.spectrumStart.midrange) / totalFrequencies;
    this.highrangeWeight = (totalFrequencies - this.spectrumStart.highrange) / totalFrequencies;

    this.bassAverages = [];
    this.midrangeAverages = [];
    this.highrangeAverages = [];
    this.overallAverages = [];

    this.maxBassFreq = 0
    this.maxMidrangeFreq = 0
    this.maxHighrangeFreq = 0
    this.maxOverallFreq = 0
  }

  get latestBassAverage() {
    return this.bassAverages[this.bassAverages.length - 1]
  }

  get latestMidrangeAverage() {
    return this.midrangeAverages[this.midrangeAverages.length - 1]
  }

  get latestHighrangeAverage() {
    return this.highrangeAverages[this.highrangeAverages.length - 1]
  }

  get latestOverallAverage() {
    return this.overallAverages[this.overallAverages.length - 1]
  }

  update() {
    this.updateBassAverage();
    this.updateMidrangeAverage();
    this.updateHighrangeAverage();
    this.updateOverallAverage();

    // console.debug(this.latestHighrangeAverage)
  }

  updateBassAverage() {
    const { bass, midrange } = this.spectrumStart;
    const { frequencyData } = this.context.audio
    
    let max = frequencyData[bass] 
    let avg = 0;
    for(let i = bass; i < midrange; i++) {
      const freq = frequencyData[i] 
      avg += freq;
      max = Math.max(max, freq)
    }
    avg /= (midrange - bass);

    this.bassAverages.push(avg);
    this.maxBassFreq = max
  }

  updateMidrangeAverage() {
    const { midrange, highrange } = this.spectrumStart;
    const { frequencyData } = this.context.audio

    let max = frequencyData[midrange]  
    let avg = 0;
    for(let i = midrange; i < highrange; i++) {
      const freq = frequencyData[i] 
      avg += freq;
      max = Math.max(max, freq)
    }
    avg /= (highrange - midrange);
    this.midrangeAverages.push(avg);
    this.maxMidrangeFreq = max
  }

  updateHighrangeAverage() {
    const { highrange } = this.spectrumStart;
    const { frequencyData } = this.context.audio

    let max = frequencyData[highrange]  
    const total = this.context.numFrequencyNodes - 1;
    let avg = 0;
    for(let i = highrange; i < total; i++) {
      const freq = frequencyData[i] 
      avg += freq;
      max = Math.max(max, freq)
    }
    avg /= (total - highrange);
    this.highrangeAverages.push(avg);
    this.maxHighrangeFreq = max
  }

  updateOverallAverage() {
    this.overallAverages.push(
      this.bassAverages[this.bassAverages.length - 1] * this.bassWeight +
      this.midrangeAverages[this.midrangeAverages.length - 1] * this.midrangeWeight +
      this.highrangeAverages[this.highrangeAverages.length - 1] * this.highrangeWeight
    );
    this.maxOverallFreq = Math.max(
      this.maxBassFreq,
      this.maxMidrangeFreq,
      this.maxHighrangeFreq
    )
  }
}
