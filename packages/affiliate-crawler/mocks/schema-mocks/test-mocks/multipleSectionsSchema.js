import commonSchema from './commonSchema';

const multipleDuplicateSectionsSchema = ['womens dresses', 'womens dresses'].map(section => {
  return {
    ...commonSchema,
    section: section.split(' ')[0],
    category: section.split(' ')[1],
  };
});

export default multipleDuplicateSectionsSchema;
