const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Load the HTML file
  const htmlPath = path.join(__dirname, 'pdf.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  
  // Generate PDF
  await page.pdf({
    path: 'guardians-handbook-olekminsk.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  });
  
  await browser.close();
  console.log('✅ PDF created: guardians-handbook-olekminsk.pdf');
})();
