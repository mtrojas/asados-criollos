import React from 'react';
import { Link } from 'gatsby';

function SingleAsado({ asado }) {
  return (
    <div>
      <Link to={`/asado/${asado.slug.current}`}>
        <h2>
          <span className="mark">{asado.name}</span>
        </h2>
        <p>{asado.toppings.map((topping) => topping.name).join(', ')}</p>
      </Link>
    </div>
  );
}

export default function AsadoList({ asados }) {
  return (
    <div>
      {asados.map((asado) => (
        <SingleAsado key={asado.id} asado={asado} />
      ))}
    </div>
  );
}
