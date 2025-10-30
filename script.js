document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const first = document.getElementById('firstName').value.trim();
  const last = document.getElementById('lastName').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!first || !last || !pass) {
    alert("Please fill in all fields.");
    return;
  }

  // ✅ Simple dummy login (you can change credentials if you want)
  if (pass === "trainer123") {
    alert(`Welcome ${first} ${last}! Redirecting to COI Form...`);
    window.location.href = "acord25.pdf"; // direct route to the PDF
  } else {
    alert("Invalid password. Try again.");
  }
});
