/**
 * 📅 CASHGAIN CSS-INTERCEPT SAFE DATE DISPLAY HELPER
 * Path: date_formatter.js
 * Feature: Zero Javascript dependency. Zero function blocks.
 */

(function() {
  function forceUIDateFix() {
    const tableBody = document.getElementById('withdrawalTableBody');
    if (!tableBody) return;

    // Har 800ms mein table ko check karega bina rendering process ko chhede
    setInterval(function() {
      const rows = tableBody.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length >= 3) {
          let dateCell = cells[0];
          let text = dateCell.innerText.trim();
          
          // Agar date YYYY-MM-DD format mein dikh rahi hai (e.g., 2026-07-03)
          if (text.includes("-") && text.split("-")[0].length === 4) {
            let p = text.substring(0, 10).split("-");
            dateCell.innerText = p[2] + "-" + p[1] + "-" + p[0];
          }
          // Agar ISO Format ya time timestamp ke sath aa rahi hai
          else if (text.includes("T") || text.includes("GMT")) {
            let d = new Date(text);
            if (!isNaN(d.getTime())) {
              let day = String(d.getDate()).padStart(2, '0');
              let month = String(d.getMonth() + 1).padStart(2, '0');
              let year = d.getFullYear();
              dateCell.innerText = day + "-" + month + "-" + year;
            }
          }
        }
      }
    }, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceUIDateFix);
  } else {
    forceUIDateFix();
  }
})();
