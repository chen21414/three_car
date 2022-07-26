import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { CubeCamera, OrbitControls, Environment } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import Ground from "./Ground";
import { Car } from "./Car";
import Rings from "./Rings";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault for={50} position={[3, 2, 5]} />

      {/* let color = new Color(0,0,0)*/}
      <color args={[0, 0, 0]} attach="background" />
      {/* dark background */}

      {/* to reflect ring light on car */}
      {/* cube camera by default at the center of the scene */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          // texture is what cubecamera rendered on that frame
          <>
            {/* default environment map for all materials in our scene includes car*/}
            <Environment map={texture} />
            {/* every other element of our scene is rendered except car*/}
            <Car />
          </>
        )}
      </CubeCamera>

      <Rings />
      {/* let spotlight = new SpotLight() 
          spotlight.intensity = 1.5;
          spotlight.position.set(...)
      */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <div className="canvas">
        <Canvas shadows>
          <CarShow />
        </Canvas>
      </div>
    </Suspense>
  );
}

export default App;
