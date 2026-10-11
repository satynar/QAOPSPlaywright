const {test,expect}= require('@playwright/test');
test('@New client login',async ({page})=>
{
   
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
// await page.locator('.text-reset').click();

// await page.locator("[placeholder='First Name']").fill("Narayana");
// await page.locator("#lastName").fill("Siddappa");
// await page.locator("[placeholder='email@example.com']").fill("satyasidda98@gmail.com");
// await page.locator("#userMobile").fill("9123456789");
// await page.locator("#userPassword").fill("Learn12@");
// await page.locator("#confirmPassword").fill("Learn12@");
// await page.locator("input[type='checkbox']").check();
// await page.locator("input[value='Male']").check();
// await page.locator("#login").click();
// const alreadyexistemail= page.locator("//div[@aria-label='User already exisits with this Email Id!']");
// await alreadyexistemail.waitFor();
// console.log(await alreadyexistemail.textContent());
// await page.locator(".login-wrapper-footer-text").click();
const email= "satyasidda98@gmail.com";
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("123456");
await page.locator("#login").click();
const productName= 'ZARA COAT 3';

await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");

 const names=page.locator(".card-body b");
 const product= await page.locator(".card-body");
 /*
 this is the code to get the text of the product
 const firstproduct =await names.first().textContent();
 console.log(await names.count());

console.log(await names.allTextContents());
const cartbutton=page.locator(".btn w-40 rounded");
*/
await names.first().waitFor();
const count= await product.count();
for(let i=0;i<count;++i)
{
  if (await product.nth(i).locator('b').textContent()=== productName)
{
    //add to cart
await product.nth(i).locator("text= Add To Cart").click();
break;
}}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();// this is for wait for the product to appear
 const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();//("h3:has-text('ZARA COAT 3')") is psudo class refer in official doc of playwright
 expect(bool).toBeTruthy();
 await page.locator("text=Checkout").click();
 const creditcardnumber= await page.locator("//input[@value='4542 9931 9292 2293']").inputValue();
 const expiryDate = page.locator('div.field.small').filter({
  hasText: 'Expiry Date'
});

await expiryDate.locator('select').nth(0).selectOption({ label: '05' });
await expiryDate.locator('select').nth(1).selectOption({ label: '10' });
const cvv= await page.locator("input[type='text']").nth(1);
await cvv.fill("345");
await page.locator("input[type='text']").nth(2).fill("testing society");
await page.locator("input[type='text']").nth(3).fill("123456");

const country= await page.locator("[placeholder*='Country']");
await country.pressSequentially("ind",{delay:150});//{delay:150} is to waiting for after entering each character in "ind"
const dropdown= await page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount=  await dropdown.locator("button").count();
for(let i=0;i<optionsCount;++i)
{
  const text= await dropdown.locator("button").nth(i).textContent();
  
  if(text===" India")
  {
    //console.log("thisis country" +text);
    await dropdown.locator("button").nth(i).click();
    break;
  }
}
const emailverify= await page.locator(".user__name [type='text']").first();
expect(emailverify).toHaveText(email);
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);
//await page.getByRole('button', { name: 'ORDERS' }).click();
 await page.locator("button[routerlink*='myorders']").click();
await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/myorders");

await page.locator("tbody").waitFor();
const rows= await page.locator("tbody tr");
for(let i=0;i<await rows.count();++i)
{
  const rowOrderId= await rows.nth(i).locator("th").textContent();
  if(orderId.includes(rowOrderId))
  {
    await rows.nth(i).locator("button").first().click();
    break;
  }
}

const orderIdDetails=await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();  
const productNamee =(await page.locator("//div[@class='title']").textContent()).trim();
console.log(productNamee);
expect(productName.includes(productNamee)).toBeTruthy();
// await page.pause();


})