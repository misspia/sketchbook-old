import * as THREE from 'three';
import PostProcessor from '../postProcessor';
import SketchManagerThree from '../sketchManagerThree';
import { Audio } from '../../themes'

import BeatManager from './beatManager';
import EffectManager from "./effectManager"
import { CameraManager } from './cameraManager'

import { SkyBox } from './skyBox'
import { Text } from './text'
import { Lights } from './lights'
import { Dots } from './dots'
import { Lines } from './lines'
import { Comics } from './comics'

import { TestGraph } from '../testGraph'



/**
 * https://activetheory.net/home
 * https://2019.hki.paris/
 * https://threejs.org/examples/#webgl_mirror_nodes
 * https://brm.io/matter-js/docs/classes/Engine.html
 * 
 * Material transition
 * https://codepen.io/prisoner849/pen/MWWXoMx?editors=1010
 * https://stackoverflow.com/questions/45761324/animate-between-two-materials-on-a-mesh-three-js
 */

class Sketch extends SketchManagerThree {
  constructor(canvas, audioElement) {
    super(canvas, audioElement);
    this.audioSrc = Audio.tester;

    this.clock = new THREE.Clock();
    this.effectManager = new EffectManager(this);

    this.spectrumStart = {
      bass: 0,
      midrange: 24,
      highrange: 185,
    }
    this.numFrequencyNodes = 324;
    this.beatManager = new BeatManager(this)
    this.pp = new PostProcessor(this);
    this.fftSize = 512;

    this.cameraManager = new CameraManager(this)
    this.skyBox = new SkyBox(this)
    this.text = new Text(this)
    this.lights = new Lights(this)
    this.dots = new Dots(this)
    this.lines = new Lines(this)
    this.comics = new Comics(this)


    this.testGraph = new TestGraph({
      numNodes: this.numFrequencyNodes,
      midrange: this.spectrumStart.midrange,
      highrange: this.spectrumStart.highrange,
    })

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
  }

  unmount() {

  }

  customResize() {
    this.dots.onResize()
  }

  init() {
    // this.disableOrbitControls();

    this.setCameraPos(0, 3, 40);
    // this.setCameraPos(0, 0, 40);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x000000);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(1)

    this.scene.add(this.skyBox.group)
    this.scene.add(this.text.group)
    this.scene.add(this.dots.mesh)
    this.scene.add(this.comics.group)
    // this.scene.add(this.lines.mesh)

    this.scene.add(this.lights.directionalFrontLeft)
    this.scene.add(this.lights.directionalFrontRight)
    this.scene.add(this.lights.directionalTop)
    this.scene.add(this.lights.ambient)
    this.scene.add(this.lights.spot)

    this.skyBox.position.set(0, -5, 0)
    this.lights.spot.position.set(-15, 30, 30)
    this.lights.spotHelper.update()

    // this.effectManager.setOutlinedObjects([this.text.group])


    // this.scene.add(this.testGraph.group)
    this.testGraph.position.set(-10, 0, 5)
  }

  draw() {
    this.audio.getByteFrequencyData();
    this.beatManager.update();
    this.effectManager.update()
    this.cameraManager.update()

    this.dots.update()
    this.lines.update()
    this.comics.update()

    this.testGraph.update(
      this.audio.frequencyData,
      this.beatManager.bassAverages,
      this.beatManager.midrangeAverages,
      this.beatManager.highrangeAverages
    )

    this.effectManager.render();
    requestAnimationFrame(() => this.draw());
  }
}

export default Sketch;
