const express = require('express'),
    app = express();
let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  // running locally.
  puppeteer = require('puppeteer');
}

app.get("/", async (request, response) => {
  try {
    const browser = await puppeteer.launch({
      args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
//     var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    // response.send(fullUrl);
    // response.send(request.params.id);
    // response.send(request.params.code);
    const page = await browser.newPage();
    await page.goto('https://lordsmobile.igg.com/gifts/');
    await page.focus('#iggid')
    await page.keyboard.type('1234')
    await page.focus('#cdkey_1')
    await page.keyboard.type('royal')
    const selector1 = '#btn_claim_1';
    await page.waitForSelector(selector1);
    await page.click(selector1);
    const selector2 = '#btn_msg_close';
    await page.waitForSelector(selector2);
    await page.click(selector2);
    await page.screenshot({path: __dirname+'/public/puppeteer.png'});
    await browser.close();
    response.sendFile(__dirname+'/public/puppeteer.png');
  } catch (error) {
    console.log(error);
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
