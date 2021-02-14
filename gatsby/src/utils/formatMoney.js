const formatter = Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
});

export default function formatMoney(pesos) {
  return formatter.format(pesos);
}
