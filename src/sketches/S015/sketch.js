import * as THREE from 'three';
import SketchManagerThree from '../sketchManagerThree';
import utils from '../utils';
import { Audio } from '../../themes/themes';

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
    this.setCameraPos(110, 105, -110);
    this.lookAt(0, 0, 0);
    this.setClearColor(0xddddff);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    
    this.initNodes();

  }
  initNodes() {
    this.spheres = this.audio.frequencyData.map((node, index) => {
      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z += index;
      this.scene.add(mesh);
      return mesh;
    });
  }
  draw() {
    this.renderer.render(this.scene, this.camera);
    this.audio.getByteFrequencyData();
   

    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;