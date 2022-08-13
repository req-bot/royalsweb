const express = require('express'),
    app = express(),
    puppeteer = require('puppeteer');

app.get("/:id/:code", async (request, response) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    // response.send(fullUrl);
    // response.send(request.params.id);
    // response.send(request.params.code);
    const page = await browser.newPage();
    await page.goto('https://lordsmobile.igg.com/gifts/');
    await page.focus('#iggid')
    await page.keyboard.type(request.params.id)
    await page.focus('#cdkey_1')
    await page.keyboard.type(request.params.code)
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