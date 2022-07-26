import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Color } from "three";

const Rings = () => {
  const itemsRef = useRef([]);

  //useFrame will run every time there's a new frame to render
  //expect this function to rnn 60 frame per second
  useFrame((state) => {
    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      //[-7, 6] 14 elements
      let z = (i - 7) * 3.5; //if not * 3.5, every ring would be spaced apart by one unit
      mesh.position.set(0, 0, -z);

      let dist = Math.abs(z); //record how far away from the center of the scene this ring is
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04); //gets bigger, this one will get smaller

      //fade out the futher away the rings are
      let colorScale = 1; //will be one until the distance of screen is > 2
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10; //modulate the intensity of the color scale
        //if value of distance is 12: statement will resolve to 1, colorScale = 0, means ring has been correctly faded out
        //if distance is 2, (Math.min(dist, 12) - 2) / 10 will resolve to zero, colorScale = 1
      }
      colorScale *= 0.5;

      //alternating color
      if (i % 2 == 1) {
        mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(0.5);
      } else {
        mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(0.5);
      }
    }
  });

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          {/* radius,  radius of tubular, how many triangle we going to draw*/}
          <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
          {/* emissive is the color of the light sources */}
          {/* color={[0, 0, 0]} is making sure not reflecting any object in the scene */}
        </mesh>
      ))}
    </>
  );
};

export default Rings;
