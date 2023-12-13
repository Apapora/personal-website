import React from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const App = () => {
    const options = {
        particles: {
          color: {
            value: "#ffffff",
          },
          number: {
            value: 160,
            density: {
              enable: true,
              area: 1500,
            },
          },
          links: {
            enable: false,
            opacity: 0.03,
          },
          move: {
            direction: "right",
            speed: 0.05,
          },
          size: {
            value: { min: 1, max: 3 },
          },
          opacity: {
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.05,
            },
          },
        },
        fullScreen: {
          zIndex: 10,
          enable: false // this is the line to change
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
          },
        },
        detectRetina: true,
    }

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="App">
            <Particles is="tsparticles" options={options} init={particlesInit} />
        </div>
    );
};

export default App
