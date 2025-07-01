// in the future


export default async function(eleventyConfig) {
    eleventyConfig.addFilter("toLocale", (string, locale) {
        // check if translation exist in the translation data otherwise use the words
        //define dictionnary, and add a lang for each
        const translation = get(translations, `[${key}][${locale}]`);

    })

}
