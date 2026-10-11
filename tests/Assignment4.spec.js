import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';
const YAHOO_USER = { email: 'rajesh@yahoo.com', password: 'Rajesh12@' };
const GMAIL_USER = { email: 'satyasidda98@gmail.com', password: 'Rajesh12@' };

async function loginAs(page, user) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(user.email);
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}


test('@Regression Validate access denied', async ({page, request}) => {

    const loginRes = await request.post(`${API_URL}/auth/login`,
        {
            data: { email: YAHOO_USER.email, password: YAHOO_USER.password },

        });
    expect(loginRes.ok()).toBeTruthy();
    const { token } = await loginRes.json();

    //fetch the events
    const eventsRes =await request.get(`${API_URL}/events`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    expect(eventsRes.ok()).toBeTruthy();
    const eventdata=await eventsRes.json();
    const eventId= eventdata.data[0].id;

     const bookingRes = await request.post(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      eventId,
      customerName:  'rajesh',
      customerEmail: YAHOO_USER.email,
      customerPhone: '9999999999',
      quantity:1,
    },
  });

   expect(bookingRes.ok()).toBeTruthy();
  const yahooBookingId = (await bookingRes.json()).data.id;
  console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);

  // ── Step 4: Login as Gmail user via UI ────────────────────────────────────
    await loginAs(page, GMAIL_USER);
  
    // ── Step 5: Navigate directly to Yahoo's booking URL as Gmail user ────────
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });
  
    // ── Step 6: Validate Access Denied ───────────────────────────────────────
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();




})

