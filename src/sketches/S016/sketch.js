import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';

import CameraManager from './cameraManager';
import EffectManager from './effectManager';
import BeatManager from './beatManager';
import Debris from './debris';
import Floor from './floor';
import Lights from './lights';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.S016;
    this.numFrequencyNodes = 25;
    this.fftSize = 512;
    this.frequencyDataLength = 110;
    this.spectrumStart = {
      bass: 0,
      midrange: 13,
      highrange: 75,
    }
    this.lights = new Lights();
    this.cameraManager = new CameraManager(this);
    this.beatManager = new BeatManager(this);
    this.effectManager = new EffectManager(this);

    const size = 25;
    this.debris = new Debris(
      this,
      {
      radius: size / 2,
      numNodes: 20,
    });
    this.floor = new Floor(
      this,
      {
      size,
      divisions: 30,
    });

  }
  unmount() {
    this.audio.close();
    this.debris.dispose();
    this.floor.dispose();
    this.clearScene();
  }

  init() {
    this.setCameraPos(12, 8, 12);
    this.setClearColor(0xd5d5d5);
    this.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    const audioConfig = { fftSize: this.fftSize, dataLength: this.frequencyDataLength };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.85);
    this.audio.volume(0.2)

    this.scene.add(this.lights.directionalTop);
    this.scene.add(this.lights.directionalSide);
    this.scene.add(this.debris.pivot);
    this.scene.add(this.floor.pivot);
  }

  draw() {
    this.audio.getByteFrequencyData();
    this.beatManager.update();
    this.effectManager.update();
    this.cameraManager.update();
    this.floor.update();
    this.debris.update(this.audio.frequencyData);

    this.effectManager.render();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
