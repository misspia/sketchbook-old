import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes/themes' 

import * as PP from 'postprocessing';
import Ring from './ring';
import OuterRing from './outerRing';
import Shape from './shape';
import Bar from './bar';

/**
 * https://youtu.be/K7cnJPrOzy4?t=236
 * https://www.shutterstock.com/blog/who-or-what-is-hatsune-miku-the-making-of-a-virtual-pop-star
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
 * https://youtu.be/w6vzMDKSVvo?t=1528
 * https://www.pinterest.ca/pin/364017582376235649/
 * https://www.pinterest.ca/pin/603623156275608508/
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.raycaster = {};
    this.audioSrc = Audio.tester;

    this.composer = {};
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.numFrequencyNodes = 15;
    this.fftSize = 512;
    this.vertices = [];

    this.numRings = 10;
    this.lastRingRadius = 12;
    this.rings = [];
    this.outerRing = {};
    this.shapes = [];
    this.bars = [];
    this.beatOrb = {};

  }
  unmount() {
    this.audio.stop();
  }
  init() {
    this.createStats();

    // this.setCameraPos(40, 70, -50);
    this.setCameraPos(60, 90, -70);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x100011);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);

    this.createBeatOrb();
    
    this.createRings(0, this.numRings);
    this.createOuterRing();
    this.createBars();

    // this.createShapes();
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
  createBeatOrb() {
    const geometry = new THREE.IcosahedronGeometry(10, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff2222,
      wireframe: true,
    });
    this.beatOrb = new THREE.Mesh(geometry, material);
    const rotation = utils.toRadians(60);
    this.beatOrb.rotation.set(rotation, rotation, rotation);
    // this.scene.add(this.beatOrb);
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
    const radius = this.lastRingRadius * 1.1;
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
  createShapes() {
    this.audio.frequencyData.forEach(node => {
      const shape = new Shape({
        radius: 2,
        widthSegments: 5,
        heightSegments: 5,
        color: 0xffaa55,
        centerCoord: { x: 0, y: 0, z: 6 },
      });
      this.scene.add(shape.mesh);
      this.shapes.push(shape);
    })
  }
  draw() {
    this.stats.begin();

    this.composer.renderer.autoClear = true;

    this.audio.getByteFrequencyData();
    const averageFreq = this.audio.getAverageFrequency();
    this.rings.forEach((ring) => ring.update(averageFreq));
    this.outerRing.update(this.audio.frequencyData)
    this.bars.forEach((bar, index) => {
      const frequency = this.audio.frequencyData[index];
      bar.update(frequency);
    })

    // this.shapes.forEach((shape, index) => {
    //   const frequency = this.audio.frequencyData[index];
    //   shape.update(frequency);
    // })

    const scale = utils.remap(0, 255, 0.3, 1.1, averageFreq);
    this.beatOrb.scale.set(scale, scale, scale);

    this.composer.render(this.clock.getDelta());
    this.composer.renderer.autoClear = false;

    this.stats.end();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;