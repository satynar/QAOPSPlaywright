const { test,expect } = require('@playwright/test');
 
 
test('@QW Security test request intercept', async ({ page }) => {
 
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("satyasidda98@gmail.com");
    await page.locator("#userPassword").fill("123456");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6abe8b162be7a4bc2b810187' }))
    await page.locator("button:has-text('View')").first().click();
    
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    })