const base = require('@playwright/test');
const {APIUtils}=require('./APIUtils.js');
const {request}= require('@playwright/test');

const loginPayload= 
{userEmail: "satyasidda98@gmail.com", userPassword: "123456"};
const orderPayload= 
{orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
exports.customtest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const email = "satyasidda98@gmail.com";
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("123456");
    await page.getByRole("button", { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await use(page);
    // teardown code goes here
    await page.close();
},
createOrder: async({},use)=>
{
const apicontext= await request.newContext();
const apiutils= new APIUtils(apicontext,loginPayload);
const response = await apiutils. createorder(orderPayload);
await use(response);
await apicontext.dispose(); 
}
,
testDataOrderName:
{
    productName:'Adidas original'
}}
)
