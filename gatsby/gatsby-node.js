import path from 'path';

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
  console.log('Turning the Toppings into Pages!!');
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
  console.log(data);
  // 3. Create page for that topping
  data.toppings.nodes.forEach((topping) => {
    console.log(`creating page for topping`, topping.name);
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
