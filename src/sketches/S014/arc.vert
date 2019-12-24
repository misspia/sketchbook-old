precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform  float u_freq;
uniform float u_time;

#pragma glslify: noise = require('glsl-noise/classic/3d')

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, u_freq);
}


// THREE.ShaderChunk[ 'fog_pars_vertex' ]
// THREE.ShaderChunk[ 'shadowmap_pars_vertex' ]

void main () {
  float amp = remapFreq(1.0, 3.5);
  vec3 fnoise = vec3(1.0, 1.0, 1.0);
  fnoise.x = remapFreq(0.0, 1.0);
  fnoise.y = remapFreq(0.0, 2.0);
  fnoise.z = remapFreq(-1.0, 3.0);

  float displacement = amp * noise(vec3(position * fnoise * 0.06) + u_time );
  vec3 newPosition = position + normal * displacement;

  vPosition = newPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  // THREE.ShaderChunk[ 'fog_vertex' ]
	// THREE.ShaderChunk[ 'shadowmap_vertex' ]
}
