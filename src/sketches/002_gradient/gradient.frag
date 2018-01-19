precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 yellow = vec3(0.93, 0.86, 0.78);
vec3 coral = vec3(1.0, 0.38, 0.5);

float mapRange(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (newMax - newMin) * (value - oldMin) / (oldMax - oldMin);
}

float circle ( vec2 pos, float radius) {
    vec2 origin = vec2(sin(u_time * 2.0) / 3.0, cos(u_time * 2.0) / 3.0);

   	float dist = length(pos - origin) - radius;
    float mappedPos = mapRange(pos.x, -1.0, 1.0, 0.1, 0.7); // decrease color channel range
    return dist < 0.0 ? mappedPos : 1.0 - mappedPos;
}

void main() {
	vec2 pos = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

  float radius = 0.5;
  float intensity = circle(pos, radius);
  vec3 color = vec3(intensity * coral);
  gl_FragColor = vec4(color, 1.0);

}
