const { test, expect } = require("@playwright/test");



test('@Api Abort call explaination', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route("**/*.{jpg,png,jpeg}", route => route.abort());
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill("rahulshettyacademy");
    //   await password.fill("Learnin)");
    //     await signIn.click();
    //    const errorMessage = await page.locator('[style*="block"]');
    //     console.log(await errorMessage.textContent());
    //     await expect(errorMessage).toContainText('Incorrect');

    await password.fill("Learning@830$3mK2");
    await signIn.click();
    await page.waitForLoadState('networkidle');
    //   await expect(page).toHaveURL(/angularpractice|shop/);
    //  console.log(await cardTitles.first().textContent());
    //  console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.allTextContents());

});