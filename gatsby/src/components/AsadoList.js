import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

function SingleAsado({ asado }) {
  return (
    <div>
      <Link to={`/asado/${asado.slug.current}`}>
        <h2>
          <span className="mark">{asado.name}</span>
        </h2>
        <p>{asado.toppings.map((topping) => topping.name).join(' | ')}</p>
        <Img fluid={asado.image.asset.fluid} alt={asado.name} />
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
