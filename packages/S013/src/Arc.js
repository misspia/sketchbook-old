import * as THREE from 'three';

export class Arc {
  constructor({
    height = 10,
    width = 5,
    depth = 5,
    material,
  }) {
    this.height = height;
    this.width = width;
    this.depth = depth;
    this.radius = this.width / 2;

    this.geometry = new THREE.Geometry();
    this.createCrown();
    this.createSupports();

    this.material = material;
    this.pivot = new THREE.Mesh(this.geometry, this.material);
    this.pivot.receiveShadow = true;

    this.bbox = new THREE.Box3().setFromObject(this.pivot);
  }

  get position() {
    return this.pivot.position;
  }

  get matrix() {
    return this.pivot.matrix;
  }

  dispose() {
    this.geometry.dispose();
  }

  updateMatrix() {
    this.pivot.updateMatrix();
  }

  createCrown() {
    const geometry = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      this.depth,
      this.radius * 8,
      1,
      true,
      0,
      Math.PI,
    );
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.rotation.x += Math.PI / 2;
    mesh.rotation.y += Math.PI / 2;
    mesh.position.y += this.height - this.radius;

    mesh.updateMatrix();

    this.geometry.merge(mesh.geometry, mesh.matrix);
  }

  createSupports() {
    const height = this.height - this.radius;
    const geometry = new THREE.PlaneGeometry(this.depth, height);
    const leftMesh = new THREE.Mesh(geometry, this.material);
    leftMesh.rotation.y += Math.PI / 2;
    const rightMesh = leftMesh.clone();

    leftMesh.position.x -= this.width / 2;
    rightMesh.position.x += this.width / 2;

    leftMesh.position.y = height / 2;
    rightMesh.position.y = height / 2;

    leftMesh.updateMatrix();
    rightMesh.updateMatrix();

    this.geometry.merge(leftMesh.geometry, leftMesh.matrix);
    this.geometry.merge(rightMesh.geometry, rightMesh.matrix);
  }
}
