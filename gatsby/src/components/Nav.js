import React from 'react';
import { Link } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Novedades</Link>
        </li>
        <li>
          <Link to="/menu/">Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/parrilleros">Parrilleros</Link>
        </li>
        <li>
          <Link to="/quiero">Quiero mi Asado</Link>
        </li>
      </ul>
    </nav>
  );
}
