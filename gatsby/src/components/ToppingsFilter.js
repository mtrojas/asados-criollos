import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

function countAsadosInToppings(asados) {
  // Return the asados with count
  const counts = asados
    .map((asado) => asado.toppings)
    .flat()
    .reduce((acc, topping) => {
      // Check if this is an existing topping
      const existingTopping = acc[topping.id];
      // If it is, increment by 1
      if (existingTopping) {
        console.log('Existing Topping', existingTopping.name);
        existingTopping.count += 1;
      } else {
        console.log('New Topping', topping.name);
        // Otherwise, create a new entry in our accumulator and set it to 1
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // Sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter() {
  // Get a list of all the toppings
  // Get a list of all the Asados with their toppings
  const { toppings, asados } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          vegetarian
          id
        }
      }
      asados: allSanityAsado {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // Count how many Asados are in each topping
  const toppingsWithCounts = countAsadosInToppings(asados.nodes);
  console.log(toppingsWithCounts);
  // Loop over the list of toppings and display the topping and the count of pizzas with that topping

  // Link it up
  return (
    <ToppingStyles>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  );
}
