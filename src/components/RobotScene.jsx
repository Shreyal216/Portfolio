import { useEffect, useRef, useState } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Sphere } from "ogl";
import "./RobotScene.css";
import useCompactDevice from "../hooks/useCompactDevice";

const vertex = `
attribute vec3 position;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = -p.xyz;
  gl_Position = projectionMatrix * p;
}`;

const fragment = `
precision highp float;
uniform vec3 color;
uniform float emission;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vView);
  vec3 key = normalize(vec3(-3.0, 4.0, 5.0));
  vec3 fill = normalize(vec3(4.0, 1.0, 2.0));
  float diffuse = max(dot(n, key), 0.0);
  float rim = pow(1.0 - max(dot(n, v), 0.0), 2.5);
  float spec = pow(max(dot(n, normalize(key + v)), 0.0), 65.0);
  vec3 lit = color * (0.24 + diffuse * 0.75);
  lit += vec3(0.65, 0.40, 1.0) * max(dot(n, fill), 0.0) * 0.20;
  lit += vec3(1.0, 0.75, 0.98) * rim * 0.42 + vec3(1.0) * spec * 0.8;
  gl_FragColor = vec4(mix(lit, color * 1.3, emission), 1.0);
}`;

export default function RobotScene() {
  const compact = useCompactDevice();
  const hostRef = useRef(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    let renderer;
    try {
      renderer = new Renderer({ alpha: true, antialias: !compact, dpr: Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5) });
    } catch {
      setUnavailable(true);
      return undefined;
    }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    host.appendChild(gl.canvas);
    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 0.15, 7.2);
    const scene = new Transform();
    const robot = new Transform();
    robot.setParent(scene);
    const geometry = new Sphere(gl, { radius: 1, widthSegments: compact ? 24 : 32, heightSegments: compact ? 16 : 24 });
    const programs = [];
    const material = (color, emission = 0) => {
      const program = new Program(gl, { vertex, fragment, uniforms: { color: { value: color }, emission: { value: emission } } });
      programs.push(program);
      return program;
    };
    const shell = material([0.83, 0.84, 0.94]);
    const dark = material([0.017, 0.012, 0.043]);
    const metal = material([0.21, 0.16, 0.35]);
    const pink = material([1, 0.48, 0.94], 0.85);
    const eye = material([0.68, 0.85, 1], 1);
    const part = (parent, program, position, scale) => {
      const mesh = new Mesh(gl, { geometry, program });
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      mesh.setParent(parent);
      return mesh;
    };

    const head = new Transform();
    head.position.y = 0.65;
    head.setParent(robot);
    part(head, shell, [0, 0, 0], [1.02, 0.75, 0.64]);
    part(head, metal, [0, -0.02, 0.47], [0.91, 0.57, 0.30]);
    part(head, dark, [0, 0, 0.57], [0.86, 0.51, 0.24]);
    const gaze = new Transform();
    gaze.setParent(head);
    const eyes = [-0.31, 0.31].map(x => part(gaze, eye, [x, 0.06, 0.802], [0.105, 0.18, 0.035]));
    [-0.10, 0, 0.10].forEach((x, i) => part(head, pink, [x, -0.21 - (i === 1 ? 0.02 : 0), 0.796], [0.032, 0.025, 0.015]));
    part(head, metal, [0, 0.82, 0], [0.04, 0.20, 0.04]);
    part(head, pink, [0, 1.03, 0], [0.095, 0.095, 0.095]);
    [-1, 1].forEach(side => {
      part(head, metal, [side * 1.01, -0.01, 0], [0.13, 0.25, 0.25]);
      part(head, pink, [side * 1.10, -0.01, 0], [0.055, 0.14, 0.14]);
    });
    part(robot, metal, [0, -0.14, 0], [0.22, 0.22, 0.22]);
    part(robot, shell, [0, -0.65, 0], [0.64, 0.61, 0.44]);
    part(robot, dark, [0, -0.58, 0.39], [0.30, 0.22, 0.08]);
    part(robot, pink, [0, -0.58, 0.47], [0.095, 0.095, 0.025]);
    const arms = [-1, 1].map(side => {
      part(robot, metal, [side * 0.65, -0.38, 0], [0.15, 0.15, 0.15]);
      const arm = part(robot, shell, [side * 0.84, -0.62, 0], [0.20, 0.39, 0.23]);
      arm.rotation.z = side * 0.27;
      return arm;
    });
    [-1, 1].forEach(side => part(robot, metal, [side * 0.30, -1.17, 0.04], [0.22, 0.17, 0.30]));

    const target = { x: 0, y: 0 };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let visible = true;
    let frame = 0;
    let previous = 0;
    let time = 0;
    let scrolling = false;
    let scrollTimer;
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      camera.perspective({ aspect: width / Math.max(1, height) });
      renderer.render({ scene, camera });
    };
    const pointer = event => {
      if (event.pointerType !== 'mouse' || !visible || reduced || scrolling) return;
      const rect = host.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width * 0.8)));
      target.y = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height * 0.8)));
    };
    const reset = () => { target.x = 0; target.y = 0; };
    const render = now => {
      frame = 0;
      if (previous && now - previous < 1000 / (compact ? 30 : 60) - 0.5) {
        frame = requestAnimationFrame(render);
        return;
      }
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
      previous = now;
      time += dt;
      const ease = 1 - Math.exp(-dt * 7);
      head.rotation.y += ((reduced ? 0 : target.x * 0.60) - head.rotation.y) * ease;
      head.rotation.x += ((reduced ? 0 : target.y * 0.35) - head.rotation.x) * ease;
      robot.rotation.y = head.rotation.y * 0.22;
      robot.position.y = reduced ? 0 : Math.sin(time * 1.6) * 0.075;
      gaze.position.x = reduced ? 0 : target.x * 0.045;
      gaze.position.y = reduced ? 0 : -target.y * 0.035;
      const blink = reduced ? 1 : 1 - Math.pow(Math.max(0, Math.cos(time * 1.4)), 80) * 0.92;
      eyes.forEach(item => { item.scale.y = 0.18 * blink; });
      arms.forEach((arm, index) => { arm.rotation.z = (index ? 1 : -1) * (0.27 + (reduced ? 0 : Math.sin(time * 1.6) * 0.08)); });
      renderer.render({ scene, camera });
      if (visible && !document.hidden && !reduced) frame = requestAnimationFrame(render);
    };
    const wake = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (visible && !document.hidden && !scrolling) frame = requestAnimationFrame(render);
    };
    const onScroll = () => {
      scrolling = true;
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; wake(); }, 180);
    };
    const onMotion = () => { reduced = motionQuery.matches; wake(); };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); });
    intersection.observe(host);
    window.addEventListener("pointermove", pointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", wake);
    motionQuery.addEventListener("change", onMotion);
    window.addEventListener('scroll', onScroll, { passive: true });
    resize();
    wake();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", pointer);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", wake);
      motionQuery.removeEventListener("change", onMotion);
      geometry.remove();
      programs.forEach(program => gl.deleteProgram(program.program));
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [compact]);

  return (
    <div className="robot-scene" role="img" aria-label="A floating silver 3D robot with glowing eyes that follows your pointer">
      <div className="robot-halo" />
      <div className="robot-canvas" ref={hostRef} />
      {unavailable && <span className="robot-fallback" aria-hidden="true">🤖</span>}
      <div className="robot-floor" />
      <span className="robot-label"><i /> YOUR DIGITAL COMPANION</span>
      <span className="robot-hint">Move your pointer. I’m following.</span>
    </div>
  );
}
