import * as THREE from 'three'
import utils from '../utils'

export default class Stairstep {
  constructor(width, height, depth, frequencyIndicies) {
    this.frequencyIndicies = frequencyIndicies
    this.colorModifier = new THREE.Color(0x000000)
    this.geometry = new THREE.BoxGeometry(width, height, depth)
    this.material = new THREE.MeshStandardMaterial({
      color: this.color,
      roughness: 0,
      metalness: 0,
      side: THREE.FrontSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    
  }

  get position() {
    return this.mesh.position
  }
  
  set opacity(value) {
    this.material.opacity = value
  }

  set color(value) {
    this.material.color = value
  }

  update(freq) {
    this.colorModifier.r = utils.remapFreq(0, 0.8, freq)
    this.color = this.colorModifier
  }
}
