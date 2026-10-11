const { test, expect, request } = require('@playwright/test');
const { customtest } = require('../Utils/fixtures.js');



customtest('Fixture demo',async({authenticatedPage,createOrder,testDataOrderName})=>
{
authenticatedPage.goto("https://rahulshettyacademy.com/client")
 await authenticatedPage.locator("button[routerlink*='myorders']").click();
await authenticatedPage.locator("tbody").waitFor();
await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
console.log(testDataOrderName.productName);
}


)