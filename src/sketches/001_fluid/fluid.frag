precision mediump float;

varying vec2 v_vertex;
uniform float u_time;

void main() {
    if(gl_FragCoord.xy == v_vertex.xy) {
      gl_FragColor = vec4(1.0,0.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(0.7, 0.7, 1.0, 0.1);
    }

}
