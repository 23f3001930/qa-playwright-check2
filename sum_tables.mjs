import { chromium } from 'playwright';

const seeds = Array.from({ length: 10 }, (_, i) => 19 + i);
let totalSum = 0;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const seed of seeds) {
  const url = `https://datadash-iitm.vercel.app/seed/${seed}`;
  await page.goto(url);
  const numbers = await page.$$eval('table td', tds =>
    tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
  );
  const sum = numbers.reduce((a, b) => a + b, 0);
  console.log(`Seed ${seed} sum: ${sum}`);
  totalSum += sum;
}

console.log(`✅ Total sum of all tables: ${totalSum}`);
await browser.close();
