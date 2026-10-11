const {test,expect}= require("@playwright/test");



test('browser automation code',async ({browser})=>
{
     const context=await  browser.newContext();
     const page =await context.newPage();
    await  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const username= page.locator("#username");
    const password=  page.locator("[type='password']");
    const signIn= page.locator("#signInBtn");
    const cardTitles= page.locator(".card-body a");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await username.fill("rahulshettyacademy");
//   await password.fill("Learnin)");
//     await signIn.click();
//    const errorMessage = await page.locator('[style*="block"]');
//     console.log(await errorMessage.textContent());
//     await expect(errorMessage).toContainText('Incorrect');

    await password.fill("Learning@830$3mK2");
 await signIn.click();
//   await expect(page).toHaveURL(/angularpractice|shop/);
//  console.log(await cardTitles.first().textContent());
//  console.log(await cardTitles.nth(1).textContent());
 console.log(await cardTitles.allTextContents());

});

test('dropdownhandles',async({page}) =>
{  
await  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const username=page.locator("#username");
const password=page.locator("#password");
const loginbutton=page.locator("#signInBtn");
const blinktext= page.locator("[href*='job-ready']");
await username.fill("rahulshettyacademy");
 await password.fill("Learning@830$3mK2");
const dropdown=page.locator("select.form-control");
await dropdown.selectOption("consult");

// await page.locator('.radiotextstyle').last().click();
const radioButtons=page.locator("//label[2]//span[2]");
await radioButtons.click();
expect(radioButtons).toBeChecked();
console.log(await radioButtons.isChecked());
await page.locator("#okayBtn").click();
const checkbox=page.locator("#terms");
await checkbox.click();
await expect(checkbox).toBeChecked();
await checkbox.uncheck();
expect(checkbox).not.toBeChecked();
await expect(blinktext).toHaveAttribute("class","blinkingText");
// await page.pause();
 //await loginbutton.click();
})

test('child window handles',async({browser})=>
{
      const context= await browser.newContext();
      const page= await context.newPage();
       await  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const documentLink= await page.locator("[href*='documents-request']");
       const username=page.locator("#username");
       const [newPage] =await Promise.all(
        [
          context.waitForEvent("page"),
          documentLink.click(),
        ]
       )
       const text=await newPage.locator(".red").textContent();
       console.log(text);
       const arrayText= await text.split("@");
       const domain= await arrayText[1].split(" ")[0];
       //console.log(domain);
       await page.locator("#username").fill(domain);
        console.log(await page.locator("#username").inputValue());
       const newPage3= await context.newPage();
       await newPage3.goto("https://www.google.com");
       //await page.pause();

})
