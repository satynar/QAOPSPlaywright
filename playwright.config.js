// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  
  /*Maximum timeout for run the one test *? */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 60 * 1000,
    navigationTimeout: 30 * 1000,
   browserName: 'chromium',
   //channel:'msedge',
   headless:false,
   screenshot:'on',
   trace:'on'// off, on, retain-on-failure options are available for trace
  },

  
});
module.exports=config;

