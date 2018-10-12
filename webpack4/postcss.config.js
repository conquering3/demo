// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
    sourceMap: true,
    "plugins": {
        "postcss-import": {},
        // "postcss-url": {},
        cssnano: process.env.NODE_ENV == 'prod'? {}: false,
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {
          "browsers": ['last 7 iOS versions', 'last 3 versions', '> 1%']
        }
    }
}
