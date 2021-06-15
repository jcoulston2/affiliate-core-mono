//@flow
const commonProductQuery = `
    section
    data {
      category
      totalProductsInCategory
      categoryLastUpdated
      data {
        topLevelData {
          name
          price
          wasPrice
          nowPrice
          isSale
          discount
          link
          image
        }
        detailedData {
          images
          description
          selectedColor
          delivery            
          variants {
            variantText
            data
          }
          custom {
            customText
            data {
              value
              isDescriptive            
            }          
          }
        }
        metaData {
          domain
          brand
        }
      }
    }
  }
`;

export const productQuery = `
  query CategoryData(
    $section: String, 
    $productType: String, 
    $productCountStart: Int, 
    $productCountEnd: Int,
    $priceSort: String,
    $priceThresholdLow: Int,
    $priceThresholdHigh: Int,
    $keyWords: [String],
    $brands: [String],
    $saleThreshold: Int
  ) {
    categoryData(
      section: $section,
      productType: $productType,
      productCountStart: $productCountStart, 
      productCountEnd: $productCountEnd,
      priceSort: $priceSort,
      priceThresholdLow: $priceThresholdLow,
      priceThresholdHigh: $priceThresholdHigh,
      keyWords: $keyWords,
      brands: $brands,
      saleThreshold: $saleThreshold        
    ) {
    ${commonProductQuery}
  }
`;

export const searchQuery = `
  query SearchData(
    $section: String,
    $category: MultiString,
    $keyTerm: String,
    $productColor: String,
    $brand: String,
    $productCountStart: Int, 
    $productCountEnd: Int,
    $priceSort: String,
    $priceThresholdLow: Int,
    $priceThresholdHigh: Int,
    $keyWords: [String],
    $brands: [String],
    $saleThreshold: Int     
  ) {
    searchData(
      category: $category,
      keyTerm: $keyTerm,
      productColor: $productColor,
      section: $section,
      brand: $brand,
      productCountStart: $productCountStart, 
      productCountEnd: $productCountEnd,
      priceSort: $priceSort,
      priceThresholdLow: $priceThresholdLow,
      priceThresholdHigh: $priceThresholdHigh,
      keyWords: $keyWords,
      brands: $brands,
      saleThreshold: $saleThreshold        
    ) {
    ${commonProductQuery}
  }
`;

export const navigationDataQuery = `
  {
    affiliateData {
      section
      data {
        label
        category
      }
    }
  }
`;

export const cmsQuery = (bespokeSections: string): string => `
  {
    cms {
      header
      theme
      userSettings
      wishList
      ${bespokeSections}
      footer,
      document,
      other   
    }
  }
`;

export const brandListQuery = `
  {
    brandList
  }
`;
