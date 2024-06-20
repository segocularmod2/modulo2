import React, { useEffect, useRef, useState } from 'react';

const gazeevents = [
  { docX: 100, docY: 100, time: 1718751444024, state: 0, duration: 33 },
  { docX: 120, docY: 120, time: 1718751449727, state: 0, duration: 123 },
  { docX: 130, docY: 130, time: 1718751449837, state: 0, duration: 110 },
  { docX: 140, docY: 140, time: 1718751450032, state: 0, duration: 123 },
  { docX: 696, docY: 335, time: 1718751451000, state: 0, duration: 150 },
  // más puntos...
];

const GazeEventChecker = () => {
  const buttonRef = useRef(null);
  const [clickPositions, setClickPositions] = useState([]);
  const [matchingEventsArray, setMatchingEventsArray] = useState([]);  // Estado para almacenar eventos de mirada coincidentes
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const clickPosition = { x: event.clientX, y: event.clientY };
      setClickPositions(prevPositions => [...prevPositions, clickPosition]);

      const rect = buttonRef.current?.getBoundingClientRect();

      if (rect) {
        const isClickInsideButton = clickPosition.x >= rect.left && clickPosition.x <= rect.right && clickPosition.y >= rect.top && clickPosition.y <= rect.bottom;
        
        if (isClickInsideButton) {
          const matchingEvents = gazeevents.filter((gazeEvent) => {
            return gazeEvent.docX >= rect.left && gazeEvent.docX <= rect.right && gazeEvent.docY >= rect.top && gazeEvent.docY <= rect.bottom;
          });

          if (matchingEvents.length > 0) {
            setMatchingEventsArray(prevEvents => [...prevEvents, ...matchingEvents]);  // Agrega eventos coincidentes al array
          }

          const eventsMessage = matchingEvents.length > 0
            ? `Hay eventos de mirada dentro del área del botón: ${JSON.stringify(matchingEvents)}`
            : 'No hay eventos de mirada dentro del área del botón.';

          setMessage(`Clicked at: X=${clickPosition.x}, Y=${clickPosition.y} | ${eventsMessage}`);
        } else {
          setMessage(`Clicked at: X=${clickPosition.x}, Y=${clickPosition.y} | El clic fue fuera del botón.`);
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <button ref={buttonRef}>Botón de prueba</button>
      <div>{message}</div>
      <div>Clics registrados:</div>
      {clickPositions.map((pos, index) => (
        <div key={index}>Clic {index + 1}: X={pos.x}, Y={pos.y}</div>
      ))}
      <div>Eventos de mirada coincidentes:</div>
      {matchingEventsArray.map((event, index) => (
        <div key={index}>Evento {index + 1}: X={event.docX}, Y={event.docY}</div>
      ))}
    </div>
  );
};

export default GazeEventChecker;
