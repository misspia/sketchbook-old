import * as THREE from 'three';

export class Mouse {
  constructor(context) {
    this.context = context;
    this.intersection = undefined;
    this.mouse = new THREE.Vector2();
    this.mouse.x = -1
    this.mouse.y = -1

    this.raycaster = new THREE.Raycaster();

    this.context.canvas.addEventListener('mousemove', this.onMouseMove, false);
  }

  dispose() {
    this.context.canvas.removeEventListener('mousemove', this.onMouseMove, false);
  }

  onMouseMove = (e) => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y =  -( e.clientY / window.innerHeight ) * 2 + 1;
  }

  update() {
    this.raycaster.setFromCamera(this.mouse, this.context.camera);
    const intersections = this.raycaster.intersectObjects(this.context.lines.children);
    
    this.intersection = intersections[0];
  }

}
