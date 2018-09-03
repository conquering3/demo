// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {
          "browsers": ['last 7 iOS versions', 'last 3 versions', '> 1%']
        }
    }
}
