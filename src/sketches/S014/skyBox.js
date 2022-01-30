import * as THREE from 'three'
import utils from '../utils';


const WALL_HEIGHT = 80
const WALL_WIDTH = 150
const WALL_X_POS = 40
const WALL_Y_POS = -8


// https://www.deviantart.com/windylife/art/Chinese-New-Year-110990638
export default class SkyBox {
  constructor() {
    // this.material = new THREE.MeshPhongMaterial({ 
    this.material = new THREE.MeshBasicMaterial({ 
      color: 0x111111, 
      dithering: true,
      side: THREE.DoubleSide,
    });
    const leftWallGeometry = new THREE.PlaneGeometry(WALL_WIDTH, WALL_HEIGHT)
    leftWallGeometry.rotateY(utils.toRadians(90))
    leftWallGeometry.translate(WALL_X_POS, WALL_Y_POS, 0)
    const leftWallMesh = new THREE.Mesh(leftWallGeometry, this.material)
    leftWallMesh.updateMatrix()

    const rightWallGeometry = new THREE.PlaneGeometry(WALL_WIDTH, WALL_HEIGHT)
    rightWallGeometry.rotateY(utils.toRadians(90))
    rightWallGeometry.translate(-WALL_X_POS, WALL_Y_POS, 0)
    const rightWallMesh = new THREE.Mesh(rightWallGeometry, this.material)
    rightWallMesh.updateMatrix()

    
    this.geometry = new THREE.Geometry()
    this.geometry.merge(leftWallMesh.geometry, leftWallMesh.matrix)
    this.geometry.merge(rightWallMesh.geometry, rightWallMesh.matrix)

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.mesh.receiveShadow = true;
  }

  get position() {
    return this.mesh.position
  }
}
