import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import utils from '../utils';

import Environment from './environment';
import Shard from './shard';
import CameraManager from './cameraManager';
import EffectManager from './effectManager';
import BeatManager from './beatManager';
import Debris from './debris';
import Floor from './floor';
import Lights from './lights';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;
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

    const environment = new Environment(this.renderer);
    this.shard = new Shard(environment);

    this.bars = [];

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
  unmount() {}

  init() {
    this.createStats();
    this.setCameraPos(12, 8, 12);
    this.setClearColor(0xd5d5d5);
    this.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    const audioConfig = { fftSize: this.fftSize, dataLength: this.frequencyDataLength };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.85);
    // this.audio.setSmoothingTimeConstant(0.7);
    // this.audio.volume(0.01);
    this.audio.volume(0.9);

    this.scene.add(this.lights.directionalTop);
    this.scene.add(this.lights.directionalSide);
    this.scene.add(this.debris.pivot);
    this.scene.add(this.floor.pivot);

    // this.scene.add(this.shard.pivot);
    // this.createBars();
  }

  createBars() {
    this.setCameraPos(0, 0, 110);

    const geometry = new THREE.BoxGeometry(1, 80, 1);

    const xOffset = 110;
    const pad = 2;

    let color = 0xccbbff;

    for(let i = 0; i < 110; i++) {
      if(i > this.spectrumStart.midrange) {
        color = 0xffddee;
      }
      if(i > this.spectrumStart.highrange) {
        color = 0xccffbb;
      }
      const material = new THREE.MeshBasicMaterial({
        color,
      });

      const bar = new THREE.Mesh(geometry, material);
      bar.position.x += -xOffset + i * pad;
      this.scene.add(bar);
      this.bars.push(bar);
    }
  }

  updateBars() {
    this.audio.frequencyData.forEach((freq, index) => {
      this.bars[index].scale.y = this.remapFreq(freq);
    })
  }

  remapFreq(freq) {
    return utils.remap(0, 255, 0.001, 1, freq);
  }

  draw() {
    this.stats.begin();

    this.audio.getByteFrequencyData();
    this.beatManager.update();
    this.effectManager.update();
    this.cameraManager.update();
    this.floor.update();
    this.debris.update(this.audio.frequencyData);

    this.effectManager.render();

    this.stats.end();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
