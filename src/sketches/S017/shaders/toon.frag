precision highp float;

void main() {
  float alpha = 1.0;

  float len = distance(vec2(0.5, 0.5), gl_PointCoord.xy);
    if(len > 0.5) {
        alpha = 0.0;
    }

  gl_FragColor = vec4(1.0, 0.0, 0.0, alpha);
}
