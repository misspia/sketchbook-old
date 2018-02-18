precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_image0;
uniform sampler2D u_image1;
varying vec2 v_texCoord;

vec2 pinch() {

  return vec2(0.0);
}

void main() {
  vec2 uv_mouse = u_mouse / u_resolution;

  vec4 bgTexture = texture2D(u_image0, v_texCoord);
  vec4 fgTexture = texture2D(u_image1, v_texCoord);

  vec4 color;

  if(fgTexture.r < 0.5 && fgTexture.g < 0.5 && fgTexture.b < 0.5) {
    vec2 uv_distorted = gl_FragCoord.xy / u_resolution;
    uv_distorted.y = 1.0 - uv_distorted.y; // flip

    vec2 direction = uv_distorted - vec2(sin(u_time) * 0.7, cos(u_time) * 0.5);
    direction.x *= u_resolution.x / u_resolution.y;
    uv_distorted *= length(direction);

    bgTexture = texture2D(u_image0, uv_distorted);
    fgTexture = texture2D(u_image1, uv_distorted);

    // fgTexture = bgTexture - vec4(0.4, uv_mouse.x, 0.0, 0.0);
    // color = bgTexture * fgTexture;
    color = bgTexture;
  } else {
    color = bgTexture;
  }
  gl_FragColor = vec4(color.rgb, 1.0);
}
