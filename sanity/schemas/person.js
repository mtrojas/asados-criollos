import { MdPerson as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'person',
  // Visible title
  title: 'Parrilleros',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
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
      name: 'description',
      title: 'Bio',
      type: 'text',
      description: 'Tell us about them',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
