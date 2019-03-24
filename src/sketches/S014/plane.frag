precision highp float;

uniform vec3 u_color;
uniform vec2 u_mouse;
uniform vec3 u_noise;
uniform float u_amp;
uniform float u_time;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/classic/3d')

void main() {
    float dist = distance(vUv, u_mouse);

    float displacementNoise = noise(vec3(vec3(vUv, 1.0) * u_noise * u_amp));
    float displacement = min(0.5, displacementNoise * sin(u_time)) ;
    if(dist < dist + displacement) {
        gl_FragColor = vec4(0.5, 0.5, 0.3, 0.0);
    } else {
        gl_FragColor = vec4(u_color, 1.0);
    }
}


// void main() {
//     float displacement = noise(vec3(vec3(vUv, 1.0) * u_noise * u_amp));
//     float dist = distance(vUv, u_mouse);
//     if(dist < displacement) {
//     // if(dist < 0.1) {
//         gl_FragColor = vec4(0.5, 0.5, 0.3, 0.0);
//     } else {
//         gl_FragColor = vec4(u_color, 1.0);
//     }
// }

// void main() {
//     float dist = distance(vUv, u_mouse);

//     float displacementNoise = noise(vec3(vec3(vUv, 1.0) * u_noise * u_amp));
//     float displacement = min(minDisplacement, displacementNoise * sin(u_time));

//     float minDisplacement = distance(u_mouse, u_mouse + 0.05);
//     float maxDisplacement = distance(u_mouse, u_mouse - displacementNoise) * min(0.3, max(0.05,sin(u_time) * 2.0));
//     if(dist < maxDisplacement) {
//         gl_FragColor = vec4(0.5, 0.5, 0.3, 0.0);
//     } else {
//         gl_FragColor = vec4(u_color, 1.0);
//     }
// }

