precision highp float;

varying vec3 vNormal;

void main() {
    vec3 color;
    color.r = vNormal.r;
    color.g = vNormal.g * 0.3;
    color.b = vNormal.b * 1.2;
    gl_FragColor = vec4(vNormal.r, 0.3, 0.6, 1.0);
}