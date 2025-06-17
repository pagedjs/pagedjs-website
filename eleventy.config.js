const Cache = require("@11ty/eleventy-fetch");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  // collection

  eleventyConfig.addCollection("sortedByOrder", function (collectionApi) {
    return collectionApi.getAll().sort((a, b) => {
      if (a.data.order > b.data.order) return 1;
      else if (a.data.order < b.data.order) return -1;
      else return 0;
    });
  });

  // eleventyConfig.addFilter("search", searchFilter);

  // eleventyConfig.addFilter("searchSingle", searchFilterSingle);
  eleventyConfig.addCollection("allSearch", (collection) => {
    return [...collection.getFilteredByTag("chapter")];
  });

  const markdown = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
  });

  eleventyConfig.addFilter("markdownify", function (rawString) {
    return markdown.render(rawString);
  });

  eleventyConfig.addFilter("slugify", function (rawString) {
    return slugify(rawString.toLowerCase());
  });

  // create examples

  eleventyConfig.addCollection("examples", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/examples/**/*.md")
      .sort((a, b) => a.data.part - b.data.part);
  });

  eleventyConfig.addCollection("templates", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/templates/**/*.md")
      .sort((a, b) => a.data.title - b.data.title);
  });

  eleventyConfig.addCollection("plugins", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/plugins/**/*.md")
      .sort((a, b) => a.data.title - b.data.title);
  });
  eleventyConfig.addCollection("documentation", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/documentation/**/*.md")

      .sort((a, b) => a.data.date - b.data.date)
      .filter((item) => {
        return item.data.draft != true;
      });
  });

  // add syntax color for code!
  //
  //

  eleventyConfig.addPlugin(syntaxHighlight);

  // create journal collection

  eleventyConfig.addCollection("journal", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/journal/**/*.md")

      .sort((a, b) => a.data.date - b.data.date)
      .filter((item) => {
        return item.data.draft != true;
      });
  });
  // function filterTagList(tags, tagListYouWantToFilter) {
  //   return (tags || []).filter(tag => tagListYouWantToFilter.indexOf(tag) === -1);
  // }

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

  // filterTagList(tags , ["nav","posts"])

  eleventyConfig.addPassthroughCopy({ "static/css": "/css" });
  eleventyConfig.addPassthroughCopy({ "static/fonts": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "static/js": "/js" });
  eleventyConfig.addPassthroughCopy({ "static/images": "/images" });
  eleventyConfig.addPassthroughCopy({ "static/outputs": "/outputs" });
  eleventyConfig.addPassthroughCopy({ "static/plugins": "/plugins" });
  eleventyConfig.addPassthroughCopy({ "static/templates": "/templates" });

  // plugin TOC
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    }).use(markdownItAnchor, {}),
  );

  // useful to use the toc somewhere else
  eleventyConfig.addFilter("prependLinks", function (value, prepend) {
    return value.replace(/<a href="/g, `<a href="${prepend}`);
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

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3", "h4"], // which heading tags are selected headings must each have an ID attribute
    wrapper: "nav", // element to put around the root `ol`/`ul`
    wrapperClass: "toc", // class for the element around the root `ol`/`ul`
    ul: false, // if to use `ul` instead of `ol`
    flat: false,
  });

  // adding the 4 next lines to the tag page njk
  //
  // eleventyConfig.addFilter("urlIncludesExamples", (url)=>{
  //  if(url.toString().includes("examples"))return true
  //  else return false
  // })

  // folder structures
  // -----------------------------------------------------------------------------
  // content, data and layouts comes from the src folders
  // output goes to public (for gitlab ci/cd)
  // -----------------------------------------------------------------------------
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "layouts",
      data: "data",
    },
  };
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function romanize(num) {
  // taken from Steven Levithan
  // https://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter

  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
