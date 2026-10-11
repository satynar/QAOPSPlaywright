// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { rootCertificates } from 'node:tls';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1,
  workers:3,

  /*Maximum timeout for run the one test *? */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        actionTimeout: 60 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'webkit',
        //channel:'msedge',
        headless: false,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 11'],
      }

    } ,
    {
      name: 'chrome',
      use: {
        actionTimeout: 60 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'chromium',
        video:'retain-on-failure',
        ignoreHttpsErrors:true,   // this is to manage ssl certification for websites
        //channel:'msedge',
        headless: false,
        permission:['geolocation'],   // it is for giving access for location
                screenshot: 'on',
        // viewport:{width:720,height:720},   // Open the page in respective dimensions
        trace: 'on'  ,         // off, on, retain-on-failure options are available for trace
        // ...devices['Redmi note 11 5T'],
      }

    }


  ]

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  ,


});
module.exports = config;

