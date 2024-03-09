import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
//import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const App = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      await loadFull(engine);
      //await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      particles: {
        number: {
            value: 10,
            density: {
                enable: false,
            },
        },
        color: {
            value: "#fff",
        },
        shape: {
            type: "star",
            options: {
                star: {
                    sides: 5,
                },
            },
        },
        opacity: {
            value: 0.8,
        },
        size: {
            value: 4,
        },
        rotate: {
            value: {
                min: 0,
                max: 360,
            },
            direction: "clockwise",
            animation: {
                enable: true,
                speed: 5,
                sync: false,
            },
        },
        links: {
            enable: true,
            distance: 600,
            color: "#ffffff",
            opacity: 0.4,
            width: 2,
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab",
            },
            onClick: {
                enable: true,
                mode: "bubble",
            },
        },
        modes: {
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                    color: "#f00",
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                color: "#ffff00",
            },
            repulse: {
                distance: 200,
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
        },
    },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default App