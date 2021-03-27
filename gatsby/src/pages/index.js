import React from 'react';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';
import { HomePageGrid } from '../styles/Grids';

function Parrilleros({ parrilleros }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Parrilleros en Acción</span>
      </h2>
      <p>A la espera de tu pedido!</p>
      {!parrilleros && <LoadingGrid count={4} />}
      {parrilleros && !parrilleros?.length && <p>Parrilleros descansando</p>}
      {parrilleros?.length && <ItemGrid items={parrilleros} />}
    </div>
  );
}
function AsadosTop({ asadosTop }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Asados Top</span>
      </h2>
      <p>Nuestros asados más pedidos</p>
      {!asadosTop && <LoadingGrid count={4} />}
      {asadosTop && !asadosTop?.length && <p>Asados descansando</p>}
      {asadosTop?.length && <ItemGrid items={asadosTop} />}
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
