import * as THREE from 'three'

// http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
// https://github.com/jeromeetienne/threex.volumetricspotlight/blob/master/examples/basic.html
// https://github.com/jeromeetienne/threex.volumetricspotlight/blob/master/threex.volumetricspotlightmaterial.js
export default class VolumetricSpotlight {
  constructor() {
    this.geometry = new THREE.CylinderGeometry()
    this.material = new THREE.RawShaderMaterial({

    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {

  }
  
  update() {

  }
}
