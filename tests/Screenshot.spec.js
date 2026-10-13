const{test,expect}= require('@playwright/test');

test('@Web popup validations',async({page})=>{
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
    // expect(await page.screenshot()).toMatchSnapshot('landing.png');
})