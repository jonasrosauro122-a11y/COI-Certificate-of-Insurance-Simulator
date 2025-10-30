document.getElementById('generateBtn').addEventListener('click', async function() {
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

  // Adjust x/y to match where you want text to appear
  firstPage.drawText(name, { x: 130, y: 690, size: 10 });
  firstPage.drawText(policy, { x: 350, y: 620, size: 10 });
  firstPage.drawText(eff, { x: 110, y: 580, size: 10 });
  firstPage.drawText(exp, { x: 240, y: 580, size: 10 });
  firstPage.drawText(coverage, { x: 100, y: 540, size: 10 });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'Generated-COI.pdf';
  a.click();
});
