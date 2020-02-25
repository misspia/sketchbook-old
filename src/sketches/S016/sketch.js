import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes';
import Toon from './toon';
import createToonShader from './toonShader';

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;
    this.fftSize = 512;
    this.toon = new Toon();


    this.toonShader = null;
  }
  unmount() {

  }
  customResize() {
    if (!this.toonShader) {
      return;
    }
    const resolution = this.getResolution();
    this.toonShader.uniforms.iResolution.value.set(resolution);
  }
  getResolution() {
    return new THREE.Vector2(
      this.canvas.width,
      this.canvas.height,
    );
  }
  init() {
    this.createStats();

    this.setCameraPos(-10, 23, 5);
    this.setClearColor(0xffffaa);
    this.lookAt(0, 0, 0);

    // const audioConfig = { fftSize: this.fftSize, dataLength: 25 };
    // this.initAudio(audioConfig);

    this.createEffects();
    this.scene.add(this.toon.mesh);
  }

  createEffects() {
    const resolution = this.getResolution();
    this.toonShader = createToonShader(resolution);
    const toonPass = new ShaderPass(this.toonShader);
    toonPass.renderToScreen = true;

    this.pp.addPass(toonPass);
  }


  draw() {
    this.stats.begin();

    // this.audio.getByteFrequencyData();
    // this.audio.frequencyData.forEach((freq, index) => {
    // });
    // this.renderer.render(this.scene, this.camera);
    this.pp.render();
    this.stats.end();

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
