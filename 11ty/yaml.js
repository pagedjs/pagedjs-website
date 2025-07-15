import yaml from "js-yaml";

export default function (eleventyConfig) {
  // accept data as yaml
  eleventyConfig.addDataExtension("yaml, yml", (contents) =>
    yaml.load(contents),
  );
}
