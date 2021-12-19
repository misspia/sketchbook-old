import * as THREE from 'three';
import { Sky } from "three/examples/jsm/objects/Sky"

/**
 * https://threejs.org/examples/#webgl_shaders_sky
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_shaders_sky.html
 * https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/Sky.js
 */
export default class Background {
  constructor(context) {
    this.context = context
    this.mesh = new Sky()
    this.mesh.scale.setScalar(100)

    this.sun = new THREE.Vector3()

    this.uniforms['turbidity'].value = 0;
    this.uniforms['rayleigh'].value = 0.018;
    this.uniforms['mieCoefficient'].value = 0;
    this.uniforms['mieDirectionalG'].value = 0

    const elevation = 0
    const azimuth = 0
    const phi = THREE.MathUtils.degToRad(90 - elevation)
    const theta = THREE.MathUtils.degToRad(azimuth)
    this.sun.setFromSphericalCoords(1, phi, theta)
    this.uniforms[ 'sunPosition' ].value.copy( this.sun );

    // const exposure = 0.3
    // this.context.renderer.toneMappingExposure = exposure 
  }

  get uniforms() {
    return this.mesh.material.uniforms
  }

  dispose() {

  }
}
