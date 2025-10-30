// Check login
window.addEventListener('DOMContentLoaded', () => {
  const first = localStorage.getItem('firstName');
  const last = localStorage.getItem('lastName');

  if (!first || !last) {
    window.location.href = "index.html"; // if not logged in, go back
    return;
  }

  const welcome = document.getElementById('welcomeUser');
  if (welcome) {
    welcome.textContent = `Welcome, ${first} ${last}!`;
  }
});

// COI generator
const btn = document.getElementById('generateBtn');
if (btn) {
  btn.addEventListener('click', async function() {
    const name = document.getElementById('insuredName').value;
    const policy = document.getElementById('policyNumber').value;
    const eff = document.getElementById('effectiveDate').value;
    const exp = document.getElementById('expirationDate').value;
    const coverage = document.getElementById('coverageType').value;

    if (!name || !policy || !eff || !exp || !coverage) {
      alert("Please fill in all fields.");
      return;
    }

    const formUrl = 'acord25.pdf';
    const existingPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Example text positions - adjust for your form layout
    firstPage.drawText(name, { x: 130, y: 690, size: 10 });
    firstPage.drawText(policy, { x: 350, y: 620, size: 10 });
    firstPage.drawText(eff, { x: 110, y: 580, size: 10 });
    firstPage.drawText(exp, { x: 240, y: 580, size: 10 });
    firstPage.drawText(coverage, { x: 100, y: 540, size: 10 });

    // Add dummy Producer (for training purposes)
    firstPage.drawText("Producer: LAVA Safeco Insurance Co.", { x: 100, y: 750, size: 10, color: rgb(0, 0, 1) });
    firstPage.drawText("Contact: trainer@lava-safe.co", { x: 100, y: 735, size: 10, color: rgb(0, 0, 1) });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Generated-COI.pdf';
    a.click();
  });
}
