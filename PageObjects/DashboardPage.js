const { title } = require("node:process");

class DashboardPage
{
    constructor(page)
    {
         this.page = page;
this.products=  page.locator(".card-body");
this.producttexts =page.locator(".card-body b");
this.cart= page.locator("[routerlink*='cart']");


    }


    async SearchProductAddcart(productName)
    {
const titles= this.producttexts;
 const product=  this.products
        await titles.first().waitFor();
const count= await this.products.count();
for(let i=0;i<count;++i)
{
  if (await this.products.nth(i).locator('b').textContent()=== productName)
{
    //add to cart
await this.products.nth(i).locator("text= Add To Cart").click();
break;
}}
    }
   async  navigateToCart()
    {

        await this.cart.click();
    }
    
async navigateToOrders() {
    await this.page.getByRole('button', { name: /ORDERS/ }).click();
}

}

module.exports={DashboardPage};