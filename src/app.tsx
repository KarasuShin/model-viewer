import { FileUpload } from "~/components/file-upload";
import { loadModel } from "./lib/utils";
import { useState } from "react";
import { Object3D } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Perf } from "r3f-perf";

export function App() {

  const [object, setObject] = useState<Object3D>()

  const handleFileChange = async (files: File[]) => {
    const file = files[0]
    const model = await loadModel(file)
    setObject(model)
  };

  if (object) {
    return (
      <div className="h-full">
        <Canvas>
          <Stage 
          shadows
           adjustCamera 
           environment={{
            files: 'potsdamer_platz_1k.hdr',
            background: true,
            blur: 0.6
          }}
          >
            <primitive object={object} />
          </Stage>
          <OrbitControls />
          <Perf />
        </Canvas>
        <button className="p-[3px] absolute bottom-4 right-4 cursor-pointer" onClick={() => {
          setObject(undefined)
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            返回
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-80 md:max-w-120 lg:max-w-160 mx-auto min-h-96 border border-dashed bg-white/60 border-neutral-200 rounded-lg">
        <FileUpload onChange={handleFileChange} />
      </div>
    </div>
  )
}