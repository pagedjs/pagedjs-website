eleventyConfig.addFilter("createCollectionFromFolder", (collectionName, path, sortKey) => {
  if(!collections[collectionName]){
    return eleventyConfig.addCollection(collectionName, collectionApi => {
      path = path + "/**/*.md"
      return collectionApi
      .getFilteredByGlob(path)
      .sort((a, b) => a.data[sortKey] - b.data[sortKey]);
    });
  }
});
