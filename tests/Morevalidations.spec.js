const{test,expect}= require('@playwright/test');


// test.describe.configure({mode:'parallel'});

test.describe.configure({mode:'serial'});

test('popup validations1',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
    page.on('dialog',dialog=> dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
   const framespage=page.frameLocator("#courses-iframe");
   await framespage.locator("li a[href*='lifetime-access']:visible").click();
   const text= await framespage.locator(".text h2").textContent();
   console.log(text.split(" ")[1]);
})

test('popup validations',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialscreenshot.png'})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();
    
})
test.only('Visual testing',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})