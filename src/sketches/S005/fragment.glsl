precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    uv *= 5.0;

    vec3 color = vec3(0.0);

    // Tile the space
    vec2 i_uv = floor(uv);
    vec2 f_uv = fract(uv);

    float m_dist = 10.0;  // minimun distance
    vec2 m_point;        // minimum point

    for (int j = -1; j <= 1; j++ ) {
        for (int i = -1; i <= 1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 point = random2(i_uv + neighbor);
            point = 0.5 + 0.5 * sin(u_time + 6.0 * point);
            vec2 diff = neighbor + point - f_uv;
            float dist = length(diff);

            if( dist < m_dist ) {
                m_dist = dist;
                m_point = point;
            }
        }
    }

    // Assign a color using the closest point position
    color += dot(m_point,vec2(.3,.6));

    gl_FragColor = vec4(color,1.0);
}
