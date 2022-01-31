import * as THREE from 'three'
import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_lightningstrike.html

export default class Lightning {
  constructor() {
    this.strike = new LightningStrike({
      sourceOffset: new THREE.Vector3(),
      destOffset: new THREE.Vector3(),
      radius0: 0.5,
      radius1: 0.5,
      minRadius: 2.5,
      maxIterations: 7,
      isEternal: true,

      timeScale: 0.7,

      propagationTimeFactor: 0.05,
      vanishingTimeFactor: 0.95,
      subrayPeriod: 3.5,
      subrayDutyCycle: 0.6,
      maxSubrayRecursion: 3,
      ramification: 7,
      recursionProbability: 0.6,

      roughness: 0.85,
      straightness: 0.6
    })

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(this.strike, this.material)

    console.debug('[strike]', this.sourceOffset)
  }

  get sourceOffset() {
    return this.strike.rayParameters.sourceOffset
  }

  get destOffset() {
    return this.strike.rayParameters.destOffset
  }

  update(time) {
    this.sourceOffset.set(0, 20, 0)
    this.destOffset.set(0, -20, 0)
    this.strike.update(time)
  }
}
