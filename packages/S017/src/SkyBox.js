import * as THREE from 'three'


export const WIDTH = 160
export const DEPTH = 130
export const HEIGHT = 90

export class SkyBox {
  constructor() {
    this.group = new THREE.Group()

    this.geometry = new THREE.Geometry()

    this.createFloor()
    this.createBackWall()
    this.createSideWalls()

    this.material = new THREE.MeshStandardMaterial({ 
      color: 0xffff00, 
      emissive: 0x000000,
      roughness: 0,
      metalness: 0,
      depthTest: true,
      depthWrite: true,
      alphaTest: 0,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.receiveShadow = true
    this.group.add(this.mesh)
  }

  createFloor() {
    const geometry = new THREE.PlaneGeometry(WIDTH, DEPTH)
    this.floor = new THREE.Mesh(geometry, this.material) 
    this.floor.rotation.x = -Math.PI * 0.5
    this.floor.updateMatrix()

    this.geometry.merge(this.floor.geometry, this.floor.matrix)
  }

  createBackWall() {
    const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT)
    this.backWall = new THREE.Mesh(geometry, this.material)
    this.backWall.position.set(0, HEIGHT / 2, -DEPTH / 2)
    this.backWall.updateMatrix()
    
    this.geometry.merge(this.backWall.geometry, this.backWall.matrix)
  }

  createSideWalls() {
    const geometry = new THREE.PlaneGeometry(DEPTH, HEIGHT)
    
    this.leftWall = new THREE.Mesh(geometry, this.material)
    this.rightWall = this.leftWall.clone()

    this.leftWall.rotateY(Math.PI * 0.5) 
    this.leftWall.translateZ(-WIDTH / 2)
    this.leftWall.translateY(HEIGHT / 2)
    this.leftWall.updateMatrix()

    this.rightWall.rotateY(-Math.PI * 0.5) 
    this.rightWall.translateZ(-WIDTH / 2)
    this.rightWall.translateY(HEIGHT / 2)
    this.rightWall.updateMatrix()

    
    this.geometry.merge(this.leftWall.geometry, this.leftWall.matrix)
    this.geometry.merge(this.rightWall.geometry, this.rightWall.matrix)
  }

  

  get position() {
    return this.group.position
  }

  update() {
    
  }
}
