precision highp float;

varying vec3 vNormal;
uniform float uTime;

void main() {
    float opacity = max(0.2, smoothstep(0.1, 1.0, sin(uTime * 0.5) + 0.5));
    gl_FragColor = vec4(0.8, 0.6, 1.0, opacity);
}