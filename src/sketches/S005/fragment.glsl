precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D u_image0;
uniform sampler2D u_image1;
varying vec2 v_texCoord;

const float fdelta = 2.0;
const float fhalf = 1.0;

vec4 toonShade(float lum) {
  vec4 color = vec4(0.9, 0.9, 1.0, 1.0);
  if(lum < 1.0) {
    if(mod(gl_FragCoord.x + gl_FragCoord.y, fdelta) == 0.0) {
      color = vec4(1.0, 0.7, 0.7, 1.0);
    }
  }
  if(lum < 0.75) {
    if(mod(gl_FragCoord.x - gl_FragCoord.y, fdelta) == 0.0) {
      color = vec4(1.0, 0.5, 0.5, 1.0);
    }
  }
  if(lum < 0.5) {
    if(mod(gl_FragCoord.x + gl_FragCoord.y - fhalf, fdelta) == 0.0) {
      color = vec4(1.0, 0.3, 0.3, 1.0);
    }
  }
  if(lum < 0.25) {
    if(mod(gl_FragCoord.x - gl_FragCoord.y - fhalf, fdelta) == 0.0) {
      color = vec4(1.0, 0.0, 0.0, 1.0);
    }

  }
  return color;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 uv_mouse = u_mouse / u_resolution;
  uv_mouse.y = 1.0 - uv_mouse.y; // flip axis

  float radar = length(vec2(0.5) - 0.2);

  vec4 bgTexture = texture2D(u_image0, v_texCoord);
  vec4 fgTexture = texture2D(u_image1, v_texCoord);

  float lum = length(bgTexture.rgb);
  vec4 color = toonShade(lum);

  if(uv_mouse.x > uv.x) {
    color = 1.0 - color;
  }
  
  // see batman symbol
  // if(uv_mouse.x > uv.x) {
  //   if(fgTexture.a < 0.5) {
  //     color = 1.0 - color;
  //   }
  // } else {
  //   if(fgTexture.a > 0.5) {
  //     color = 1.0 - color;
  //   }
  // }

  gl_FragColor = vec4(color.rgb, 1.0);
}
