import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const App = () => {
  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Use loadSlim for a lighter bundle
    });
  }, []);

  // Particle configuration (updated for v3)
  const options = {
    particles: {
      color: {
        value: "#ffffff",
      },
      number: {
        value: 160,
        density: {
          enable: true,
          area: 1500, // Changed from value_area to area
        },
      },
      links: {
        enable: false,
        opacity: 0.03,
      },
      move: {
        direction: "right",
        enable: true, // Explicitly enable movement
        speed: 0.05,
      },
      size: {
        value: { min: 1, max: 3 },
      },
      opacity: {
        value: { min: 0.05, max: 1 }, // Updated for v3
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.05,
        },
      },
    },
    fullScreen: {
      zIndex: 10,
      enable: false, // Keeps particles within container
    },
    interactivity: {
      events: {
        onClick: { // Changed from onclick to onClick
          enable: true,
          mode: "push",
        },
      },
      modes: {
        push: {
          quantity: 1, // Changed from particles_nb to quantity
        },
      },
    },
    detectRetina: true,
  };

  // Optional callback for when particles are loaded
  const particlesLoaded = (container) => {
    console.log("Particles loaded", container);
  };

  return (
    <div className="App">
      <Particles
        id="tsparticles" // Fixed from is="tsparticles"
        options={options}
        particlesLoaded={particlesLoaded}
      />
    </div>
  );
};

export default App;
