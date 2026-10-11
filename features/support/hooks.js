const playwright = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManagers');
const {
    Before,
    After,
    BeforeStep,
    AfterStep,
    Status
} = require('@cucumber/cucumber');

// Runs before each scenario
Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.poManager = new POManager(this.page);
});

// Runs after each scenario
After(async function () {
    console.log("I am last to execute");

    if (this.context) {
        await this.context.close();
    }

    if (this.browser) {
        await this.browser.close();
    }
});

// Runs before each step
BeforeStep(function () {
    // Executes before every step
});

// Runs after each step
AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED && this.page) {
        await this.page.screenshot({
            path: 'screenshot1.png'
        });
    }
});


