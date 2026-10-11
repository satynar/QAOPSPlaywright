const {test,expect,request}= require('@playwright/test');
const {APIUtils}= require('../Utils/APIUtils');

let response;
const loginPayload= 
{userEmail: "satyasidda98@gmail.com", userPassword: "123456"};
const orderPayload= 
{orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
test.beforeAll(async()=>
{
    // api call for login
const apicontext= await request.newContext();
const apiutils= new APIUtils(apicontext,loginPayload);
response = await apiutils. createorder(orderPayload);


//api call for order creation
})



test('@Api Place the order ',async ({page})=>
{
 
//below step is important to get the token

page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
},response.token);   // this command is used to get the token from api and integrate into test cases.
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

// const email= "satyasidda98@gmail.com";
// await page.locator("#userEmail").fill(email);
// await page.locator("#userPassword").fill("123456");
// await page.locator("#login").click();
const productName= 'ZARA COAT 3';
const email='satyasidda98@gmail.com'


 await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows= page.locator("tbody tr");
for(let i=0;i<await rows.count();++i)
{
  const rowOrderId= await rows.nth(i).locator("th").textContent();
  if(response.orderId.includes(rowOrderId))
  {
    await rows.nth(i).locator("button").first().click();
    break;
  }
}

const orderIdDetails=await page.locator(".col-text").first().textContent();

expect(response.orderId.includes(orderIdDetails)).toBeTruthy();  
const productNamee =(await page.locator("//div[@class='title']").textContent()).trim();
console.log(productNamee);
expect(productName.includes(productNamee)).toBeTruthy();
// await page.pause();


})