import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import pluginTOC from "eleventy-plugin-nesting-toc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  const markdown = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {});

  //custom block with markdown

  eleventyConfig.addFilter("markdownify", function (rawString) {
    if (!rawString) return "";
    return markdown.render(rawString);
  });
  eleventyConfig.addFilter("markdownifyInline", function (rawString) {
    if (!rawString) return "";
    return markdown.render(rawString);
  });

  // plugin TOC
  eleventyConfig.setLibrary("md", markdown);

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3", "h4"], // which heading tags are selected headings must each have an ID attribute
    wrapper: "nav", // element to put around the root `ol`/`ul`
    wrapperClass: "toc", // class for the element around the root `ol`/`ul`
    ul: false, // if to use `ul` instead of `ol`
    flat: false,
  });

  eleventyConfig.addPlugin(syntaxHighlight);
}
