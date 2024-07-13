// GazeEventChecker.jsx
import React from 'react';
import  data  from './DataFetcher.jsx';
import useGazeEvent from './useGazeEvent'; // Asumiendo que los datos se pasan como props o están en contexto/global state

const gazeevents = [
  { docX: 100, docY: 100, time: 1718751444024, state: 0, duration: 33 },
  { docX: 120, docY: 120, time: 1718751449727, state: 0, duration: 123 },
  { docX: 621, docY: 384, time: 1718751451000, state: 0, duration: 150 },
  // Más puntos simulados según necesites
];


const GazeEventChecker = () => {

  const { clickPositions, matchingEventsArray, message } = useGazeEvent(gazeevents);


  const puntos2 = data;
  const puntos = data.slice(0, 3); // Tomamos solo los tres primeros elementos

  return (
    <div>
      <div>{message}</div>
      <div>Clics registrados:</div>
      {clickPositions.map((pos, index) => (
        <div key={index}>Clic {index + 1}: X={pos.x}, Y={pos.y}</div>
      ))}
      <div>Eventos de mirada coincidentes:</div>
      {matchingEventsArray.map((event, index) => (
        <div key={index}>Evento {index + 1}: X={event.docX}, Y={event.docY}</div>
      ))}
      <pre>{JSON.stringify(puntos, null, 2)}</pre>

    </div>
  );
};

export default GazeEventChecker;
