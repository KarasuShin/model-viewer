import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Mesh, MeshPhongMaterial, MeshStandardMaterial } from "three"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function loadModel(file: File) {
  console.log(`upload file: ${file}`)

  const ext = file.name.split('.').pop()

  const blobUrl = URL.createObjectURL(file)

  try {
    if (ext === 'glb') {
      const loader = new (await import('three-stdlib')).GLTFLoader()
      const dracoLoader = new (await import('three-stdlib')).DRACOLoader().setDecoderPath('draco-decoder/')
      loader.setDRACOLoader(dracoLoader)
      const model = await loader.loadAsync(blobUrl)
      dracoLoader.dispose()
      return model.scene
    } else if (ext === 'fbx') {
      const loader = new (await import('three-stdlib')).FBXLoader()
      return (await loader.loadAsync(blobUrl))
    } else if (ext === 'obj') {
      const loader = new (await import('three-stdlib')).OBJLoader()
      return (await loader.loadAsync(blobUrl))
    } else if (ext === 'stl') {
      const loader = new (await import('three-stdlib')).STLLoader()
      const geometry = await loader.loadAsync(blobUrl)
      const material = new MeshPhongMaterial( { color: 0xff9c7c, specular: 0x494949, shininess: 200 } );
      const mesh = new Mesh( geometry, material );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh
    } else if (ext === 'ply') {
      const loader = new (await import('three-stdlib')).PLYLoader()
      const geometry = await loader.loadAsync(blobUrl)
      const material = new MeshStandardMaterial( { color: 0x009cff, flatShading: true } );
      const mesh = new Mesh( geometry, material );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh
    } else if (ext === 'dae') {
      const loader = new (await import('three-stdlib')).ColladaLoader()
      const model = await (await loader.loadAsync(blobUrl)).scene
      model.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
          child.material.flatShading = true
        }
      })
      return model
    } else if (ext === '3ds') {
      const loader = new (await import('three-stdlib')).TDSLoader()
      return (await loader.loadAsync(blobUrl))
    } else if (ext === '3mf') {
      const loader = new (await import('three-stdlib')).ThreeMFLoader()
      return (await loader.loadAsync(blobUrl))
    } else if (ext === '3dm') {
      const loader = new (await import('three-stdlib')).Rhino3dmLoader()
      loader.setLibraryPath('rhino3dm/')
      const model = await loader.loadAsync(blobUrl)
      loader.dispose()
      return model
    } else if (ext === 'amf') {
      const loader = new (await import('three-stdlib')).AMFLoader()
      return (await loader.loadAsync(blobUrl))
    } else if (ext === 'pcd') {
      const loader = new (await import('three-stdlib')).PCDLoader()
      return (await loader.loadAsync(blobUrl))
    } else if (ext === 'drc') {
      const loader = new (await import('three-stdlib')).DRACOLoader().setDecoderPath('draco-decoder/')
      const geometry = await loader.loadAsync(blobUrl)
      geometry.computeVertexNormals()
      const material = new MeshStandardMaterial( { color: 0xa5a5a5 } );
      const mesh = new Mesh( geometry, material );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      loader.dispose()
      return mesh

    }
  } catch (error) {
    console.error(error)
  } finally {
    console.log('finished')
    // URL.revokeObjectURL(blobUrl)
  }
}