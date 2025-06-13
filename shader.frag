// based on "Mosaic" @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    st *= 101.0; // scale the coordinate system
    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords

    st.y += u_time * step(0.5, mod(ipos.x, 2.0)); // every other row slides
    
    ipos = floor(st);  // get the integer coords
    fpos = fract(st);  // get the fractional coords

    float checker = step(0.5, fpos.x) * step(0.5, fpos.y); // checkboard pattern

    float color = mix(1.0, random(ipos), checker);

    gl_FragColor = vec4(vec3(color),1.0);
}
