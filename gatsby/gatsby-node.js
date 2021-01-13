import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnAsadosIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const asadoTemplate = path.resolve('./src/templates/Asado.js');
  // 2. Query all asados
  const { data } = await graphql(`
    query {
      asados: allSanityAsado {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each asado and create a page for that asado
  data.asados.nodes.forEach((asado) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `asado/${asado.slug.current}`,
      component: asadoTemplate,
      context: {
        slug: asado.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/menu.js');
  // 2. Query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // 3. Create page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to asado.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch a list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // 2. Loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for each beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  // 3. Create a node for that beer
}

export async function sourceNodes(params) {
  // Fetch a list of beers and source them into our gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically

  await Promise.all([
    // 1. Asados
    turnAsadosIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
  ]);

  // 3. Parrilleros
}
