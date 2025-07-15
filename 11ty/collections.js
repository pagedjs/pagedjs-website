export default async function (eleventyConfig) {
  eleventyConfig.addCollection("sortedByOrder", function (collectionApi) {
    return collectionApi.getAll().sort((a, b) => {
      if (a.data.order > b.data.order) return 1;
      else if (a.data.order < b.data.order) return -1;
      else return 0;
    });
  });

  //collection for search
  eleventyConfig.addCollection("allSearch", (collection) => {
    return [...collection.getFilteredByTag("chapter")];
  });

  // create examples
  eleventyConfig.addCollection("examples", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/en/examples/**/*.md")
      .sort((a, b) => a.data.part - b.data.part);
  });

  //templates for css
  eleventyConfig.addCollection("templates", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/en/templates/**/*.md")
      .sort((a, b) => a.data.title - b.data.title);
  });

  //paged.js plugins
  eleventyConfig.addCollection("plugins", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/en/plugins/**/*.md")
      .sort((a, b) => a.data.title - b.data.title);
  });

  //collection all files in english (all default ones)
  eleventyConfig.addCollection("en", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/en/**/*.md");
  });

  //documentation
  eleventyConfig.addCollection("documentation", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/en/documentation/**/*.md")

      .sort((a, b) => a.data.date - b.data.date)
      .filter((item) => {
        return item.data.draft != true;
      });
  });

  //the journal
  eleventyConfig.addCollection("journal", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/en/journal/**/*.md")

      .sort((a, b) => a.data.date - b.data.date)
      .filter((item) => {
        return item.data.draft != true;
      });
  });

  // eleventyConfig.addFilter("filterTagList", filterTagList)
  eleventyConfig.addCollection("tagList", (collection) => {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return [...tagSet].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    );
  });
}
