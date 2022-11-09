import * as THREE from 'three';
import Audio from 'toolkit/audio';

import { SketchManager } from './SketchManager';
import { PostProcessor } from './PostProcessor';
import { BeatManager } from './BeatManager';
import { EffectManager } from './EffectManager'
import { Layers } from './constants'

import { Smoke } from './Smoke'
import { Spirits } from './Spirits'
import { SpiritsAlt } from './SpiritsAlt'
import { VolumetricSpotlight } from './VolumetricSpotlight';

export class Sketch extends SketchManager {
  constructor(canvas, audioElement) {
    super(canvas, audioElement, { cameraNear: 1, cameraFar: 3500 });
    this.audioSrc = Audio.S014.url;
    
    this.clock = new THREE.Clock();
    this.effectManager = new EffectManager(this);

    this.spectrumStart = {
      bass: 0,
      midrange: 28,
      highrange: 185,
    }
    this.numFrequencyNodes = 300;
    this.beatManager = new BeatManager(this)

    this.pp = new PostProcessor(this);

    this.fftSize = 512;
    this.smoke = new Smoke(this)
    this.spirits = new Spirits(this)
    this.spot = new VolumetricSpotlight(this)
    this.spiritsAlt = new SpiritsAlt(this)
  }

  unmount() {
    this.audio.close();
    this.clearScene();
  }

  init() {
    this.disableOrbitControls();

    this.setCameraPos(0, 25, -65);
    this.lookAt(0, 0, 0);
    this.setClearColor(0x000000);

    const audioConfig = {
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    };
    this.initAudio(audioConfig);
    this.audio.setSmoothingTimeConstant(0.75);
    this.audio.volume(1)

    this.scene.add(this.smoke.mesh)
    this.scene.add(this.spirits.mesh)
    this.scene.add(this.spiritsAlt.mesh)
    this.scene.add(this.spot.mesh)

    this.render.toneMappingExposure = 0.15
    
    this.smoke.position.set(0, -22, 0)
    this.spirits.position.set(0, -22, 0)
    this.spiritsAlt.position.set(0, -22, 0)
    this.spot.position.set(-20, 50, 0)
    this.spot.lookAt(-2, 0, 0)
    
    this.spirits.mesh.layers.set(Layers.AFTERIMAGE)
    this.spiritsAlt.mesh.layers.set(Layers.AFTERIMAGE)
  }

  customResize(width, height) { 
    this.smoke.onResize()
    this.spirits.onResize()
    this.spiritsAlt.onResize()
    this.effectManager.onResize(width, height)
  }
  
  draw() {
    this.audio.getByteFrequencyData();
    this.beatManager.update();
    this.effectManager.update()

    const time = this.clock.getElapsedTime() || 0;

    this.smoke.update(time)
    this.spirits.update(time)
    this.spot.update(time)
    this.spiritsAlt.update(time)

    this.effectManager.render();
    requestAnimationFrame(() => this.draw());
  }
}
