const cheerio = require('cheerio')
const fs = require('fs')

module.exports = function templater(profil, callback){
    const $ = cheerio.load(fs.readFileSync('./template.html'))

    $('span#name').text(profil.name);

    let languageList = $('ul#languages');

    profil.languages.map((el) => {
        let language = $('<li></li>').text(el);
    languageList.append(language);
});

    callback($.html());
}
