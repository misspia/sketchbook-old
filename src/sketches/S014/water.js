import * as THREE from 'three'
import { Images } from '../../themes'

/**
 * https://www.google.com/search?q=cell+shading+fire+shader&rlz=1C1CHBF_enNL926NL926&hl=en&sxsrf=APq-WBtXs0YSkfsFbMR2dB6ooLd4WyOr7w:1643588634163&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiTssjl3Nr1AhWLuKQKHeEBB1sQ_AUoAXoECAEQAw&biw=1536&bih=714&dpr=1.25#imgrc=JqPqogJFuzp0fM
 * https://www.google.com/search?q=cell+shading+fire&tbm=isch&ved=2ahUKEwjTvbLM3Nr1AhUUjxoKHY7ZAHcQ2-cCegQIABAA&oq=cell+shading+fire&gs_lcp=CgNpbWcQAzoHCCMQ7wMQJ1DoCljoCmDyDmgAcAB4AIAB7AKIAeEDkgEHMC4xLjAuMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=5Sv3YZO3FpSeao6zg7gH&bih=714&biw=1536&rlz=1C1CHBF_enNL926NL926#imgrc=B-OSwPt2povJ3M
 * 
 */


export default class Water {
  constructor(context) {
    this.context = context

    this.geometry = new THREE.TorusGeometry(5, 2, 10, 15)

    const gradientMap = new THREE.TextureLoader().load(Images.T014ThreeTone);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;

    this.material = new THREE.MeshToonMaterial({
      // color: 0x00a2ff,
      color: 0xe5e507,
      gradientMap,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.mesh.position
  }

  update() {

  }
}
