module.exports = (eleventyConfig) => {
  eleventyConfig.addShortcode(
    'paginator', 
    require('./eleventy-plugin-paginator.js')
  );
};
