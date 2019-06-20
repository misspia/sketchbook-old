precision highp float;

uniform float u_time;

void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    color.r = cos(u_time);
    color.g = cos(u_time);
    color.b = cos(u_time);
    gl_FragColor = vec4(color, 1.0);
}