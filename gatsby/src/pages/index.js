import React from 'react';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';

function Parrilleros({ parrilleros }) {
  return (
    <div>
      {!parrilleros && <LoadingGrid count={4} />}
      {parrilleros && !parrilleros?.length && <p>Parrilleros descansando</p>}
    </div>
  );
}
function AsadosTop({ asadosTop }) {
  return (
    <div>
      {!asadosTop && <LoadingGrid count={4} />}
      {asadosTop && !asadosTop?.length && <p>Asados descansando</p>}
    </div>
  );
}

export default function HomePage() {
  const { parrilleros, asadosTop } = useLatestData();
  return (
    <div className="center">
      <h1>Los Mejores Asados de la Capital!</h1>
      <p>En tu casa, con tus amigos!</p>
      <HomePageGrid>
        <Parrilleros parrilleros={parrilleros} />
        <AsadosTop asadosTop={asadosTop} />
      </HomePageGrid>
    </div>
  );
}
