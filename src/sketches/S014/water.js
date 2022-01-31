import * as THREE from 'three'
import { Images } from '../../themes'

export default class Water {
  constructor(context) {
    this.context = context

    this.geometry = new THREE.IcosahedronGeometry(10, 1)

    const threeTone = new THREE.TextureLoader().load(Images.T014FiveTone);
    threeTone.minFilter = THREE.NearestFilter;
    threeTone.magFilter = THREE.NearestFilter;

    this.material = new THREE.MeshToonMaterial({
      color: 0x00a2ff,
      gradientMap: threeTone,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  update() {

  }
}
