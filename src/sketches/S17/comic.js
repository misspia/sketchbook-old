import * as THREE from 'three'
import vertexShader from './shaders/comic.vert' 
import fragmentShader from './shaders/comic.frag' 

export class Comic {
  constructor(width, height, texture) {
    this.geometry = new THREE.PlaneGeometry(width, height)
    
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        image1: { type: 't', value: texture },
        screenRatio: { value: width / height },
        textureRatio: { value: texture.image.width / texture.image.height },
        freq: { value: 0.0 },
      }
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  get rotation() {
    return this.mesh.rotation
  }

  get uniforms() {
    return this.material.uniforms
  }

  update(freq) {
    this.uniforms.freq.value = freq
  }
}
