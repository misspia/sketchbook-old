// import * as THREE from 'three'
// import utils from '../utils'

// const TEXT = 'JoJo'

// export class JoJo {
//   constructor(font, material) {
//     this.material = material
//     this.j1 = new THREE.Mesh(
//       this.createGeometry('J'),
//       this.material
//     )
//     this.o1 = new THREE.Mesh(
//       this.createGeometry('o'),
//       this.material
//     )
//     this.j2 = new THREE.Mesh(
//       this.createGeometry('J'),
//       this.material
//     )
//     this.o2 = new THREE.Mesh(
//       this.createGeometry('o'),
//       this.material
//     )
//     this.geometry.center()
//     this.mesh = new THREE.Mesh(
//       this.geometry,
//       this.material
//     )
//     this.mesh.receiveShadow = true
//     this.mesh.castShadow = true

//     this.bbox = new THREE.Box3().setFromObject(this.mesh)
//     console.debug(this.bbox)
//   }
  
//   get position() {
//     return this.mesh.position
//   }

//   get min() {
//     return this.bbox.setFromObject(this.mesh).min
//   }

//   get max() {
//     return this.bbox.setFromObject(this.mesh).max
//   }

//   createGeometry(text) {
//     return new THREE.TextGeometry(text, {
//       font,
//       size: 8,
//       height: 2,
//       curveSegments: 15,
//       bevelEnabled: true,
//       bevelSegments: 10,
//       bevelThickness: 0.1,
//       bevelSize: 0.5,
//     })
//   }


//   update(freq) {
//     this.mesh.scale.set(
//       utils.remapFreq(1, 1.1, freq),
//       utils.remapFreq(1, 1.1, freq),
//       utils.remapFreq(1, 5, freq),
//     )

//     const diff = this.max.z - this.min.z
//     this.position.z = diff / 2
//   }
// }

import * as THREE from 'three'
import utils from '../utils'

const TEXT = 'JoJo'

export class JoJo {
  constructor(font, material) {
    this.material = material
    this.j1 = new THREE.Mesh(
      this.createGeometry(font, 'J'),
      this.material
    )
    
    this.o1 = new THREE.Mesh(
      this.createGeometry(font, 'o'),
      this.material
    )
    this.j2 = new THREE.Mesh(
      this.createGeometry(font, 'J'),
      this.material
    )
    this.o2 = new THREE.Mesh(
      this.createGeometry(font, 'o'),
      this.material
    )

    this.j1.receiveShadow = true
    this.j1.castShadow = true
    this.o1.receiveShadow = true
    this.o1.castShadow = true
    this.j2.receiveShadow = true
    this.j2.castShadow = true
    this.o2.receiveShadow = true
    this.o2.castShadow = true

    this.group = new THREE.Group()
    this.group.add(this.j1)
    this.group.add(this.o1)
    this.group.add(this.j2)
    this.group.add(this.o2)

    this.bbox = new THREE.Box3()
    console.debug(this.bbox)
  }
  
  get position() {
    return this.mesh.position
  }

  // get min() {
  //   return this.bbox.setFromObject(this.mesh).min
  // }

  // get max() {
  //   return this.bbox.setFromObject(this.mesh).max
  // }

  createGeometry(font, text) {
    return new THREE.TextGeometry(text, {
      font,
      size: 8,
      height: 2,
      curveSegments: 15,
      bevelEnabled: true,
      bevelSegments: 10,
      bevelThickness: 0.1,
      bevelSize: 0.5,
    })
  }


  update(freq) {
    this.j1.scale.set(
      utils.remapFreq(1, 1.1, freq),
      utils.remapFreq(1, 1.1, freq),
      utils.remapFreq(1, 5, freq),
    )

    // const diff = this.max.z - this.min.z
    // this.position.z = diff / 2
  }
}
