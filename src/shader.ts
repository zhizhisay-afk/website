export const vert = `

    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }

`;

export const frag = /* glsl */ `


uniform float time;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_progress;

 
varying vec2 vUv;
void main() {


    

    vec2 pixelCoords = vUv * u_resolution;
    float cellSize = min(u_resolution.x, u_resolution.y) /50.;
    vec2 gridPixel = floor(pixelCoords / cellSize) * cellSize + cellSize * 0.5;

    vec2 gridUv = gridPixel / u_resolution;
    vec3 color = texture2D(u_texture, gridUv).rgb;
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    float radius = gray * cellSize * 0.5;
    float dist = distance(pixelCoords, gridPixel);
 
    float circle = 1.0 - smoothstep(radius - cellSize * 0.02, radius + cellSize * 0.02, dist);
    vec3 col = vec3(0.5, 0.5, 0.8);


    gl_FragColor = vec4(circle * col, 1.);
  

}

`;
