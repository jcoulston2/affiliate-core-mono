//@flow
import { GraphQLScalarType } from 'graphql';

export const MultiString = new GraphQLScalarType({
  name: 'MultiString',
  description: 'Accepts a string or an array of strings',
  serialize: (value: any) => {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item !== 'string') return null;
      }
    } else if (typeof value !== 'string') {
      return null;
    }

    return value;
  },
});

export const ObjectScalarType = new GraphQLScalarType({
  name: 'Object',
  description: 'Arbitrary object',
  serialize: (value: any) => {
    return typeof value === 'object' ? value : null;
  },
});

export const CmsJsonRequired = new GraphQLScalarType({
  name: 'CmsJsonRequired',
  description: 'Accepts JSON format',
  serialize: (value: any) => {
    const cmsKeys = Object.keys(value);
    for (const key of cmsKeys) {
      if (typeof value[key] !== 'object') return null;
      if (!Object.keys(value[key]).length) return null;
    }
    return value;
  },
});
