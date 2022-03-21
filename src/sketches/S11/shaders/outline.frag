precision highp float;

varying vec3 vNormal;

void main() {
    vec3 color;
    color.r = 0.2 + (vNormal.r * 0.6);
    color.g =  0.1 + (vNormal.g * 0.05);
    color.b = 0.5 + (vNormal.b * 0.1);
    gl_FragColor = vec4(color, 1.0);
}