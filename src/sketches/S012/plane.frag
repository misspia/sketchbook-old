precision highp float;

uniform sampler2D u_texture_a;
uniform sampler2D u_texture_b;
uniform vec2 u_mouse;
uniform float u_interact_radius;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;


float remap(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
}

void main() {
    float zDistance = 1.0 - vPosition.z;
    // blue
    vec3 blue = vec3(
        remap(zDistance, -1.0, 1.0, 0.25, 0.3), 
        remap(zDistance, -1.0, 1.0, 0.4, 0.5), 
        remap(zDistance, -1.0, 1.0, 0.6, 1.0)
    );
    
    // red
    vec3 red = vec3(
        remap(zDistance, -1.0, 1.0, 0.4, 1.0),
        remap(zDistance, -1.0, 1.0, 0.3, 0.4), 
        remap(zDistance, -1.0, 1.0, 0.3, 0.4) 
    );

    // white
    vec3 white = vec3(
        remap(zDistance, -1.0, 1.0, 0.7, 0.9), 
        remap(zDistance, -1.0, 1.0, 0.7, 0.9), 
        remap(zDistance, -1.0, 1.0, 0.7, 0.9)
    );
    vec4 color;

    if(distance(u_mouse.xy, vUv.xy) < u_interact_radius) {
        color = vec4(red, 1.0);
    } else {
        color = vec4(white, 1.0);
    }
    gl_FragColor = texture2D(u_texture_b, vUv) * color;
}