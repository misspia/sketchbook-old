import * as THREE from 'three'
import fragmentShader from './shaders/spotlight.frag'
import vertexShader from './shaders/spotlight.vert'

// http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
// https://github.com/jeromeetienne/threex.volumetricspotlight/blob/master/examples/basic.html
// https://github.com/jeromeetienne/threex.volumetricspotlight/blob/master/threex.volumetricspotlightmaterial.js
export class VolumetricSpotlight {
  constructor(context) {
    this.context = context;
    this.geometry = new THREE.CylinderGeometry(8, 30, 80, 80, 80, true)
    this.geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, -this.geometry.parameters.height/2, 0 ) );
    this.geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );

    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,    
      transparent: true,
      depthWrite: false,  
      uniforms: {
        attenuation: {
          value: 70.0,
        },
        anglePower: {
          value: 15
        },
        spotPosition: {
          value: new THREE.Vector3(0, 0, 0)
        },
        freq: {
          value: 0.0
        },
      }
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.uniforms.spotPosition.value = this.mesh.position
  }

  get uniforms() {
    return this.material.uniforms
  }

  get position() {
    return this.mesh.position
  }

  lookAt(vector, y, z) {
    this.mesh.lookAt(vector, y, z)
  }
  
  update() {
    // this.uniforms.freq.value = this.context.beatManager.latestBassAverage
    this.uniforms.freq.value = this.context.beatManager.latestMidrangeAverage
  }
}
