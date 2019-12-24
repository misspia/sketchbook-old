import * as THREE from 'three';
import utils from '../utils';
import frag from './arc.frag';
import vert from './arc.vert';


const noiseShader = `
vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float noise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}


`;

/**
 * http://blog.edankwan.com/post/three-js-advanced-tips-shadow
 * https://threejs.org/docs/#api/en/core/Object3D
 * https://discourse.threejs.org/t/shadermaterial-particles-not-receiving-shadows/3962
 */
export default class OuterRing {
  constructor(customConfig) {
    this.config = {
      radius: 10,
      tube: 1,
      radialSegments: 15,
      tubularSegments: 30,
      numDivisions: 20,
      color: 0x000000,
      wireframe: false,
      ...customConfig
    };
    this.group = new THREE.Group();
    this.arcs = [];
    this.createArcs();

    this.group.rotation.x = utils.toRadians(90);
  }
  createArcs() {
    const { radius, tube, radialSegments, tubularSegments, numDivisions } = this.config;
    const padding = utils.toRadians(2);
    const arcLength = utils.toRadians(360 / numDivisions) - padding * 2;


    // const material = new THREE.RawShaderMaterial({
    //   uniforms: {
    //     u_freq: { type: 'f', value: 1.0 },
    //     u_time: { type: 'f', value: 0.0 },
    //   },
    //   fragmentShader: frag,
    //   vertexShader: vert,
    //   side: THREE.DoubleSide,
    //   // transparent: true,
    // });
    // console.debug(THREE.ShaderChunk.shadowmap_vertex)
    const material = new THREE.RawShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.shadowmap,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.ambient,
        THREE.UniformsLib.fog,
        {
          u_freq: { type: 'f', value: 1.0 },
          u_time: { type: 'f', value: 0.0 },
        },
      ]),
      fragmentShader: `
        precision highp float;

        varying vec3 vPosition;
        uniform float u_freq;

        float remap(float min1, float max1, float min2, float max2, float value) {
            return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
        }

        float remapFreq(float min, float max) {
            return remap(0.0, 255.0, min, max, u_freq);
        }

        float reverseRemapFreq(float min, float max) {
            return remap(0.0, 255.0, min, max, 255.0 - u_freq);
        }

        ${THREE.ShaderChunk.shadowmap_pars_fragment}
			  ${THREE.ShaderChunk.shadowmask_pars_fragment}
        void main() {
            vec3 color = vec3(1.0, 0.6, 0.2);
            color.r = remapFreq(0.5, 0.6);
            color.g = remapFreq(0.1, 0.6);
            color.b = remapFreq(0.2, 1.0);

            gl_FragColor = vec4(color, 1.0);
        }
      `,
      vertexShader: `
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

      float remap(float min1, float max1, float min2, float max2, float value) {
          return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
      }

      float remapFreq(float min, float max) {
          return remap(0.0, 255.0, min, max, u_freq);
      }

      ${THREE.ShaderChunk[ 'fog_pars_vertex' ]}
      ${THREE.ShaderChunk[ 'shadowmap_pars_vertex' ]}

      ${noiseShader}

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

        ${THREE.ShaderChunk[ 'fog_vertex' ]}
        ${THREE.ShaderChunk[ 'shadowmap_vertex' ]}
      }

      `,
      side: THREE.DoubleSide,
      lights: true,
      blending: THREE.NoBlending
    });
    const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arcLength);

    let rotateZ = 0;
    const radianIncrement = utils.toRadians(360 / numDivisions);
    for (let i = 0; i < numDivisions; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.matrixAutoUpdate = false;
      mesh.castShadow = true;

      mesh.rotation.z += rotateZ;
      this.arcs.push(mesh);
      this.group.add(mesh);

      rotateZ += radianIncrement;
    }
  }
  rotateZ(z) {
    this.mesh.rotation.z = z;
  }
  update(frequencyData, uTime) {
    this.arcs.forEach((arc, index) => {
      const frequency = frequencyData[index];
      arc.material.uniforms.u_freq.value = frequency;
      arc.material.uniforms.u_time.value = uTime;
      arc.updateMatrix();
    });
  }
}
