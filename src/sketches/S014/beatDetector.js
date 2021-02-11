/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/startRendering
 * https://stackoverflow.com/a/29651911 
 */

export default class BeatDetector {
  constructor(context) {
    this.audio = {}
    this.context = context;
  }

  onStart(src, context) {
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
    console.debug(buffer);
    const offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    const filter = offlineContext.createBiquadFilter();
    filter.type = "lowpass";
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    offlineContext.start();
    offlineContext.onComplete = (e) => this.process(e)
  }
  
  process(e) {
    const filteredBuffer = e.renderedBuffer
    console.debug('[rendering complete]', filteredBuffer);
    const data = filteredBuffer.getChannelData(0);
    const max = arrayMax(data);
    const min = arrayMin(data);

    const threshold = min + (max - min) *  0.98;
    const peaks = this.getPeaksAtThreshold(data, threshold);
    const intervalCounts = this.countIntervalsBetweenNearbyPeaks(peaks);
    const tempoCounts = this.groupNeighboursByTemp(intervalCounts);
    tempoCounts.sort((a, b) => b.count - a.count);
    if(tempoCounts.length) {
      console.debug('[tempo counts]', tempoCounts)
    }
  }

  getPeaksAtThreshold(data, threshold) {

  }

  countIntervalsBetweenNearbyPeaks(peaks) {

  }

  groupNeighboursByTemp(intervalCounts) {

  }
  
  onProgress() {

  }

  onComplete() {

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
