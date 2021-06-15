//@flow

export type Filters = $Exact<{
  priceSort?: 'high' | 'low',
  priceThresholdLow?: number,
  priceThresholdHigh?: number,
  keyWords?: Array<string>,
  brands?: Array<string>,
  saleThreshold?: number,
  section?: string,
  category?: string | Array<string>,
}>;

export type ProductVariant = {
  variantText: string,
  data: Array<{
    value: string | Array<string>,
    soldOut: Boolean,
  }>,
};

export type ProductCustomVariant = {
  customText: string,
  data: Array<{
    value: string,
    soldOut: Boolean,
    isDescriptive?: boolean,
    isPrimary?: boolean,
  }>,
};

export type ProductTopLevelData = {
  name: string,
  price?: string,
  wasPrice?: string,
  nowPrice?: string,
  link: string,
  image: string,
  tags: Array<string>,
};

export type ProductDetailedData = {
  images?: string | Array<string>,
  description?: string | Array<string>,
  selectedColor?: string | Array<string>,
  delivery?: string | Array<string>,
  variants?: Array<ProductVariant>,
  custom?: Array<ProductCustomVariant>,
};

export type ProductMetaData = {
  domain: string,
  brand: string,
  markedCautiousTimes: number,
};

export type ProductData = {
  topLevelData: ProductTopLevelData,
  detailedData: ProductDetailedData,
  metaData: ProductMetaData,
};

export type ProductCategory = {
  category: string,
  label: string,
  data: Array<ProductData>,
  totalProductsInCategory?: number,
  categoryLastUpdated?: string,
};

export type ProductSection = {
  section: string,
  data: Array<ProductCategory>,
};

export type ProductsData = Array<ProductSection>;
