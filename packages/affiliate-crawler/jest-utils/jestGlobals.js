global.fetch = jest.fn(() => new Promise((resolve) => resolve()));
global.mockZippedStore =
  '|{¨section¨¨o¨¨data¨|{¨category¨¨t¨¨label¨¨clothing¨ß2|{¨topLevelData¨{¨name¨¨t¨¨price¨¨£3¨¨wasPrice¨¨£8¨¨isSale¨»¨discount¨ßB¨link¨¨/0¨¨image¨|¨h¨÷¨tags¨|¨k¨¨u¨¨j¨÷}¨detailedData¨{¨images¨|ßJ÷¨description¨|¨des¨÷¨selectedColor¨¨G¨¨delivery¨|¨UK¨÷¨variants¨|¦ß2¨variantText¨‡|ß2÷¨C¨|{¨value¨´6´¨soldOut¨»}÷¨Sizes¨—÷¨custom¨|{¨customText¨¨Product Code¨ß2{ßZ|¨PRODUCT-SKU A¨÷¨isDescriptive¨»}}÷}¨metaData¨{¨domain¨¨m¨¨brand¨¨ifd¨¨markedCautiousTimes¨Ê}}÷}÷}÷';
