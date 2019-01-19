precision highp float;

varying vec3 vNormal;
varying float intensity;

float gaussianPdf(float x, float sigma) {
    return 0.39894 * exp( -0.5 * x * x / (sigma * sigma) / sigma);
}

void main() {
    gl_FragColor = vec4(1.0, 0.6, 0.8, 1.0);
}