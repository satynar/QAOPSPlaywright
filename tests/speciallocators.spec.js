const {test,expect}= require('@playwright/test');

test('Playwright special locators',async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByLabel("Employed").check();
await page.getByPlaceholder("Password").fill("abc123");
await page.getByRole('button',{name:'Submit'}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
//default time out of Assertion is 5 secs , if you want to override it you can do it using the timeout in to be visible in step level.
expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10000});
await page.getByRole("link",{name:'Shop'}).click();
await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
})



//the default timeout for executing one test is 30 sec.
test('Playwright test level timeout',async ({page})=>
{
    //this is the test execution timeout for the test level.
    test.setTimeout(60000);
    //this is the test timeout for test level 
    page.setDefaultTimeout(9000);
// providing timeout for global level for assertions .
const slowexpect= expect.configure({timeout:9000});
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByLabel("Employed").check();
await page.getByPlaceholder("Password").fill("abc123");
await page.getByRole('button',{name:'Submit'}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
//default time out of Assertion is 5 secs , if you want to override it you can do it using the timeout in to be visible in step level.
await slowexpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10000});
await page.getByRole("link",{name:'Shop'}).click();
await slowexpect(page.locator(".my-4").first()).toHaveText("Shop Name");
await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();

})