import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // Asados Top
  const [asadosTop, setAsadosTop] = useState();
  // Parrilleros
  const [parrilleros, setParrilleros] = useState();
  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(function () {
    console.log('FETCHING DATA');
    // When the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              parrillero {
                ${deets}
              }
              asadosTop {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: Check for errors
        // Set the data to state
        console.log(res.data);
        setAsadosTop(res.data.StoreSettings.asadosTop);
        setParrilleros(res.data.StoreSettings.parrillero);
      })
      .catch((err) => {
        console.log('SHOOT');
        console.log(err);
      });
  }, []);
  return {
    parrilleros,
    asadosTop,
  };
}
