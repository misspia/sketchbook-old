precision highp float;

uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform vec3 uColorNoise;

varying vec2 vUv;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
    float noise = snoise3(uColorNoise);
    float dist = distance(vec2(0.5), vUv);
    vec3 color = mix(uPrimaryColor, uSecondaryColor, dist);

    gl_FragColor = vec4(vec3(color), 1.0);
    // gl_FragColor = vec4(dist, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(vDist, 0.0, 0.0, 1.0);
}
