'use client'

import type React from 'react';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type GalleryItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; poster?: string; alt?: string };

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}

interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}

interface InfiniteVideoGalleryProps {
  items: GalleryItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
  externalProgress?: React.MutableRefObject<number>;
}

const cardOffsets = [
  { x: 0.0, y: 0.0 },
  { x: -0.15, y: 0.0 },
  { x: 0.15, y: 0.0 },
  { x: 0.0, y: 0.12 },
  { x: 0.0, y: -0.12 },
  { x: -0.10, y: 0.05 },
  { x: 0.10, y: -0.05 },
  { x: 0.0, y: 0.0 },
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

function createVideoTexture(src: string): THREE.VideoTexture {
  const video = document.createElement('video');
  video.src = src;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.crossOrigin = 'anonymous';
  video.setAttribute('playsinline', '');
  video.play().catch(() => {});

  const texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

function GalleryScene({
  items,
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
}: Omit<InfiniteVideoGalleryProps, 'className' | 'style'>) {
  const isExternallyDriven = !!externalProgress;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const totalItems = items.length;
  const zSpacingValue = zSpacing;
  const startOffset = -6;
  const totalTravel = Math.max(1, totalItems - 1) * zSpacingValue;

  const scrollVelocityRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const autoPlayRef = useRef(!isExternallyDriven);
  const lastInteraction = useRef(Date.now());

  const prevProgressRef = useRef(0);
  const isFirstFrameRef = useRef(true);
  const smoothScrollForce = useRef(0);

  const videoTexturesRef = useRef<(THREE.VideoTexture | null)[]>([]);

  // Separate image srcs for useTexture
  const imageSrcs = useMemo(
    () => items.filter((item) => item.type === 'image').map((item) => item.src),
    [items]
  );
  const imageTextures = useTexture(imageSrcs);

  const materials = useMemo(
    () => Array.from({ length: totalItems }, () => createClothMaterial()),
    [totalItems]
  );

  // Build final textures array: image textures + video textures
  const texturesRef = useRef<(THREE.Texture | null)[]>([]);

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

  // Build texture array whenever items or textures change
  useEffect(() => {
    const newTextures: (THREE.Texture | null)[] = [];
    let imageIndex = 0;

    items.forEach((item, i) => {
      if (item.type === 'video') {
        const existing = videoTexturesRef.current[i];
        if (existing && (existing.source as any)?.data?.src === item.src) {
          newTextures[i] = existing;
        } else {
          const vt = createVideoTexture(item.src);
          videoTexturesRef.current[i] = vt;
          newTextures[i] = vt;
        }
      } else {
        newTextures[i] = imageTextures[imageIndex] || null;
        imageIndex++;
      }
    });

    texturesRef.current = newTextures;
  }, [items, imageTextures]);

  useFrame((state, delta) => {
    const safeDelta = Math.max(delta, 0.001);

    let offset = 0;
    const startHoldProgress = 0.15;
    const zoomStartProgress = 0.90;

    if (isExternallyDriven && externalProgress) {
      const currentProgress = Math.max(0, Math.min(1, externalProgress.current));

      let scrollProgress = 0;
      if (currentProgress > startHoldProgress) {
        if (currentProgress >= zoomStartProgress) {
          scrollProgress = 1.0;
        } else {
          scrollProgress = (currentProgress - startHoldProgress) / (zoomStartProgress - startHoldProgress);
        }
      }
      offset = scrollProgress * totalTravel;

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
    const textures = texturesRef.current;

    for (let i = 0; i < totalItems; i++) {
      const mesh = meshRefs.current[i];
      const material = materials[i];
      if (!mesh || !material) continue;

      const isLastItem = i === totalItems - 1;
      const currentProgress = isExternallyDriven && externalProgress
        ? Math.max(0, Math.min(1, externalProgress.current))
        : (totalTravel > 0 ? scrollOffsetRef.current / totalTravel : 0);

      let z = startOffset - i * zSpacingValue + offset;

      const viewport = state.viewport.getCurrentViewport(state.camera, new THREE.Vector3(0, 0, z));
      const offsetData = cardOffsets[i % cardOffsets.length] || { x: 0, y: 0 };
      let x = offsetData.x * viewport.width;
      let y = offsetData.y * viewport.height;

      let scaleX = 2;
      let scaleY = 2;
      let aspect = 1;
      const texture = textures[i];
      if (texture) {
        if (material.uniforms) {
          material.uniforms.map.value = texture;
        }

        // Play/pause video based on proximity
        const item = items[i];
        if (item.type === 'video') {
          const videoEl = (texture as THREE.VideoTexture).source.data as HTMLVideoElement;
          const absZ = Math.abs(z);
          // Play when close to camera, pause when far
          if (absZ < zSpacingValue * 2) {
            if (videoEl && videoEl.paused) {
              videoEl.play().catch(() => {});
            }
          } else {
            if (videoEl && !videoEl.paused) {
              videoEl.pause();
            }
          }
        }

        const img = (texture as any).image;
        if (img && img.width && img.height) {
          aspect = img.width / img.height;
        }
        const scaleXVal = aspect > 1 ? 2 * aspect : 2;
        const scaleYVal = aspect > 1 ? 2 : 2 / aspect;
        scaleX = scaleXVal;
        scaleY = scaleYVal;
      }

      let opacityMultiplier = 1;

      if (currentProgress >= zoomStartProgress) {
        const t = (currentProgress - zoomStartProgress) / (1 - zoomStartProgress);
        const easeT = t;

        if (isLastItem) {
          x = THREE.MathUtils.lerp(x, 0, easeT);
          y = THREE.MathUtils.lerp(y, 0, easeT);
          z = THREE.MathUtils.lerp(z, -2.0, easeT);

          const viewport = state.viewport.getCurrentViewport(state.camera, new THREE.Vector3(0, 0, z));
          const targetScaleX = Math.max(viewport.width, viewport.height * aspect);
          const targetScaleY = Math.max(viewport.height, viewport.width / aspect);

          scaleX = THREE.MathUtils.lerp(scaleX, targetScaleX, easeT);
          scaleY = THREE.MathUtils.lerp(scaleY, targetScaleY, easeT);
        } else {
          opacityMultiplier = 1 - easeT;
        }
      }

      if (material.uniforms) {
        material.uniforms.time.value = time;
        if (isLastItem && currentProgress >= zoomStartProgress) {
          const t = (currentProgress - zoomStartProgress) / (1 - zoomStartProgress);
          material.uniforms.scrollForce.value = THREE.MathUtils.lerp(smoothScrollForce.current, 0, t);
        } else {
          material.uniforms.scrollForce.value = smoothScrollForce.current;
        }
      }

      mesh.position.set(x, y, z);
      mesh.scale.set(scaleX, scaleY, 1);

      const focalZ = startOffset;
      const dz = z - focalZ;
      let opacity = 1;

      if (isLastItem && currentProgress >= zoomStartProgress) {
        const t = (currentProgress - zoomStartProgress) / (1 - zoomStartProgress);
        if (t <= 0.8) {
          opacity = 1;
        } else {
          const fadeT = (t - 0.8) / 0.2;
          opacity = 1 - fadeT;
        }
      } else {
        if (dz > 0) {
          const fadeStart = zSpacingValue * 0.2;
          const fadeEnd = zSpacingValue * 0.8;
          if (dz >= fadeEnd) opacity = 0;
          else if (dz > fadeStart) {
            opacity = 1 - (dz - fadeStart) / (fadeEnd - fadeStart);
          }
        } else {
          const fadeStart = -zSpacingValue * 1.8;
          const fadeEnd = -zSpacingValue * 0.8;
          if (dz <= fadeStart) opacity = 0;
          else if (dz < fadeEnd) {
            opacity = (dz - fadeStart) / (fadeEnd - fadeStart);
          }
        }
      }
      opacity = Math.max(0, Math.min(1, opacity)) * opacityMultiplier;

      let blur = 0;
      if (isLastItem && currentProgress >= zoomStartProgress) {
        blur = 0;
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

  if (items.length === 0) return null;

  return (
    <>
      {Array.from({ length: totalItems }).map((_, i) => {
        const material = materials[i];
        const initialZ = startOffset - i * zSpacingValue;
        return (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            position={[0, 0, initialZ]}
            scale={[2, 2, 1]}
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

function FallbackGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#111111] p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="w-full h-32 overflow-hidden rounded-lg bg-[#222222]">
            {item.type === 'video' ? (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <img src={item.src} alt={item.alt || ''} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InfiniteVideoGallery({
  items,
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
}: InfiniteVideoGalleryProps) {
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
        <FallbackGallery items={items} />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <GalleryScene
          items={items}
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
