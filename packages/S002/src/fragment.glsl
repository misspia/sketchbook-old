precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 yellow = vec3(0.93, 0.86, 0.78);
vec3 coral = vec3(1.0, 0.38, 0.5);

float mapRange(float value, float oldMin, float oldMax, float newMin, float newMax) {
    return newMin + (newMax - newMin) * (value - oldMin) / (oldMax - oldMin);
}

float smin(float a, float b, float k ) {
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

float distanceField(vec2 pos, float radius, vec2 origin) {
   	float d1 = length(pos - origin) - radius;
    float d2 = length(pos + origin) - radius;
    float d3 = length(pos - origin.yx) - radius;
    float d4 = length(pos + origin.yx) - radius;

    float mappedPos = mapRange(pos.x, -1.0, 1.0, 0.1, 0.7); // decrease color channel range
    float minDist = smin(d1, d2, 0.25);

    return  minDist < 0.0 ? mappedPos : 1.0 - mappedPos;
}

void main() {
	vec2 pos = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

  float radius = 0.3;
  vec2 origin;

  origin.x = sin(u_time) * 0.5;
  origin.y = cos(u_time * 0.5) * 0.5;

  float intensity = distanceField(pos, radius, origin);
  vec3 color = vec3(intensity * coral);
  gl_FragColor = vec4(color, 1.0);

}
