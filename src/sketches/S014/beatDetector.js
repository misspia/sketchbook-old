import { Events } from '../../constants';

/**
 * https://stackoverflow.com/a/29651911 
 * https://stackoverflow.com/questions/18718337/fft-with-offlineaudiocontext
 */

class FrequencyProcessor extends AudioWorklet {
  process() {
    
  }
}
export default class BeatDetector {
  constructor(context) {
    this.audio = {}
    this.context = context;
  }
  
  async onStart(src) {
    const { context } = this.context.audio;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = "arraybuffer";
    xhr.send();

    xhr.onload = () => {
      const bits = [xhr.response];
      const file = new File(bits, 'audio');

      const reader = new FileReader();
      reader.onload = () => {
        context.decodeAudioData(reader.result, (buffer) => this.prepare(buffer))
      }
      reader.readAsArrayBuffer(file)
    }
  }

  /**
   * https://stackoverflow.com/a/30112800 
   */
  prepare(buffer) {
    const offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    const filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    offlineContext.startRendering().then((renderedBuffer) => {
      this.process(renderedBuffer)
    })
  }

  process(renderedBuffer) {
    const data = renderedBuffer.getChannelData(0);
    const max = arrayMax(data);
    const min = arrayMin(data);

    const threshold = min + (max - min) * 0.98;
    const peaks = this.getPeaksAtThreshold(data, threshold);
    const intervalCounts = this.countIntervalsBetweenNearbyPeaks(peaks);
    const tempoCounts = this.groupNeighboursByTemp(intervalCounts);
    tempoCounts.sort((a, b) => b.count - a.count);

    this.context.dispatchEvent({
      type: Events.BEAT_DETECTION_COMPLETE,
      payload: tempoCounts
    })
  }

  getPeaksAtThreshold(data, threshold) {
    const peaks = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] > threshold) {
        peaks.push(i);

        // Skip forward ~1/4s to get past this peak
        i += 10000;
      }
    }
    return peaks;
  }

  countIntervalsBetweenNearbyPeaks(peaks) {
    const intervalCounts = [];
    peaks.forEach((peak, index) => {
      for (let i = 0; i < 10; i++) {
        const interval = peaks[index + i] - peak;
        const foundInterval = intervalCounts.some(interval => {
          if (interval.interval === interval) {
            return interval.count++;
          }
        });
        if (!isNaN(interval) && interval !== 0 && !foundInterval) {
          intervalCounts.push({ interval, count: 1 });
        }
      }
    })
    return intervalCounts;
  }

  groupNeighboursByTemp(intervals) {
    const tempoCounts = [];
    intervals.forEach((interval) => {
      // Convert an interval to tempo
      let theoreticalTempo = Math.round(60 / (interval.interval / 44100));
      if (theoreticalTempo === 0) {
        return;
      }

      // Adjust the tempo to fit within the 90 - 180 BPM range
      while (theoreticalTempo < 90) {
        theoreticalTempo *= 2;
      }
      while (theoreticalTempo > 180) {
        theoreticalTempo /= 2;
      }

      const foundTempo = tempoCounts.some((tempoCount) => {
        if (tempoCount.tempo === theoreticalTempo) {
          return tempoCount.count += interval.count;
        }
      });
      if (!foundTempo) {
        tempoCounts.push({
          tempo: theoreticalTempo,
          count: interval.count,
        });
      }
    });
    return tempoCounts;
  }
}

function arrayMin(arr) {
  var len = arr.length,
    min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
}

function arrayMax(arr) {
  var len = arr.length,
    max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
}
