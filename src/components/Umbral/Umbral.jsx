import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const OBJ_URL = 'https://cdn.jsdelivr.net/gh/danielyl123/person/person.obj';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uCircleSpacing;
  uniform float uLineWidth;
  uniform float uSpeed;
  uniform float uFadeEdge;
  uniform vec3 uCameraPosition;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 uv = vUv;
    float dist = distance(uv, center);

    float animatedDist = dist - uTime * uSpeed;

    float circle = mod(animatedDist, uCircleSpacing);

    float distFromEdge = min(circle, uCircleSpacing - circle);

    float aaWidth = length(vec2(dFdx(animatedDist), dFdy(animatedDist))) * 2.0;
    float lineAlpha = 1.0 - smoothstep(uLineWidth - aaWidth, uLineWidth + aaWidth, distFromEdge);

    vec3 baseColor = mix(vec3(1.0), vec3(0.0), lineAlpha);

    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(uCameraPosition - vPosition);

    vec3 lightDir = normalize(vec3(5.0, 10.0, 5.0));
    float NdotL = max(dot(normal, lightDir), 0.0);

    vec3 diffuse = baseColor * (0.5 + 0.5 * NdotL);

    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
    vec3 specular = vec3(1.0) * spec * 0.8;

    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
    vec3 fresnelColor = vec3(1.0) * fresnel * 0.3;

    vec3 finalColor = diffuse + specular + fresnelColor;

    float edgeFade = smoothstep(0.5 - uFadeEdge, 0.5, dist);
    float alpha = 1.0 - edgeFade;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function Umbral({ controlsEnabled = true, className = '' }) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let cancelled = false;

    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(-7, -5, 11);
    camera.lookAt(0, 0, 0);
    camera.fov = 75;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 1);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.enabled = controlsEnabled;
    controlsRef.current = controls;

    const floorGeometry = new THREE.CircleGeometry(20, 200);
    const floorMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uCircleSpacing: { value: 0.06 },
        uLineWidth: { value: 0.02 },
        uSpeed: { value: 0.01 },
        uFadeEdge: { value: 0.2 },
        uCameraPosition: { value: new THREE.Vector3() },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    let loadedObject = null;
    const loader = new OBJLoader();
    loader.load(
      OBJ_URL,
      (object) => {
        if (cancelled) {
          object.traverse((child) => {
            if (child.isMesh) {
              child.geometry?.dispose();
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach((m) => m.dispose());
                } else {
                  child.material.dispose();
                }
              }
            }
          });
          return;
        }

        object.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x888888,
              roughness: 0.7,
              metalness: 0.3,
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const box = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);

        object.traverse((child) => {
          if (child.isMesh && child.geometry) {
            child.geometry.translate(-center.x, -center.y, -center.z);
          }
        });

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        object.scale.set(scale, scale, scale);

        object.position.set(0, 1, 0);
        object.rotation.y = Math.PI / 3;
        object.updateMatrixWorld(true);

        scene.add(object);
        loadedObject = object;

        controls.target.set(0, 0, 0);
        controls.update();
      },
      undefined,
      (err) => {
        console.error('Error loading OBJ:', err);
      }
    );

    let time = 0;
    let animationId = 0;

    function resizeRenderer() {
      if (!mountRef.current) return;
      const rw = mountRef.current.clientWidth || window.innerWidth;
      const rh = mountRef.current.clientHeight || window.innerHeight;
      renderer.setSize(rw, rh);
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.016;
      floorMaterial.uniforms.uTime.value = time;

      const cameraWorldPos = new THREE.Vector3();
      camera.getWorldPosition(cameraWorldPos);
      floorMaterial.uniforms.uCameraPosition.value.copy(cameraWorldPos);

      renderer.render(scene, camera);
      controls.update();
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      resizeRenderer();
    });
    resizeObserver.observe(mount);

    window.addEventListener('resize', resizeRenderer);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeRenderer);
      cancelAnimationFrame(animationId);

      controls.dispose();
      controlsRef.current = null;

      if (loadedObject) {
        scene.remove(loadedObject);
        loadedObject.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((m) => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }

      scene.remove(floor);
      floorGeometry.dispose();
      floorMaterial.dispose();

      scene.remove(ambientLight);
      scene.remove(directionalLight);

      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = controlsEnabled;
    }
  }, [controlsEnabled]);

  return (
    <div
      ref={mountRef}
      className={`h-full w-full min-h-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full ${className}`.trim()}
    />
  );
}
