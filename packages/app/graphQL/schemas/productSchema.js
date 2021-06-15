import { buildSchema } from 'graphql';

export default buildSchema(`
  
  scalar MultiString
  scalar JSON
  
  type Query {
    categoryData(
      section: String, 
      productType: String, 
      productCountStart: Int, 
      productCountEnd: Int, 
      priceSort: String, 
      priceThresholdLow: Int, 
      priceThresholdHigh: Int, 
      keyWords: [String], 
      brands: [String],
      saleThreshold: Int
    ): ProductData!

    searchData(
      section: String,
      category: MultiString,
      keyTerm: String,
      productColor: String,
      brand: String,
      productCountStart: Int, 
      productCountEnd: Int,
      priceSort: String, 
      priceThresholdLow: Int, 
      priceThresholdHigh: Int, 
      keyWords: [String],
      brands: [String],
      saleThreshold: Int      
    ): ProductData!

    affiliateData: [ProductData!]!
    brandList: [String!]!
  }

  type ProductData {
    section: String!
    data: [CatLevel!]!
  }

  type CatLevel {
    category: String!
    label: String!
    data: [ProductLevel!]!
    totalProductsInCategory: Int
    categoryLastUpdated: String
  }

  type ProductLevel {
    topLevelData: TopLevelData!
    detailedData: DetailedData
    metaData: MetaData!
  }

  type TopLevelData {
    name: MultiString
    price: MultiString
    wasPrice: MultiString
    nowPrice: MultiString
    isSale: Boolean
    discount: MultiString
    link: MultiString
    image: MultiString
    tags: [String]
  }

  type Variant {
    variantText: String
    data: JSON
  }

  type CustomData {
    value: [MultiString]
    isDescriptive: Boolean
  }

  type Custom {
    customText: String
    data: CustomData
  }  

  type DetailedData {
    images: MultiString
    description: MultiString
    selectedColor: MultiString
    delivery: MultiString
    variants: [Variant]
    custom: [Custom]    
  }

  type MetaData {
    domain: String
    brand: String
  }
  
`);
