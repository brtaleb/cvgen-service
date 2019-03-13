const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const htmlToDocx = require('./htmlToDocx')
const htmlRenderer = require('./htmlRenderer')
const templater = require('./templater')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const outputFile = __dirname + '/output';

/*
* htmlRenderer() renders the html from the template file then
* - creates a pdf
* - returns the html string
* we can download the pdf file directly
* and we can use the html string to create the docx file
* by calling htmlToDocx()
*/

app.post('/docx', (req, res) => {
    const {profil} = req.body;
    console.log(profil);

    templater(profil, html => {
        htmlRenderer(html).then(htmlData => {
            htmlToDocx(htmlData, (docBlob, err) => {
                if (err) console.log(err);
                else {
                    fs.writeFile(outputFile+'.docx', docBlob, function(err) {
                        if (err) console.log(err);
                        console.log('Doc file created');
                        res.download(outputFile+'.docx', (err) => {
                            if (err) console.log(err);
                        });
                    });
                }
            });
        }).catch(err => {
            console.log(err);
        });
    });
});

app.post('/pdf', (req, res) => {
    const {profil} = req.body;
    console.log(profil);

    templater(profil, html => {
        htmlRenderer(html).then(() => {
            res.download(outputFile+'.pdf', (err) => {
                if (err) console.log('server get pdf', err);
            });
        }).catch(err => {
            console.log(err);
        });
    });
});

app.listen(1234, () => {
    console.log('server running on port:1234');
})