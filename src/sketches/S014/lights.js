import * as THREE from 'three';

export default class Lights {
  constructor() {
    this.directional = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directional.position.set(1, 1, 1);
    
    this.directional2 = new THREE.DirectionalLight(0xffffff, 1.5);
    this.directional2.position.set(0, -1, 0);

    this.ambient = new THREE.AmbientLight(0x444444);

    this.point1 = new THREE.PointLight(0xffffff)
    this.point1.position.set( 150, 10, 0 );

    this.point2 = new THREE.PointLight(0xffffff)
    this.point2.position.set( -150, 0, 0 );

    this.point3 = new THREE.PointLight(0xffffff)
    this.point3.position.set( 0, -10, -150 );
    
    this.point4 = new THREE.PointLight(0xffffff)
    this.point4.position.set( 0, 0, 150 );
  }

}
