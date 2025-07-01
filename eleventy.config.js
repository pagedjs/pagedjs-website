import { HtmlBasePlugin } from "@11ty/eleventy";
import markdownConfig from "./11ty/markdown.js";
import collections from "./11ty/collections.js";
import filters from "./11ty/filters.js";
import i18n from "./11ty/i18n.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(markdownConfig);
  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(collections);
  eleventyConfig.addPlugin(i18n);

  // create journal collection

  // filterTagList(tags , ["nav","posts"])

  eleventyConfig.addPassthroughCopy({ "static/css": "/css" });
  eleventyConfig.addPassthroughCopy({ "static/fonts": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "static/js": "/js" });
  eleventyConfig.addPassthroughCopy({ "static/images": "/images" });
  eleventyConfig.addPassthroughCopy({ "static/outputs": "/outputs" });
  eleventyConfig.addPassthroughCopy({ "static/plugins": "/plugins" });
  eleventyConfig.addPassthroughCopy({ "static/templates": "/templates" });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "layouts",
      data: "data",
    },
  };
}

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
