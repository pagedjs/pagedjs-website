import fs from "node:fs";
import path from "node:path";
import browserslist from "browserslist";

import {
  bundleAsync,
  browserslistToTargets,
  composeVisitors,
} from "lightningcss";

// Set default transpiling targets
let browserslistTargets = "> 0.2% and not dead";

// Check for user's browserslist
try {
  const pack = path.resolve(__dirname, fs.realpathSync("package.json"));
  const userPkgBrowserslist = require(pack);

  if (userPkgBrowserslist.browserslist) {
    browserslistTargets = userPkgBrowserslist.browserslist;
  } else {
    try {
      const browserslistrc = path.resolve(
        __dirname,
        fs.realpathSync(".browserslistrc"),
      );

      fs.readFile(browserslistrc, "utf8", (_err, data) => {
        if (data.length) {
          browserslistTargets = [];
        }

        data.split(/\r?\n/).forEach((line) => {
          if (line.length && !line.startsWith("#")) {
            browserslistTargets.push(line);
          }
        });
      });
    } catch (err) {
      // no .browserslistrc
    }
  }
} catch (err) {
  // no package browserslist
}

export default function (eleventyConfig, options) {
  const defaults = {
    importPrefix: "_",
    nesting: true,
    customMedia: true,
    minify: true,
    sourceMap: true,
    visitors: [],
    customAtRules: {},
    debug: false,
  };

  const {
    importPrefix,
    nesting,
    customMedia,
    minify,
    sourceMap,
    visitors,
    customAtRules,
    debug,
  } = {
    ...defaults,
    ...options,
  };

  // Recognize CSS as a "template language"
  eleventyConfig.addTemplateFormats("css");

  // Process CSS with LightningCSS
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (_inputContent, inputPath) {
      // log to find the content
      let parsed = path.parse(inputPath);

      // if the file starts with the `importPrefix`do do anything with it.
      if (parsed.name.startsWith(importPrefix)) {
        // if debug declare dependencies in the log
        if (debug) {
          console.log(
            `[11ty-lightningCSS] ${parsed.dir}${parsed.base} was marked as dependency`,
          );
        }
        return;
      }

      // Support @import triggering regeneration for incremental builds
      // h/t @julientaq for the fix
      if (_inputContent.includes("@import")) {
        // for each file create a list of files to look at
        const fileList = [];

        // get a list of import on the file your reading
        const importRuleRegex =
          /@import\s+(?:url\()?['"]?([^'"\);]+)['"]?\)?.*;/g;

        let match;
        while ((match = importRuleRegex.exec(_inputContent))) {
          fileList.push(parsed.dir + "/" + match[1]);
        }

        this.addDependencies(inputPath, fileList);
      }

      let targets = browserslistToTargets(browserslist(browserslistTargets));

      //create the folder if it doesnt exit

      return async (data) => {
        let { code, map } = await bundleAsync({
          filename: inputPath,
          // code: Buffer.from(_inputContent),
          minify,
          sourceMap,
          targets,
          drafts: {
            nesting,
            customMedia,
          },
          customAtRules,
          visitor: composeVisitors(visitors),
          resolver: {
            read(filePath) {
              // console.log(filePath);
              // Read the file content
              let content = fs.readFileSync(filePath, "utf8");

              // Apply a transformation: Replace a placeholder with a value
              content = removeYaml(content);
              // Return the transformed content
              return content;
            },
            resolve(specifier, from) {
              return path.resolve(path.dirname(from), specifier);
            },
          },
        });

        let mapComment = "";

        const link = path.parse(data.page.outputPath);

        console.log(data.page.outputPath);

        if (sourceMap) {
          const sourceMapLocation = `./${link.name}.map`;

          // Get the directory name from the sourcemap location
          let url = fs.mkdirSync(link.dir, {
            recursive: true,
          });

          // Ensure the directory exists
          fs.writeFileSync(data.page.outputPath.replace(".css", ".map"), map);

          //write the comment in the css to set the source map
          mapComment = `/*# sourceMappingURL=${sourceMapLocation} */`;
        }

        return code + "\n" + mapComment;
      };
    },
  });
}
/*remove yaml front matter from a string*/
function removeYaml(content) {
  const yamlFrontmatterRegex = /^---\s*[\s\S]*?\s*---\s*/;
  return content.replace(yamlFrontmatterRegex, "");
}
