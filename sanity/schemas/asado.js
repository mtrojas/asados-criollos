import { GiBarbecue as icon } from 'react-icons/gi';

export default {
  // Computer Name
  name: 'asado',
  // Visible title
  title: 'Asados',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Asado',
      type: 'string',
      description: 'Nombre del asado',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Precio del asado en pesos',
      validation: (Rule) => Rule.min(1000).max(5000),
      // TODO: Add custom input component
    },
  ],
};
