import { useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function useAsado({ asados, inputs }) {
  // 1. Create some state to hold our order
  // We got rid of this line because we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);

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
