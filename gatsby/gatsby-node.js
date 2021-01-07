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
  console.log(data);
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

export async function createPages(params) {
  // Create pages dynamically
  // 1. Asados
  await turnAsadosIntoPages(params);
  // 2. Toppings
  // 3. Parrilleros
}
