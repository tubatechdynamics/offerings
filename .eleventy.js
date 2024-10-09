require('dotenv').config();

const { DateTime } = require("luxon");
const sass = require("sass");
const path = require("path");
const browserslist = require("browserslist");
const { transform, browserslistToTargets } = require("lightningcss");

module.exports = function(eleventyConfig) {
  // Copy the CSS and JS folders to the output
  eleventyConfig.addPassthroughCopy("src/assets");

  // Copy `src/assets/images/favicon` to `_site/`
  eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon": "/" });

  // Add a custom filter named 'relative_url'
  eleventyConfig.addFilter("relative_url", function(url) {
    return url.startsWith("/") ? url : "/" + url;
  });

  // Enable live reload
  eleventyConfig.setBrowserSyncConfig({
    open: false,
    host: '0.0.0.0',
    port: 8080,
    ui: false,
    ghostMode: false,
    files: ['_site/**/*'],
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  // Add a custom filter named 'dateFilter'
  eleventyConfig.addFilter("dateFilter", function(date) {
    return DateTime.fromJSDate(date).toFormat("MMMM d, yyyy");
  });

  // Add a shortcode named 'year'
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Recognize Sass as a "template language"
  eleventyConfig.addTemplateFormats("scss");

  // Compile Sass
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      // Skip files like _fileName.scss
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }

      // Run file content through Sass
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || "."],
        sourceMap: false, // or true, your choice!
      });

      // Allow included files from @use or @import to
      // trigger rebuilds when using --incremental
      this.addDependencies(inputPath, result.loadedUrls);

      let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

      return async () => {
        let { code } = await transform({
          code: Buffer.from(result.css),
          minify: true,
          sourceMap: false,
          targets,
        });
        return code;
      };
    },
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    passthroughFileCopy: true,
    templateFormats: ["md", "njk", "html", "scss"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
