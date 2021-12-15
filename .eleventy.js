// const cheerio = require("cheerio");

const Cache = require("@11ty/eleventy-cache-assets");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { DateTime } = require("luxon");
const cheerio = require('cheerio');


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
  eleventyConfig.addCollection("allSearch", collection => {
    return [...collection.getFilteredByTag("chapter")];
  });



  // create documentation collection

  eleventyConfig.addCollection("documentation", collectionApi => {
    return collectionApi.getFilteredByGlob("src/content/documentation/**/*.md").sort((a, b) => a.data.part - b.data.part);
  });


  eleventyConfig.addPassthroughCopy({ "static/css": "/css" });
  eleventyConfig.addPassthroughCopy({ "static/fonts": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "static/js": "/js" });
  eleventyConfig.addPassthroughCopy({ "static/images": "/images" });
  eleventyConfig.addPassthroughCopy({ "static/outputs": "/outputs" });

  // plugin TOC
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    }).use(markdownItAnchor, {})
  );

  // useful to use the toc somewhere else
  eleventyConfig.addFilter("prependLinks", function (value, prepend) {
    return value.replace(/<a href="/g, `<a href="${prepend}`)
  });
  eleventyConfig.addFilter("replaceWithRegex", function (replaceThat, replaceWith) {
    let regex = new RegExp(replaceThat);
    return value.replace(regex, replaceWith)
  });

  // add latin number plugin
  eleventyConfig.addFilter("romanize", function (value) {
    return romanize(value);
  });



  // \get the date with luxon (for all date)
  eleventyConfig.addFilter("postDate", (dateObj) => {
    let date = new Date(dateObj)
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
  });


  // limit the amount of items
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("filterContent", function (value, el) {
    // console.log(value);
    const $ = cheerio.load(value);
    if ($.html(el)) {
      return value = $.html(el);
    }
    else {
      return value;
    }

  });





  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3", "h4"], // which heading tags are selected headings must each have an ID attribute
    wrapper: "nav", // element to put around the root `ol`/`ul`
    wrapperClass: "toc", // class for the element around the root `ol`/`ul`
    ul: false, // if to use `ul` instead of `ol`
    flat: false,
  });






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

  if (isNaN(num))
    return NaN;
  var digits = String(+num).split(""),
    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
      "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

