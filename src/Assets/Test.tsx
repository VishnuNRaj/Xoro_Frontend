import CreativeEditorSDK from '@cesdk/cesdk-js';
import React,{ useEffect, useRef, useState } from 'react';
const config = {
  license: 'mtLT-_GJwMhE7LDnO8KKEma7qSuzWuDxiKuQcxHKmz3fjaXWY2lT3o3Z2VdL5twm',
  userId: 'guides-user',
  // Enable local uploads in Asset Library
  callbacks: { onUpload: 'local' }
};


const CreativeEditorSDKComponent:React.FC = () => {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  useEffect(() => {
    if (!cesdk_container.current) return;


    let cleanedUp = false;
    let instance;
    CreativeEditorSDK.create(cesdk_container.current, config).then(
      async (_instance) => {
        instance = _instance;
        if (cleanedUp) {
          instance.dispose();
          return;
        }


        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        await Promise.all([
          instance.addDefaultAssetSources(),
          instance.addDemoAssetSources({ sceneMode: 'Design' })
        ]);
        await instance.createDesignScene();


        setCesdk(instance);
      }
    );
    const cleanup = () => {
      cleanedUp = true;
      instance?.dispose();
      setCesdk(null);
    };
    return cleanup;
  }, [cesdk_container]);
  return (
    <div
      ref={cesdk_container}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

export default CreativeEditorSDKComponent