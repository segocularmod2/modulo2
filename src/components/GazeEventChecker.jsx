import React, { useEffect, useRef, useState } from 'react';

const gazeevents = [
  { docX: 100, docY: 100, time: 1718751444024, state: 0, duration: 33 },
  { docX: 120, docY: 120, time: 1718751449727, state: 0, duration: 123 },
  { docX: 130, docY: 130, time: 1718751449837, state: 0, duration: 110 },
  { docX: 140, docY: 140, time: 1718751450032, state: 0, duration: 123 },
  { docX: 566, docY: 358, time: 1718751451000, state: 0, duration: 150 },
  // más puntos...
];

const GazeEventChecker = () => {
  const buttonRef = useRef(null);
  const [buttonRect, setButtonRect] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);
    }
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const clickPosition = { x: event.clientX, y: event.clientY };
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);

      // Registro de la posición exacta del clic
      const clickMessage = `Clicked at: X=${clickPosition.x}, Y=${clickPosition.y}`;

      // Filtra eventos de mirada que caigan dentro del área del botón
      const matchingEvents = gazeevents.filter((gazeEvent) => {
        return (
          gazeEvent.docX >= rect.left &&
          gazeEvent.docX <= rect.right &&
          gazeEvent.docY >= rect.top &&
          gazeEvent.docY <= rect.bottom
        );
      });

      const eventsMessage = matchingEvents.length > 0
        ? `Hay eventos de mirada dentro del área del botón: ${JSON.stringify(matchingEvents)}`
        : 'No hay eventos de mirada dentro del área del botón.';

      // Combinar mensajes
      setMessage(`${clickMessage} | ${eventsMessage}`);
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleClick);
      }
    };
  }, [buttonRect]);

  return (
    <div>
      <button ref={buttonRef}>Botón de prueba</button>
      <div>{message}</div>
    </div>
  );
};

export default GazeEventChecker;
