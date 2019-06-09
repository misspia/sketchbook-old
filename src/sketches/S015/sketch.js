import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes/themes';
import Sphere from './sphere';

/**
 * https://twitter.com/motions_work/status/927346292283490305
 */
class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;
    this.fftSize = 512;
    this.numFrequencyNodes = 125;
    this.spheres = [];
    
  }
  unmount() {

  }
  init() {
    this.setCameraPos(0, 0, -110);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xddddff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    
    this.createNodes();

  }
  createNodes() {
    this.audio.frequencyData.map((node, index) => {
      const sphere = new Sphere();
      
      sphere.mesh.position.x += index - this.numFrequencyNodes / 2;
      this.scene.add(sphere.mesh);
      this.spheres.push(sphere);
    }); // why doesnt map work (returns array of 0's)
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach(frequency => {
      this.spheres[index].update(frequency);
    })
   

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;