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
    this.setCameraPos(-32, 74, -77);
    this.setClearColor(0xddddff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    
    this.createNodes();
    const nodesGroup = new THREE.Group();
    this.spheres.forEach(sphere => nodesGroup.add(sphere.mesh.clone()));
    const { x, y, z } = new THREE.Box3().setFromObject(nodesGroup).getCenter(nodesGroup.position).multiplyScalar(0.5)

  }
  createNodes() {
    let x = 0;
    let y = 0;
    let z = 0;
    const gap = 15;
    this.audio.frequencyData.map((node, index) => {
      const sphere = new Sphere();
      
      if(index % 5 === 0) {
        x = 0;
        y += gap;
      }
      if(index % 25 === 0) {
        y = 0;
        z += gap;
      }
      x += gap;
      sphere.mesh.position.x += x;
      sphere.mesh.position.y += y;
      sphere.mesh.position.z += z;
      this.scene.add(sphere.mesh);
      this.spheres.push(sphere);
    }); // why doesnt map work (returns array of 0's)
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.audio.getByteFrequencyData();
    this.audio.frequencyData.forEach((frequency, index) => {
      this.spheres[index].update(frequency);
    })
   

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;