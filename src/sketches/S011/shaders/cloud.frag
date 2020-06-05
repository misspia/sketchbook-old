#pragma glslify: fbm3d = require('glsl-fractal-brownian-noise/3d')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: levels = require('./levels.glsl')


uniform sampler2D uTxtShape;
uniform sampler2D uTxtCloudNoise;
uniform float uTime;

uniform float uFac1;
uniform float uFac2;
uniform float uTimeFactor1;
uniform float uTimeFactor2;
uniform float uDisplStrenght1;
uniform float uDisplStrenght2;

varying vec2 vUv;

void main() {
    vec2 newUv = vUv;

    vec4 txtNoise1 = texture2D(uTxtCloudNoise, vec2(vUv.x + uTime * 0.1, vUv.y - uTime * 0.14));
    vec4 txtNoise2 = texture2D(uTxtCloudNoise, vec2(vUv.x - uTime * 0.02, vUv.y + uTime * 0.17 + 0.2));

    float noiseBig = fbm3d(vec3(vUv * uFac1, uTime * uTimeFactor1), 2);
    newUv += noiseBig * uDisplStrenght1;

    float noiseSmall = snoise3(vec3(newUv * uFac2, uTime * uTimeFactor2));

    newUv += noiseSmall * uDisplStrenght2;

    vec4 txtShape = texture2D(uTxtShape, newUv);

    float alpha = levels((txtNoise1 + txtNoise2) * 0.6, 0.2, 0.4, 0.7).r;
    float opacity = 1.0;
    alpha *= txtShape.r;
    if(alpha < 0.15 ) {
        alpha = 0.0;
    }

    gl_FragColor = vec4(vec3(0.95,0.95,0.95), alpha);
    // gl_FragColor = vec4(vec3(alpha, 0.0,0.0), opacity);
}
