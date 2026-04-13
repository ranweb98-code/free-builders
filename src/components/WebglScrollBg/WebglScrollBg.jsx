import { useEffect, useRef, useState } from 'react';
import './WebglScrollBg.css';

/**
 * WebGL raymarched background synced to scroll (from webgl-scroll-sync template, MIT).
 * Adapted: site colors, no wheel hijack — native scrolling preserved.
 */

const VS = `attribute vec2 a; void main(){ gl_Position=vec4(a,0,1); }`;

const FS = `
precision highp float;
uniform vec2 uR;
uniform float uT, uS, uSc, uBl;
uniform vec3 uBg;
uniform vec3 uAccent;

#define TAU 6.2831853

mat2 r2(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float sphere(vec3 p, float r) { return length(p) - r; }

float torus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float box(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.);
}

float octa(vec3 p, float s) {
  p = abs(p);
  return (p.x + p.y + p.z - s) * .5773;
}

float sdf(vec3 p) {
  float t = uT * .25, sc = uSc, bl = uBl;

  float d0 = sphere(p, .65 + .05 * sin(t * 1.3));

  vec3 p1 = p; p1.xz = r2(t * .6) * p1.xz;
  float d1 = torus(p1, vec2(.55, .22));

  vec3 p2 = p; p2.xy = r2(t * .4) * p2.xy; p2.yz = r2(t * .3) * p2.yz;
  float d2 = box(p2, vec3(.42 + .04 * sin(t * 2.)));

  vec3 p3 = p; p3.xy = r2(t * .5) * p3.xy;
  float d3 = octa(p3, .72 + .04 * sin(t * 1.7));

  vec3 p4 = p; p4.xz = r2(t * .7) * p4.xz;
  float d4a = torus(p4, vec2(.45, .15));
  vec3 p5 = p; p5.xy = r2(t * .5 + 1.2) * p5.xy;
  float d4b = torus(p5, vec2(.35, .12));
  float d4 = min(d4a, d4b);

  if (sc < 1.) return mix(d0, d1, bl);
  if (sc < 2.) return mix(d1, d2, bl);
  if (sc < 3.) return mix(d2, d3, bl);
  return mix(d3, d4, bl);
}

vec3 norm(vec3 p) {
  float e = .001;
  return normalize(vec3(
    sdf(p + vec3(e,0,0)) - sdf(p - vec3(e,0,0)),
    sdf(p + vec3(0,e,0)) - sdf(p - vec3(0,e,0)),
    sdf(p + vec3(0,0,e)) - sdf(p - vec3(0,0,e))
  ));
}

vec3 pal(float t) {
  vec3 base = .5 + .5 * cos(TAU * (.9 * t + vec3(0., .12, .22)));
  return mix(base, uAccent, 0.42);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uR * .5) / min(uR.x, uR.y);
  vec3 ro = vec3(0, 0, 2.4);
  vec3 rd = normalize(vec3(uv, -1.2));

  float t = 0., hit = 0.;
  for (int i = 0; i < 96; i++) {
    float d = sdf(ro + rd * t);
    if (d < .001) { hit = 1.; break; }
    if (t > 6.) break;
    t += d;
  }

  vec3 bg = uBg, col = bg;

  if (hit > .5) {
    vec3 p = ro + rd * t;
    vec3 n = norm(p);
    vec3 bc = pal(uS);
    vec3 l = normalize(vec3(.7, 1., .5));
    float dif = clamp(dot(n, l), 0., 1.);
    float spe = pow(clamp(dot(reflect(-l, n), -rd), 0., 1.), 32.);
    float fr  = pow(1. - clamp(dot(-rd, n), 0., 1.), 3.5);
    col = bc * (dif * .7 + .3) + spe * .45 + fr * uAccent * .55;
    col = mix(bg, col, exp(-t * .15));
  }

  col = mix(uBg, col, clamp(1. - dot(uv * .9, uv * .9), 0., 1.));
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(127.1, 311.7))) * 43758.5) - .5) * .022;

  gl_FragColor = vec4(col, 1.);
}`;

const N = 5;

function hexToVec3(hex) {
  const h = hex.replace('#', '').trim();
  if (h.length !== 6) return [0.98, 0.97, 0.95];
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readCssColor(prop) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
  if (raw.startsWith('#')) return hexToVec3(raw);
  return null;
}

export default function WebglScrollBg() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const [enableCanvas, setEnableCanvas] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnableCanvas(true);
  }, []);

  useEffect(() => {
    if (!enableCanvas) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return undefined;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VS);
    const fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return undefined;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return undefined;
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const ap = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(ap);
    gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, 'uR');
    const uTi = gl.getUniformLocation(prog, 'uT');
    const uScroll = gl.getUniformLocation(prog, 'uS');
    const uScene = gl.getUniformLocation(prog, 'uSc');
    const uBlend = gl.getUniformLocation(prog, 'uBl');
    const uBg = gl.getUniformLocation(prog, 'uBg');
    const uAccent = gl.getUniformLocation(prog, 'uAccent');

    let maxScroll = 1;
    let tgt = 0;
    let smooth = 0;
    let lastNow = performance.now();
    const t0 = lastNow;

    const paper = readCssColor('--paper') || hexToVec3('#FAF7F2');
    const accent = readCssColor('--accent') || hexToVec3('#0047FF');
    gl.uniform3f(uBg, paper[0], paper[1], paper[2]);
    gl.uniform3f(uAccent, accent[0], accent[1], accent[2]);

    const updateMaxScroll = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
      updateMaxScroll();
    };

    const onScroll = () => {
      updateMaxScroll();
      tgt = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    resize();
    onScroll();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
      resize();
      onScroll();
    }) : null;
    if (ro) ro.observe(document.documentElement);

    const frame = (now) => {
      rafRef.current = requestAnimationFrame(frame);
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;

      smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));

      const raw = smooth * (N - 1);
      const flr = Math.floor(raw);
      const si = Math.min(flr, N - 2);
      const bl = flr >= N - 1 ? 1.0 : raw - flr;

      gl.uniform1f(uTi, (now - t0) / 1000);
      gl.uniform1f(uScroll, smooth);
      gl.uniform1f(uScene, si);
      gl.uniform1f(uBlend, bl);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (ro) ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [enableCanvas]);

  if (!enableCanvas) return null;

  return <canvas ref={canvasRef} className="webgl-scroll-bg" aria-hidden />;
}
