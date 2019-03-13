const HtmlDocx = require('html-docx-js')
const fs = require('fs')

module.exports = function htd(htmlData, callback) {

    /*
    * we need to create a tmp html file using the html data
    * returned by htmlRenderer()
    * we then create the docx using the tmp.html file
    * we don't use the template.html directly because
    * we need an html file with rendered javascript
    */
    fs.writeFile(__dirname+'/tmp.html', htmlData, () => {
        fs.readFile(__dirname+'/tmp.html', 'utf-8', (err, html) => {
            if (err) callback(null, err);
            callback(HtmlDocx.asBlob(html));

            fs.unlink(__dirname+'/tmp.html', () => {
                console.log('tmp file created and removed');
            })
        });
    });
}