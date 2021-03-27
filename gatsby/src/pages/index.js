import React from 'react';
import useLatestData from '../utils/useLatestData';

function Parrilleros() {
  return (
    <div>
      <p>Parrilleros</p>
    </div>
  );
}
function AsadosTop() {
  return (
    <div>
      <p>AsadosTop</p>
    </div>
  );
}

export default function HomePage() {
  const { parrilleros, asadosTop } = useLatestData();
  return (
    <div className="center">
      <h1>Los Mejores Asados de la Capital!</h1>
      <p>En tu casa, con tus amigos!</p>
      <div>
        <Parrilleros parrilleros={parrilleros} />
        <AsadosTop asadosTop={asadosTop} />
      </div>
    </div>
  );
}
