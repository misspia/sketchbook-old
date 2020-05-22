import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';

import Environment from './environment';
import Shard from './shard';
import utils from '../utils';
import Debris from './debris';
import Floor from './floor';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;
    this.numFrequencyNodes = 25;
    this.fftSize = 512;
    this.spectrumHead = {
      bass: 0,
      midrange: 10,

    }

    this.directionalLight = {};
    const environment = new Environment(this.renderer);
    this.shard = new Shard(environment);

    this.bars = [];

    const size = 25;
    this.debris = new Debris({
      radius: size / 2,
      numNodes: 20,
    });
    this.floor = new Floor({
      size,
      divisions: 30,
    });

  }
  unmount() {}

  init() {
    this.createStats();
    // this.setCameraPos(0, 0, 110);
    // this.setCameraPos(8, 15, 5);
    this.setCameraPos(12, 8, 12);
    this.setClearColor(0xd5d5d5);
    this.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

    const audioConfig = { fftSize: this.fftSize };
    this.initAudio(audioConfig);
    this.audio.setSommothingTimeConstant(0.85);
    this.audio.volume(0.01);

    this.scene.add(this.debris.pivot);
    this.scene.add(this.floor.pivot);
    // this.scene.add(this.shard.pivot);
    // this.createBars();

  }

  createBars() {
    const geometry = new THREE.BoxGeometry(1, 80, 1);

    const xOffset = 110;
    const pad = 2;

    let color = 0xccbbff;

    for(let i = 0; i < 110; i++) {
      if(i > 13) {
        color = 0xffddee;
      }
      if(i > 75) {
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

    this.stats.end();

    this.debris.update();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
