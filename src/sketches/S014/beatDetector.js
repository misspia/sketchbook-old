/**
 * https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/startRendering
 * https://stackoverflow.com/a/29651911 
 */

export default class BeatDetector {
  constructor(context) {
    this.audio = {}
    this.context = this.context;
  }

  onStart(src) {
    console.debug('[src]', src)
  }

  onProgress() {

  }

  onComplete() {

  }
}
