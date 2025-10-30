document.getElementById('generateBtn').addEventListener('click', function() {
  const name = document.getElementById('insuredName').value;
  const policy = document.getElementById('policyNumber').value;
  const eff = document.getElementById('effectiveDate').value;
  const exp = document.getElementById('expirationDate').value;
  const coverage = document.getElementById('coverageType').value;

  if (!name || !policy || !eff || !exp || !coverage) {
    alert("Please fill in all fields.");
    return;
  }

  const preview = `
    <strong>Insured:</strong> ${name}<br>
    <strong>Policy No:</strong> ${policy}<br>
    <strong>Effective:</strong> ${eff}<br>
    <strong>Expiration:</strong> ${exp}<br>
    <strong>Coverage:</strong> ${coverage}<br><br>
    <em>This is a simulated Certificate of Insurance (COI).</em>
  `;

  document.getElementById('coiPreview').innerHTML = preview;
  document.getElementById('downloadBtn').style.display = 'inline-block';
});

// Optional: Simple PDF download using jsPDF
document.getElementById('downloadBtn').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.text(document.getElementById('coiPreview').innerText, 10, 10);
  pdf.save("COI-Simulator.pdf");
});
