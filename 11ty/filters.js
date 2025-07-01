import slugify from "slug";

export default async function (eleventyConfig) {
  // useful to use the toc somewhere else
  eleventyConfig.addFilter("prependLinks", function (value, prepend) {
    return value.replace(/<a href="/g, `<a href="${prepend}`);
  });

  eleventyConfig.addFilter("slugify", function (rawString) {
    return slugify(rawString.toLowerCase());
  });
  eleventyConfig.addFilter(
    "replaceWithRegex",
    function (replaceThat, replaceWith) {
      let regex = new RegExp(replaceThat);
      return value.replace(regex, replaceWith);
    },
  );

  // add latin number plugin
  eleventyConfig.addFilter("romanize", function (value) {
    return romanize(value);
  });

  // remove luxon
  eleventyConfig.addFilter("postDate", (dateObj) => {
    let date = new Date(dateObj);
    return date.toLocaleDateString();
  });

  // limit the amount of items
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("removeWhitespaces", (str) =>
    str.replace(/\s/g, ""),
  );
  // eleventyConfig.addFilter("monthYear", (date) => `${date.getMonth()}-${date.getYear()}`)

  eleventyConfig.addFilter("reverse", (col) => col.reverse());
}
