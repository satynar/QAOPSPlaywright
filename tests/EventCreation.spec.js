const {test,expect}= require('@playwright/test');
test('Event Creation',async ({page})=>
{

await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill("satyasidda98@gmail.com");
await page.getByPlaceholder("••••••").fill("Rajesh12@");
await page.getByRole('button',{name:'Sign In'}).click(); 

await page.getByText("Admin").click();
await page.getByText("Manage Events").first().click();
const title= page.getByPlaceholder("Event title");
await title.fill("Playwright Event");
await page.getByPlaceholder("Describe the event…").fill("this is the description of the event");
await page.locator("#category").selectOption({label:"Concert"});
await page.getByPlaceholder("e.g. Bangalore").fill("kakinada");
await page.getByPlaceholder("Venue name & address").fill("kapu kalyana mandapam");
await page.getByPlaceholder("0.00").fill("50");
await page.locator('input[type="datetime-local"]')
  .fill('2026-10-15T12:30');
  await page.getByPlaceholder("e.g. 500").fill("100");
 


  await page.getByRole('button',{name:'+ Add Event'}).click();
  
 await page.locator('#nav-events').click();
 await page.waitForLoadState('networkidle');
 const names= page.locator("div.p-4.flex.flex-col.flex-1 a h3");
 const products=  page.locator("div.p-4.flex.flex-col.flex-1");
 const count= await products.count(); 
 console.log(count);
console.log(await names.allTextContents());
let seatscount;
for(let i=0;i<count;i++)
{
    if (await names.nth(i).textContent()==="Playwright Event")
    {
        const text = await products.nth(i).locator('span.text-emerald-600').textContent();
        console.log(text);
        seatscount= text.split(" ")[0];
        console.log("this is the count of tickets:" +seatscount);

        await products.nth(i).getByRole('link', { name: 'Book Now' })
    .click();

        break;
    }
}
console.log(seatscount);
await page.getByPlaceholder("Your full name").fill("Jogendra");
await page.getByPlaceholder("you@email.com").fill("Jogendra@gmail.com");
await page.getByPlaceholder("+91 98765 43210").fill("91234567890");
await page.getByRole('button',{name:'Confirm Booking'}).click();
await expect(
    page.getByText("Booking Confirmed!", { exact: false })
).toBeVisible();
await page.locator('#nav-events').click();
await page.waitForLoadState('networkidle');
const namesAfterBooking =
    page.locator("div.p-4.flex.flex-col.flex-1 a h3");

const productsAfterBooking =
    page.locator("div.p-4.flex.flex-col.flex-1");

await expect(namesAfterBooking.first()).toBeVisible();

console.log(await namesAfterBooking.allTextContents());
let seatscount1;
for(let i=0;i<count;i++)
{
    if (await names.nth(i).textContent()==="Playwright Event")
    {
        const text1 = await products.nth(i).locator('span.text-emerald-600').textContent();
        console.log(text1);
       seatscount1 = text1.split(" ")[0];
        console.log("this is the count of tickets:" + seatscount1);
        break;
    }
}

console.log(seatscount1);
expect(Number(seatscount1)).toBe(Number(seatscount) - 1);
console.log("Before booking seats count: " + seatscount);
console.log("After booking seats count: " + seatscount1);

// await page.pause();
})

