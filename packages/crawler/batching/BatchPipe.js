import { fastClone as clone } from '@affiliate-master/common';
import set from 'lodash/set';
import get from 'lodash/get';
import Logger from '../logger/Logger';
import messages from '../logger/logTypes';

export default class Batch {
  constructor({ currentBatch, incomingBatch, persistOldProductsUntilRound }) {
    this.currentBatch = currentBatch;
    this.incomingBatch = incomingBatch;
    this.persistOldProductsUntilRound = persistOldProductsUntilRound;
    this.newBatch;
    this.currentSection = null;
    this.currentCategory = null;
    this.markCautiousProducts = [];
    this.markRemovedProducts = [];
    this.markCautiousCategories = [];
    this.totalProductsInUpdatedBatch;
    this.productsAnalysed = 0;
  }

  setCurrentSection(name) {
    this.currentSection = name;
  }

  setCurrentCat(name) {
    this.currentCategory = name;
  }

  setProductsAnalysed() {
    this.productsAnalysed++;
    this.outputProductsAnaylsed();
  }

  outputProductsAnaylsed() {
    if (this.productsAnalysed % 1000 === 0) {
      Logger.publicLog(messages.batchProductsAnalysed(this.productsAnalysed), 'cyan');
    }
  }

  mark(markType, link, name) {
    this[markType].push({
      link,
      name,
      section: this.currentSection,
      category: this.currentCategory,
    });
  }

  setBatch(batch, area, data) {
    const sectionIndex = batch.findIndex(({ section }) => section === this.currentSection);
    if (sectionIndex === -1) return;

    let targetPath = `[${sectionIndex}].data`;
    let batchExisting;

    switch (area) {
      case 'category':
        batchExisting = get(batch, targetPath);
        break;

      case 'product': {
        const categoryIndex = batch[sectionIndex].data.findIndex(
          ({ category }) => category === this.currentCategory
        );

        targetPath = `${targetPath}[${categoryIndex}].data`;
        batchExisting = get(batch, targetPath);
        break;
      }
    }

    if (batchExisting) set(batch, targetPath, [...batchExisting, data]);
  }

  // Prepare the base for our new batch which will piggyback off our incoming batch
  prepareNewBatch() {
    this.newBatch = this.incomingBatch;
  }

  newBatchHasCategory() {
    const sectionIndex = this.newBatch.findIndex(({ section }) => section === this.currentSection);
    if (sectionIndex === -1) return false;

    const targetCategoriesPath = `[${sectionIndex}].data`;
    const targetCategories = get(this.newBatch, targetCategoriesPath);
    return targetCategories.some(({ category }) => category === this.currentCategory);
  }

  handleOutdatedCategories(category) {
    // Assign the old category to the new batch, even when this is not recognised in the new batch
    // This will be marked and sent as a slack as a notification, if this is indeed a removed then
    // we need to removed this ourselves
    this.setBatch(this.newBatch, 'category', category);
    const { category: categoryName, label } = category;
    this.markCautiousCategories.push({
      section: this.currentSection,
      category: categoryName,
      label,
    });
  }

  handleOutdatedProducts(currentBatchtarget) {
    const outdatedProduct = clone(currentBatchtarget);
    const { domain } = outdatedProduct.metaData;
    const { link, name } = outdatedProduct.topLevelData;
    let removedInBatch = outdatedProduct.metaData?.markedCautiousTimes || 0;

    // Mark batch
    if (removedInBatch < this.persistOldProductsUntilRound) {
      outdatedProduct.metaData.markedCautiousTimes = ++removedInBatch;

      // Add the 'old' cautious target to the updated batch
      this.setBatch(this.newBatch, 'product', outdatedProduct);
      this.mark('markCautiousProducts', `${domain}${link}`, name);
    }
    // Mark remove batch
    else {
      this.mark('markRemovedProducts', `${domain}${link}`, name);
    }
  }

  newBatchHasProduct(name, brand, link) {
    const newBatchSection = this.newBatch.find(
      (newBatchSection) => newBatchSection.section === this.currentSection
    );

    const newBatchCategory = newBatchSection?.data?.find(
      (newBatchCat) => newBatchCat.category === this.currentCategory
    );

    return newBatchCategory?.data?.some((newBatchProduct) => {
      const { topLevelData, metaData } = newBatchProduct;

      // Conditions to identify if a current batch product is included in the new batch
      // We can use the name and link both as flags. Be wary if there is a name change and a link change
      // even if technically the product is the same, it will still be flagged. This could result in two
      // idential products in the affilate, until the scraper detects it and removes the old product. Slack
      // notifications may help here! Worth nothing that this may still be an edge case!
      return (topLevelData.name === name || topLevelData.link === link) && metaData.brand === brand;
    });
  }

  analyseAndSetOutdatedProducts() {
    this.currentBatch.forEach((section) => {
      const { data: caterogies, section: sectionName } = section;
      this.setCurrentSection(sectionName);

      caterogies.forEach((category) => {
        const { data: categoryData, category: categoryName } = category;
        this.setCurrentCat(categoryName);

        if (!this.newBatchHasCategory()) {
          return this.handleOutdatedCategories(category);
        }

        categoryData.forEach((product) => {
          const { topLevelData, metaData } = product;
          const { name, link } = topLevelData;
          const { brand } = metaData;

          if (!this.newBatchHasProduct(name, brand, link)) {
            this.handleOutdatedProducts(product);
          }

          this.setProductsAnalysed();
        });
      });
    });
  }

  processBatch() {
    this.prepareNewBatch();
    this.analyseAndSetOutdatedProducts();

    return {
      updatedBatch: this.newBatch,
      metrics: {
        cautiousProducts: this.markCautiousProducts,
        removedProducts: this.markRemovedProducts,
        cautiousCategories: this.markCautiousCategories,
      },
    };
  }
}
