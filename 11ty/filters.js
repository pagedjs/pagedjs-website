import slugify from "slug";

export default async function (eleventyConfig) {
  // useful to use the toc somewhere else
  eleventyConfig.addFilter("prependLinks", function (value, prepend) {
    return value.replace(/<a href="/g, `<a href="${prepend}`);
  });

  eleventyConfig.addFilter("slugify", function (rawString) {
    if (!rawString) return "";
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

  eleventyConfig.addFilter("findmenu", function (arr, chosenlang) {
    if (!arr) return [];
    let filtered = arr.filter((e) => {
      return e.data.menu && e.data.menu.length > 0;
    });
    return filtered;
  });
  eleventyConfig.addFilter("findlang", function (arr, chosenlang) {
    if (!arr) return [];
    let filtered = arr.filter((e) => {
      return e.data.lang === chosenlang;
    });
    return filtered;
  });

  eleventyConfig.addFilter("orderedMenu", function (collection, order, lang) {
    if (!Array.isArray(collection) || !Array.isArray(order)) return [];

    return order
      .map((id) => {
        // First try to find item with same ID and requested language
        let item = collection.find(
          (entry) => entry.data.id === id && entry.data.lang === lang,
        );

        if (item) return item;

        // Fallback to English
        item = collection.find(
          (entry) => entry.data.id === id && entry.data.lang === "en",
        );

        return item || null; // optional fallback
      })
      .filter(Boolean); // remove nulls
  });

  eleventyConfig.addFilter("removeItem", function (arr, prop, value) {
    return arr.filter((item) => item.data[prop] !== value);
  });

  eleventyConfig.addFilter("removeWhitespaces", (str) =>
    str.replace(/\s/g, ""),
  );
  // eleventyConfig.addFilter("monthYear", (date) => `${date.getMonth()}-${date.getYear()}`)

  eleventyConfig.addFilter("reverse", (col) => col.reverse());
}
