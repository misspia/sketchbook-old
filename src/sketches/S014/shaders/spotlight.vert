precision highp float;

attribute float alpha;

varying vec3 vNormal;
varying vec3 vWorldPosition;

varying float vAlpha;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  vNormal		= normalize( normalMatrix * normal );
  vec4 worldPosition	= modelMatrix * vec4( position, 1.0 );
  vWorldPosition		= worldPosition.xyz;
  vAlpha = alpha;
  vPosition = position;
  vUv = uv;
}
