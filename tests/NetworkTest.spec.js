const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');

let response;
const loginPayload =
  { userEmail: "satyasidda98@gmail.com", userPassword: "123456" };
const orderPayload =
  { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
test.beforeAll(async () => {
  // api call for login
  const apicontext = await request.newContext();
  const apiutils = new APIUtils(apicontext, loginPayload);
  response = await apiutils.createorder(orderPayload);


  //api call for order creation
})



test('Place the order/Response Mocking example ', async ({ page }) => {

  //below step is important to get the token

  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);   // this command is used to get the token from api and integrate into test cases.
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const productName = 'ZARA COAT 3';
  const email = 'satyasidda98@gmail.com'
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayloadOrders);
      route.fulfill(
        {
          response,
          body,

        }
      )

    }
  )


  await page.locator("button[routerlink*='myorders']").click();
  await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/myorders");

  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());





})