const phantom = require('phantom');
const fs = require('fs');

module.exports = async function htmlRenderer(html) {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', { width: 595, height: 842 }); //A4 viewport
    await page.property('paperSize', {format: 'A4', orientation: 'portrait'});
    fs.writeFileSync(__dirname+'/tmp.html', html);

    const status = await page.open('./tmp.html');

    fs.unlink(__dirname+'/tmp.html', () => {
        console.log('tmp file created and removed');
    })

    console.log(`Template opened with status [${status}]`);

    await page.render('./output.pdf');
    console.log(`Pdf File created`);

    const content = await page.property('content');
    await instance.exit();

    return content;
};