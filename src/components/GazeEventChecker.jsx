// src/components/GazeEventChecker.jsx

import React, { useEffect, useRef } from 'react';

const gazeevents = [
  { docX: -4, docY: 319, time: 1718751444024, state: 0, duration: 33 },
  { docX: -6, docY: 227, time: 1718751449727, state: 0, duration: 123 },
  { docX: -10, docY: 204, time: 1718751449837, state: 0, duration: 110 },
  { docX: -201, docY: 207, time: 1718751450032, state: 0, duration: 123 },
  // más puntos...
];

const GazeEventChecker = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const rect = event.target.getBoundingClientRect();
      const clickPosition = { x: event.clientX, y: event.clientY };
      console.log("Click Position: ", clickPosition);
      console.log("Element Position: ", rect);

      // Comparar la posición del clic con gazeevents
      const matchingEvents = gazeevents.filter((point) => {
        const pointX = point.docX + window.scrollX; // Ajusta para la posición de desplazamiento
        const pointY = point.docY + window.scrollY; // Ajusta para la posición de desplazamiento

        return (
          pointX >= rect.left &&
          pointX <= rect.right &&
          pointY >= rect.top &&
          pointY <= rect.bottom
        );
      });

      console.log("Matching gaze events for this click: ", matchingEvents);
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', handleClick);
      console.log('Button found and event listener added');
    } else {
      console.log('Button not found');
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleClick);
        console.log('Event listener removed');
      }
    };
  }, []);

  useEffect(() => {
    const button = buttonRef.current; // Selecciona el botón para mostrar su posición inicial
    if (button) {
      const rect = button.getBoundingClientRect();
      console.log(`Initial Button Position: `, rect);
    } else {
      console.log('Button not found during initial position check');
    }
  }, []);

  return <button ref={buttonRef}>Botón de prueba</button>;
};

export default GazeEventChecker;
