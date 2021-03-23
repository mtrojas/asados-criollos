import { MdStore as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'storeSettings',
  // Visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Nombre de la tienda',
    },
    {
      name: 'parrillero',
      title: 'Parrilleros a la Orden',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'asadosTop',
      title: 'Los más pedidos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'asado' }] }],
    },
  ],
};
