const express = require('express'),
    app = express();
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

app.get("/:id/:code", async (request, response) => {
    try {
      const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions'],
  });
        
        
        
    // var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    // response.send(fullUrl);
    // response.send(request.params.id);
    // response.send(request.params.code);
        
        
        
        
    const page = await browser.newPage();
    await page.goto('https://lordsmobile.igg.com/gifts/');
//     await page.focus('#iggid')
//     await page.keyboard.type(request.params.id)
//     await page.focus('#cdkey_1')
//     await page.keyboard.type(request.params.code)
    await page.type('#iggid', request.params.id)
    await page.type('#cdkey_1', request.params.code)
//     await page.waitForSelector('#iggid:not(:empty)');
//     await page.waitForSelector('#cdkey_1:not(:empty)');
//     const selector1 = '#btn_claim_1';
//     await page.waitForSelector(selector1);
//     await page.click(selector1);
//     await page.waitFor(2000);
    await page.waitForSelector('#btn_claim_1',{delay: 20});
    await page.click('#btn_claim_1')
    const image = await page.screenshot({fullPage : true});
//     const selector2 = '#btn_msg_close';
//     await page.waitForSelector(selector2);
//     await page.click(selector2);
    await page.click('#btn_msg_close')
        
        
        
//     await page.screenshot({path:'puppeteer.png'});
//     response.sendFile('puppeteer.png');
//     await page.locator('#iggid').fill('1234');
//     await page.locator('#cdkey_1').fill('royal');
//     await page.locator('#btn_claim_1').click();
//     await page.locator('#btn_msg_close').click();
//     await page.screenshot({path:'puppeteer.png'});
//     const file = await page.screenshot({ type,  quality, fullPage });
        
        
    await browser.close();
    response.set('Content-Type', 'image/png');
    response.send(image);   
        
        
        
//     response.sendFile(file);
//     request.statusCode = 200;
//     request.setHeader('Content-Type', `image/${type}`);
//     request.end(file);
//     response.sendFile(__dirname+'puppeteer.png');
        
        
        
     return response.status(200).json;  
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (request, response) => {
     response.send('🔰 Hey Buddy.. 🚀 I am On...✔');  
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
