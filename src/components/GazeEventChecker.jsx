import React, { useEffect, useRef, useState } from 'react';

const gazeevents = [
  { docX: 100, docY: 100, time: 1718751444024, state: 0, duration: 33 },
  { docX: 120, docY: 120, time: 1718751449727, state: 0, duration: 123 },
  { docX: 696, docY: 335, time: 1718751451000, state: 0, duration: 150 },
  // más puntos...
];

const GazeEventChecker = () => {
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const [clickPositions, setClickPositions] = useState([]);
  const [matchingEventsArray, setMatchingEventsArray] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const clickPosition = { x: event.clientX, y: event.clientY };
      setClickPositions(prevPositions => [...prevPositions, clickPosition]);

      // Verificar clics para cada botón
      [button1Ref, button2Ref].forEach((ref, index) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect && clickPosition.x >= rect.left && clickPosition.x <= rect.right && clickPosition.y >= rect.top && clickPosition.y <= rect.bottom) {
          const matchingEvents = gazeevents.filter(gazeEvent => {
            return gazeEvent.docX >= rect.left && gazeEvent.docX <= rect.right && gazeEvent.docY >= rect.top && gazeEvent.docY <= rect.bottom;
          });

          if (matchingEvents.length > 0) {
            setMatchingEventsArray(matchingEvents); // Actualiza solo con los eventos coincidentes más recientes
            setMessage(`Clicked at: X=${clickPosition.x}, Y=${clickPosition.y} | Hay eventos de mirada dentro del área del botón ${index + 1}: ${JSON.stringify(matchingEvents)}`);
          } else {
            setMessage(`Clicked at: X=${clickPosition.x}, Y=${clickPosition.y} | No hay eventos de mirada dentro del área del botón ${index + 1}.`);
          }
        }
      });
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <button ref={button1Ref}>Botón 1</button>
      <button ref={button2Ref}>Botón 2</button>
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
