import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { frag, vert } from "./shader";
import { Layout } from "./Layout";

export function useAspect(
  width: number,
  height: number,
  factor: number = 1
): [number, number, number] {
  const v = useThree((state) => state.viewport);
  const adaptedHeight =
    height * (v.aspect > width / height ? v.width / width : v.height / height);
  const adaptedWidth =
    width * (v.aspect > width / height ? v.width / width : v.height / height);
  return [adaptedWidth * factor, adaptedHeight * factor, 1];
}

const Scene = () => {
  const [texture, setTexture] = useState<THREE.VideoTexture>();

  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;

    if (video) {
      console.log(video);

      video.play();
      const videoTexture = new THREE.VideoTexture(video);
      setTexture(videoTexture);
    }
  }, []);

  const [videoAspectW, videoAspectH] = useAspect(1920, 1080);

  const { material } = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: {
          value: texture,
        },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        u_videoAspect: {
          value: new THREE.Vector2(videoAspectW, videoAspectH),
        },
        time: { value: 1.0 },
      },
      vertexShader: vert,
      fragmentShader: frag,
    });

    return {
      material,
    };
  }, [texture]);

  useFrame(() => {
    material.uniforms.u_resolution.value = [videoAspectW, videoAspectH];
  });

  return (
    <mesh scale={[videoAspectW, videoAspectH, 1]} material={material}>
      <planeGeometry></planeGeometry>
    </mesh>
  );
};

export default function Page() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute z-50 flex h-screen w-full items-center justify-center text-[white]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-end space-x-2 md:text-7xl text-5xl  lg:text-8xl  xl:text-9xl ">
            <div
              style={{
                fontStyle: "italic",
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Lumen
            </div>
            <div className="">Lab</div>
          </div>

          <div
            className="mt-5 rounded-full bg-white px-4 py-1 text-sm text-black"
            data-code
          >
            Hello World
          </div>
        </div>
      </div>

      <video id="video" muted autoPlay hidden loop src="video.webm"></video>

      <Layout></Layout>
      <Canvas className="absolute inset-0 h-screen">
        <Scene></Scene>
      </Canvas>
    </div>
  );
}
