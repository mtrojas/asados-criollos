import calculateAsadoPrice from './calculateAsadoPrice';

export default function calculateOrderTotal(order, asados) {
  // Loop over each item in the order
  // Calculate the total for that pizza
  // Add that total to the running total
  return order.reduce((runningTotal, singleOrder) => {
    const asado = asados.find(
      (singleAsado) => singleAsado.id === singleOrder.id
    );
    return runningTotal + calculateAsadoPrice(asado.price, singleOrder.size);
  }, 0);
}
