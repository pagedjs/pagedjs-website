import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default (eleventyConfig) => {
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "journal", // iterate over `collections.posts`
      limit: 0, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "News from paged.js!",
      subtitle: "the latest news from paged.js and web2print development",
      base: "https://pagedjs.org",
      author: {
        name: "@julientaq",
        email: "", // Optional
      },
    },
  });
};
