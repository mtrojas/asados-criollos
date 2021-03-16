import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function useAsado({ asados, values }) {
  // 1. Create some state to hold our order
  // We got rid of this line because we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. Make a function to add things to order
  function addToOrder(orderedAsado) {
    setOrder([...order, orderedAsado]);
  }
  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // Everything before the item we want to remove
      ...order.slice(0, index),
      // Everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // This is the function that is run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessage(null);
    // Gather all the data that needs to be sent
    const body = {
      order: attachNamesAndPrices(order, asados),
      total: formatMoney(calculateOrderTotal(order, asados)),
      name: values.name,
      email: values.email,
    };
    // 4. Send this data to the serverless function when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // Check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
