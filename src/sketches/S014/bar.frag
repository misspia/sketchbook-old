precision highp float;

uniform float u_freq;

void main() {
    vec3 color = vec3(0.9, 0.6, 0.9);
    color.r = u_freq;
    
    gl_FragColor = vec4(color, 1.0);
}