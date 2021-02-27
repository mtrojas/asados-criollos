import { useState } from 'react';

export default function useAsado({ asados, inputs }) {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState([]);
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
  // TODO 4. Send this data to a serverless function when they check out
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
