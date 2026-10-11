const {test,expect}= require('@playwright/test');
const {customtest}= require('../Utils/test-base');
const {LoginPage}= require('../PageObjects/LoginPage');
const {DashboardPage}= require('../PageObjects/DashboardPage');
const {POManager} = require('../PageObjects/POManagers');
//Json=> string -> object
const dataset =JSON.parse(JSON.stringify(require('../Utils/placeorderTestData.json')));
for(const data of dataset)
{
test.only(`client app login ${data.productName}`,async ({page})=>
{
   
  const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    
    const productName = data.productName;
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.SearchProductAddcart(data.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



});
}


customtest('client app login' ,async ({page,testDataForOrder})=>
{
   
  const pomanager= new POManager(page);


  const loginPage= new LoginPage(page);
  await loginPage.goTo();
 await  loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
  const dashboardPage = pomanager.getDashboardPage();
  await dashboardPage.SearchProductAddcart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

await page.locator("div li").first().waitFor();// this is for wait for the product to appear
 await expect(page.getByText(testDataForOrder.productName)).toBeVisible();
 await page.getByRole('button',{name:"Checkout"}).click();
 const creditcardnumber= await page.locator("//input[@value='4542 9931 9292 2293']").inputValue();
 const expiryDate = page.locator('div.field.small').filter({
  hasText: 'Expiry Date'
});
});