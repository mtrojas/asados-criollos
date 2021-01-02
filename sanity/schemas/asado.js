import { GiBarbecue as icon } from 'react-icons/gi';
import PriceInput from '../components/PriceInput';

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
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: 'Cuéntanos en qué consiste este asado',
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
      validation: (Rule) => Rule.min(10000).max(500000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      toppings0: 'toppings.0.name',
      toppings1: 'toppings.1.name',
      toppings2: 'toppings.2.name',
      toppings3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      // 1. Filter undefined toppings out
      const tops = Object.values(toppings).filter(
        (topping) => topping !== undefined
      );
      // 2. Return the preview object for the pizza
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
