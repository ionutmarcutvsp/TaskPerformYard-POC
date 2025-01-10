import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use:{
    headless: true, // Set to true to run in an invisible browser
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 }, // default viewport to be used in all tests
    trace: 'on', // Enables trace generation for debugging
    screenshot: 'only-on-failure', // Capture screenshots for failed tests,
  },
  // Use projects to run different screen sizes
    projects: [
        {
            name: 'Tablet',
            use: {
                ...devices['iPad'],
            },
        },
        {
            name: 'Desktop',
            use: {
                viewport: { width: 1366, height: 768 },
            },
        },
    ],
});
