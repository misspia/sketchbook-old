precision mediump float;

attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;

void main() {
   vec2 uv = a_position / u_resolution;

   // convert from 0->1 to 0->2
   uv *= 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = uv - 1.0;
   clipSpace *= vec2(1.0, -1.0);

   gl_Position = vec4(clipSpace, 0, 1);
   v_texCoord = a_texCoord;
}
