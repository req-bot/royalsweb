const express = require('express'),
    app = express();
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

app.get("/", async (request, response) => {
  try {
    const browser = await playwright.chromium.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
    // var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    // response.send(fullUrl);
    // response.send(request.params.id);
    // response.send(request.params.code);
    const page = await browser.newPage();
    await page.goto('https://lordsmobile.igg.com/gifts/');
    await page.locator('#iggid').fill('1234');
    await page.locator('#cdkey_1').fill('royal');
    await page.locator('#btn_claim_1').click();
    await page.locator('#btn_msg_close').click();
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
