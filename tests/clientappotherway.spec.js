const {test,expect}= require('@playwright/test');
test('client app login',async ({page})=>
{
   
await page.goto("https://rahulshettyacademy.com/client");
const email= "satyasidda98@gmail.com";
await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill("123456");
await page.getByRole("button",{name:'Login'}).click();
const productName= 'ZARA COAT 3';
await page.waitForLoadState('networkidle');
 const names=page.locator(".card-body b");
 const product=  page.locator(".card-body");
 /*
 this is the code to get the text of the product
 const firstproduct =await names.first().textContent();
 console.log(await names.count());

console.log(await names.allTextContents());
const cartbutton=page.locator(".btn w-40 rounded");
*/
await names.first().waitFor();
const count= await product.count();
await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole('button',{name:" Add To Cart"}).click();
await page.getByRole("listitem").getByRole('button',{name:'Cart'}).click();
await page.locator("div li").first().waitFor();// this is for wait for the product to appear
 await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 await page.getByRole('button',{name:"Checkout"}).click();
 const creditcardnumber= await page.locator("//input[@value='4542 9931 9292 2293']").inputValue();
 const expiryDate = page.locator('div.field.small').filter({
  hasText: 'Expiry Date'
});

await expiryDate.locator('select').nth(0).selectOption({ label: '05' });
await expiryDate.locator('select').nth(1).selectOption({ label: '10' });
const cvv=  page.locator("input[type='text']").nth(1);
await cvv.fill("345");
await page.locator("input[type='text']").nth(2).fill("testing society");
await page.locator("input[type='text']").nth(3).fill("123456");

const country= page.getByPlaceholder("Select Country");
await country.pressSequentially("ind",{delay:150});//{delay:150} is to waiting for after entering each character in "ind"
await page.getByRole('button',{name:"india"}).nth(1).click();

await page.getByText("Place Order").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();


})