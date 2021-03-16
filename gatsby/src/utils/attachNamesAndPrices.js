import calculateAsadoPrice from './calculateAsadoPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, asados) {
  return order.map((item) => {
    const asado = asados.find((asado) => asado.id === item.id);
    return {
      ...item,
      name: asado.name,
      thumbnail: asado.image.asset.fluid.src,
      price: formatMoney(calculateAsadoPrice(asado.price, item.size)),
    };
  });
}
