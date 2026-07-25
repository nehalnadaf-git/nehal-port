'use client'

import type React from 'react';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}

interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
  /** When provided, the gallery is driven by external scroll progress (0–1).
   *  Internal wheel/keyboard/autoplay are disabled. */
  externalProgress?: React.MutableRefObject<number>;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

// How many full depth-range cycles the gallery travels over progress 0 → 1
const SCROLL_CYCLES = 3;
// Normalized layout offsets (percentage of current viewport width/height at Z-depth)
// to prevent cropping on mobile while creating dynamic 3D stagger effects.
// Values range from 10% to 15% (0.10 to 0.15) along a single cardinal axis,
// avoiding extreme diagonal corners as requested.
const cardOffsets = [
  { x: 0.0, y: 0.0 },     // Image 0: Centered (entrance hold)
  { x: -0.15, y: 0.0 },   // Image 1: 15% to the left
  { x: 0.15, y: 0.0 },    // Image 2: 15% to the right
  { x: 0.0, y: 0.12 },    // Image 3: 12% up
  { x: 0.0, y: -0.12 },   // Image 4: 12% down
  { x: -0.10, y: 0.05 },  // Image 5: Slightly left & slightly up (minor diagonal)
  { x: 0.10, y: -0.05 },  // Image 6: Slightly right & slightly down (minor diagonal)
  { x: 0.0, y: 0.0 },     // Image 7: Centered (exit cover zoom)
];

const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

function GalleryScene({
  images,
  speed = 1,
  zSpacing = 12,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0,
  },
  externalProgress,
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
  const isExternallyDriven = !!externalProgress;

  // Ref array for direct mesh mutations
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const normalizedImages = useMemo(
    () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );

  const totalImages = normalizedImages.length;
  const zSpacingValue = zSpacing;
  const startOffset = -6; // Camera focal depth for active images
  const totalTravel = Math.max(1, totalImages - 1) * zSpacingValue;

  // Internal velocity and offsets (only used when NOT externally driven)
  const scrollVelocityRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const autoPlayRef = useRef(!isExternallyDriven);
  const lastInteraction = useRef(Date.now());

  // External progress tracking
  const prevProgressRef = useRef(0);
  const isFirstFrameRef = useRef(true);
  const smoothScrollForce = useRef(0);

  const textures = useTexture(normalizedImages.map((img) => img.src));

  const materials = useMemo(
    () => Array.from({ length: totalImages }, () => createClothMaterial()),
    [totalImages]
  );

  // Internal wheel/keyboard — only when NOT externally driven
  useEffect(() => {
    if (isExternallyDriven) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollVelocityRef.current += event.deltaY * 0.01 * speed;
      autoPlayRef.current = false;
      lastInteraction.current = Date.now();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        scrollVelocityRef.current -= 2 * speed;
        autoPlayRef.current = false;
        lastInteraction.current = Date.now();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        scrollVelocityRef.current += 2 * speed;
        autoPlayRef.current = false;
        lastInteraction.current = Date.now();
      }
    };

    const canvas = document.querySelector('canvas');
    if (canvas) canvas.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    const interval = setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) autoPlayRef.current = true;
    }, 1000);

    return () => {
      if (canvas) canvas.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [isExternallyDriven, speed]);

  useFrame((state, delta) => {
    const safeDelta = Math.max(delta, 0.001); // Guard against zero-delta frames

    let offset = 0;
    const startHoldProgress = 0.15;
    const zoomStartProgress = 0.90;

    if (isExternallyDriven && externalProgress) {
      const currentProgress = Math.max(0, Math.min(1, externalProgress.current));
      
      // Stage scroll hold: hold static at start, scroll normally in the middle, zoom at end
      let scrollProgress = 0;
      if (currentProgress > startHoldProgress) {
        if (currentProgress >= zoomStartProgress) {
          scrollProgress = 1.0;
        } else {
          scrollProgress = (currentProgress - startHoldProgress) / (zoomStartProgress - startHoldProgress);
        }
      }
      offset = scrollProgress * totalTravel;

      // Smooth scroll force for cloth shader (visual only)
      let zDelta = 0;
      if (isFirstFrameRef.current) {
        isFirstFrameRef.current = false;
      } else {
        zDelta = offset - prevProgressRef.current * totalTravel;
      }
      prevProgressRef.current = scrollProgress;

      const progressVelocity = Math.max(-15, Math.min(15, zDelta / safeDelta));
      smoothScrollForce.current += (progressVelocity * 0.15 - smoothScrollForce.current) * 0.1;
    } else {
      if (autoPlayRef.current) scrollVelocityRef.current += 0.3 * safeDelta;
      scrollVelocityRef.current *= 0.95;

      scrollOffsetRef.current = Math.max(0, Math.min(totalTravel, scrollOffsetRef.current + scrollVelocityRef.current * safeDelta * 10));
      offset = scrollOffsetRef.current;
      smoothScrollForce.current = scrollVelocityRef.current;
    }

    const time = state.clock.getElapsedTime();

    // Mutate meshes directly in Three.js for 60+ FPS smoothness without React re-render lags
    for (let i = 0; i < totalImages; i++) {
      const mesh = meshRefs.current[i];
      const material = materials[i];
      if (!mesh || !material) continue;

      const isLastImage = i === totalImages - 1;
      const zoomStartProgress = 0.90; // Zoom starts at 90% of scroll progress for a slower, more gradual zoom
      const currentProgress = isExternallyDriven && externalProgress 
        ? Math.max(0, Math.min(1, externalProgress.current)) 
        : (totalTravel > 0 ? scrollOffsetRef.current / totalTravel : 0);

      // Compute mathematical position (linear, non-looping layout with subtle X/Y offsets)
      let z = startOffset - i * zSpacingValue + offset;

      // Get responsive viewport boundaries at depth z to compute percentage offsets dynamically
      const viewport = state.viewport.getCurrentViewport(state.camera, new THREE.Vector3(0, 0, z));
      const offsetData = cardOffsets[i % cardOffsets.length] || { x: 0, y: 0 };
      let x = offsetData.x * viewport.width;
      let y = offsetData.y * viewport.height;

      // Set scale and map texture
      let scaleX = 2;
      let scaleY = 2;
      let aspect = 1;
      const texture = textures[i];
      if (texture) {
        if (material.uniforms) {
          material.uniforms.map.value = texture;
        }
        if (texture.image && texture.image.width && texture.image.height) {
          aspect = texture.image.width / texture.image.height;
        }
        const scaleXVal = aspect > 1 ? 2 * aspect : 2;
        const scaleYVal = aspect > 1 ? 2 : 2 / aspect;
        scaleX = scaleXVal;
        scaleY = scaleYVal;
      }

      let opacityMultiplier = 1;

      // Apply special full zoom to the last image when scroll reaches near the end
      if (currentProgress >= zoomStartProgress) {
        const t = (currentProgress - zoomStartProgress) / (1 - zoomStartProgress); // Normalized [0, 1] zoom progress
        const easeT = t; // Linear zoom matches scroll speed exactly, keeping it smooth and gradual
        
        if (isLastImage) {
          // Slide to center, fly close to camera
          x = THREE.MathUtils.lerp(x, 0, easeT);
          y = THREE.MathUtils.lerp(y, 0, easeT);
          z = THREE.MathUtils.lerp(z, -2.0, easeT); // Zoom depth
          
          // Get responsive world size of viewport at depth z to cover the screen exactly
          const viewport = state.viewport.getCurrentViewport(state.camera, new THREE.Vector3(0, 0, z));
          const targetScaleX = Math.max(viewport.width, viewport.height * aspect);
          const targetScaleY = Math.max(viewport.height, viewport.width / aspect);
          
          scaleX = THREE.MathUtils.lerp(scaleX, targetScaleX, easeT);
          scaleY = THREE.MathUtils.lerp(scaleY, targetScaleY, easeT);
        } else {
          // Fade out all other images
          opacityMultiplier = 1 - easeT;
        }
      }

      // Update shader uniforms
      if (material.uniforms) {
        material.uniforms.time.value = time;
        if (isLastImage && currentProgress >= zoomStartProgress) {
          const t = (currentProgress - zoomStartProgress) / (1 - zoomStartProgress);
          material.uniforms.scrollForce.value = THREE.MathUtils.lerp(smoothScrollForce.current, 0, t); // Flatten cloth waving as it zooms to fill the screen
        } else {
          material.uniforms.scrollForce.value = smoothScrollForce.current;
        }
      }

      mesh.position.set(x, y, z);
      mesh.scale.set(scaleX, scaleY, 1);

      // Compute opacity (relative to focal depth and zSpacingValue)
      const focalZ = startOffset;
      const dz = z - focalZ;
      let opacity = 1;

      if (isLastImage && currentProgress >= zoomStartProgress) {
        const t = (currentProgress - zoomStartProgress) / (1 - zoomStartProgress);
        if (t <= 0.8) {
          opacity = 1; // Hold full opacity during zoom
        } else {
          // Fade to black during the last 20% of zoom progress
          const fadeT = (t - 0.8) / 0.2;
          opacity = 1 - fadeT;
        }
      } else {
        if (dz > 0) {
          // Passing camera/foreground fade-out
          const fadeStart = zSpacingValue * 0.2;
          const fadeEnd = zSpacingValue * 0.8;
          if (dz >= fadeEnd) opacity = 0;
          else if (dz > fadeStart) {
            opacity = 1 - (dz - fadeStart) / (fadeEnd - fadeStart);
          }
        } else {
          // Far away/background fade-in
          const fadeStart = -zSpacingValue * 1.8;
          const fadeEnd = -zSpacingValue * 0.8;
          if (dz <= fadeStart) opacity = 0;
          else if (dz < fadeEnd) {
            opacity = (dz - fadeStart) / (fadeEnd - fadeStart);
          }
        }
      }
      opacity = Math.max(0, Math.min(1, opacity)) * opacityMultiplier;

      // Compute blur (sharp in focus, blurry far away / extreme close-ups)
      let blur = 0;
      if (isLastImage && currentProgress >= zoomStartProgress) {
        blur = 0; // Maintain sharp focus while zooming
      } else {
        if (dz > 0) {
          const blurStart = 0;
          const blurEnd = zSpacingValue * 0.8;
          if (dz >= blurEnd) blur = blurSettings.maxBlur;
          else {
            blur = blurSettings.maxBlur * ((dz - blurStart) / (blurEnd - blurStart));
          }
        } else {
          const blurStart = -zSpacingValue * 0.8;
          const blurEnd = -zSpacingValue * 1.8;
          if (dz <= blurEnd) blur = blurSettings.maxBlur;
          else if (dz < blurStart) {
            blur = blurSettings.maxBlur * ((dz - blurStart) / (blurEnd - blurStart));
          }
        }
      }
      blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

      if (material.uniforms) {
        material.uniforms.opacity.value = opacity;
        material.uniforms.blurAmount.value = blur;
      }
    }
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      {Array.from({ length: totalImages }).map((_, i) => {
        const material = materials[i];
        const initialZ = startOffset - i * zSpacingValue;
        const texture = textures[i];
        
        let aspect = 1;
        if (texture?.image && texture.image.width && texture.image.height) {
          aspect = texture.image.width / texture.image.height;
        }
        const scaleX = aspect > 1 ? 2 * aspect : 2;
        const scaleY = aspect > 1 ? 2 : 2 / aspect;
        return (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            position={[0, 0, initialZ]}
            scale={[scaleX, scaleY, 1]}
            material={material}
            onPointerEnter={() => {
              if (material.uniforms) material.uniforms.isHovered.value = 1.0;
            }}
            onPointerLeave={() => {
              if (material.uniforms) material.uniforms.isHovered.value = 0.0;
            }}
          >
            <planeGeometry args={[1, 1, 32, 32]} />
          </mesh>
        );
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Fallback for no-WebGL browsers
 * ────────────────────────────────────────────────────────────────────────── */
function FallbackGallery({ images }: { images: ImageItem[] }) {
  const normalizedImages = useMemo(
    () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#111111] p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {normalizedImages.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} className="w-full h-32 object-cover rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Public component
 * ────────────────────────────────────────────────────────────────────────── */
export default function InfiniteGallery({
  images,
  className = 'h-96 w-full',
  style,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4, end: 0.43 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
  speed,
  zSpacing,
  visibleCount,
  externalProgress,
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={className} style={style}>
        <FallbackGallery images={images} />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <GalleryScene
          images={images}
          speed={speed}
          zSpacing={zSpacing}
          visibleCount={visibleCount}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
          externalProgress={externalProgress}
        />
      </Canvas>
    </div>
  );
}
