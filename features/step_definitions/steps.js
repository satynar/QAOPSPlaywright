const {Given,When,Then}= require ('@cucumber/cucumber')
const {expect}= require('@playwright/test');
const playwright= require('@playwright/test')
const {POManager} = require('../../PageObjects/POManagers');



Given('a login to ecommerce application  with {string} and {string}',{timeout:100*1000},async  function (username, password) {
  // Write code here that turns the phrase above into concrete actions
 
     //js file- Login js, DashboardPage
     
      const productName = 'Zara Coat 4';
      const products = this.page.locator(".card-body");
      const loginPage = this.poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(username,password);
});

When('Add {string} to cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
this.dashboardPage =this.poManager.getDashboardPage();
     await this.dashboardPage.SearchProductAddcart(productName);
     await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart',async  function (productName) {
  // Write code here that turns the phrase above into concrete actions
   

     this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
   this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind","India");
   this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
   console.log(this.orderId);
});

  Then('verify order is present in  the OrderHistory', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
   this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
   await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
   expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
});


Given('a login to ecommerce2 application  with {string} and {string}',{timeout:100*1000},async function (username,password) {
  // Write code here that turns the phrase above into concrete actions
 await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 const userName = this.page.locator('#username');
      const signIn = this.page.locator("#signInBtn");
      console.log(await this.page.title());
      //css 
     await userName.type(username);
     await this.page.locator("[type='password']").fill(password);
     await signIn.click();
});

Then('verify error message is displayed',async function () {
  // Write code here that turns the phrase above into concrete actions
 console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
