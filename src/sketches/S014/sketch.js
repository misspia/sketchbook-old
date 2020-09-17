import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import PostProcessor from '../postProcessor';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes';

import Lights from './lights';
import Skybox from './skybox';
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
    this.pp = new PostProcessor(this);
    this.renderPass = {};
    this.clock = new THREE.Clock();

    this.numFrequencyNodes = 15;
    this.fftSize = 512;
    this.vertices = [];

    this.skybox = new Skybox({
      size: 1000,
    });

    this.lights = new Lights();
    this.numRings = 15;
    this.lastRingRadius = 12;
    this.rings = [];
    this.outerRing = {};
    this.bars = [];
  }

  unmount() {
    this.audio.close();
    this.skybox.dispose();
    this.rings.forEach(ring => ring.dispose());
    this.outerRing.dispose();
    this.bars.forEach(bar => bar.dispose());
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.soft = true;

    this.setCameraPos(110, 105, -110);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xffffff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.volume(1);

    this.createRings(0, this.numRings);
    this.createOuterRing();
    this.createBars();

    this.scene.add(this.skybox.pivot);
    this.scene.add(this.lights.spot);
    this.scene.add(this.lights.ambient);

    this.createEffects();
  }

  createEffects() {
    const fxaa = new ShaderPass(FXAAShader);
    fxaa.uniforms.resolution.value.set(
      1 / this.canvas.width,
      1 / this.canvas.height,
    );
    fxaa.renderToScreen = false;

    const dimensions = new THREE.Vector2(
      this.canvas.width,
      this.canvas.height,
    );

    const bloom = new UnrealBloomPass(dimensions, 0.15, 0.2, 0.05);
    bloom.renderToScreen = true;

    this.pp.addPass(fxaa);
    this.pp.addPass(bloom);
  }

  createRings(z, length) {
    const color = 0x00bbff;
    const tube = 0.7;
    for (let i = 0; i < length; i++) {
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
    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((frequency, index) => {
      this.rings[index].update(frequency);
      this.bars[index].update(frequency);
    })

    const uTime = this.getUTime();
    this.outerRing.update(this.audio.frequencyData, uTime)

    this.renderer.autoClear = false;
    this.renderer.clear();

    this.pp.render();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
