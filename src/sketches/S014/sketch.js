import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes/themes' 

import * as PP from 'postprocessing';
import Ring from './ring';
import OuterRing from './outerRing';
import Bar from './bar';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.raycaster = {};
    this.audioSrc = Audio.tester;
    // this.audioSrc = Audio.S014;

    this.composer = {};
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.numFrequencyNodes = 15;
    this.fftSize = 512;
    this.vertices = [];

    this.numRings = 15;
    this.lastRingRadius = 12;
    this.rings = [];
    this.outerRing = {};
    this.bars = [];

  }
  unmount() {
    this.audio.stop();
  }
  init() {
    this.setCameraPos(85, 115, -95);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x100011);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);

    this.createRings(0, this.numRings);
    this.createOuterRing();
    this.createBars();

    this.createEffects();
  }
  createEffects() {
    this.composer = new PP.EffectComposer(this.renderer);
    this.renderPass = new PP.RenderPass(this.scene, this.camera, 0x111111);
    
    const bloomPass = new PP.EffectPass(this.camera, new PP.BloomEffect());
    bloomPass.renderToScreen = true;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(bloomPass);
  }
  createRings(z, length) {
    const color = 0x00bbff;
    const tube = 0.7;
    for(let i = 0; i < length; i ++) {
      const arc = utils.randomFloatBetween(Math.PI * 0.3, Math.PI * 0.8);
      const rotateZ = utils.toRadians(utils.randomFloatBetween(0, 360));
      const radius = this.lastRingRadius;
      const ring = new Ring({ color, tube, arc, radius });
      ring.rotateZ(rotateZ);
      ring.setPosition(0, 0, z);
      this.scene.add(ring.mesh);
      this.rings.push(ring);

      const radiusIncrement = utils.randomFloatBetween(3, 8);
      this.lastRingRadius += radiusIncrement;
    }
  }
  createOuterRing() {
    const radius = this.lastRingRadius + 1.0;
    const config = {
      radius,
      numDivisions: this.numRings,
    };
    this.outerRing = new OuterRing(config);
    this.scene.add(this.outerRing.group);
  }
  createBars() {
    const circleCoord = { x: 0, y: 0, z: 0 };
    const radius = 10;
    let angle = 0;
    const angleIncrement = Math.PI * 2 / (this.numFrequencyNodes - 1)
    this.audio.frequencyData.forEach(node => {
      const { x, y, z } = this.getCircleCoord(circleCoord, radius, angle);
      const bar = new Bar();
      bar.setPosition(x, y, z);
      this.scene.add(bar.mesh);
      this.bars.push(bar);
      angle += angleIncrement;
    })
  }
  getCircleCoord(circleCoord, radius, angle) {
    return {
      x: circleCoord.x + radius * Math.cos(angle),
      y: circleCoord.y,
      z: circleCoord.z + radius * Math.sin(angle)
    }
  }
  draw() {
    this.composer.renderer.autoClear = true;

    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((frequency, index) => {
      this.rings[index].update(frequency);
      this.bars[index].update(frequency);
    })
    
    const uTime = this.getUTime();    
    this.outerRing.update(this.audio.frequencyData, uTime)

    this.composer.render(this.clock.getDelta());
    this.composer.renderer.autoClear = false;

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;