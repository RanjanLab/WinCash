/**
 * 📅 CASHGAIN DYNAMIC DOM INTERCEPT DATE CONVERTER
 * Path: date_formatter.js
 * Feature: 100% Safe element text parser. Purane kisi logic ko block nahi karta.
 */

(function() {
  function startSafeInterception() {
    const tableBody = document.getElementById('withdrawalTableBody');
    if (!tableBody) return;

    // MutationObserver data render hone ka intezar karega aur sirf date text ko badlega
    const observer = new MutationObserver(function(mutations) {
      const rows = tableBody.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        
        // Agar real rows load ho chuki hain (Col size = 3)
        if (cells.length >= 3) {
          let dateCell = cells[0];
          let rawText = dateCell.innerText.trim();
          
          // Case A: Agar raw data YYYY-MM-DD format mein render hua hai
          if (rawText.includes("-") && rawText.split("-")[0].length === 4) {
            let parts = rawText.substring(0, 10).split("-");
            dateCell.innerText = `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
          // Case B: Agar raw data dynamic ISO/JSON String standard format hai
          else if (rawText.includes("T") || (rawText.includes("/") && rawText.split("/")[0].length === 4)) {
            let cleanText = rawText.replace("T", " ").split(" ")[0];
            let divider = cleanText.includes("-") ? "-" : "/";
            let parts = cleanText.split(divider);
            if (parts.length === 3) {
              dateCell.innerText = `${parts[2].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[0]}`;
            }
          }
          // Case C: Agar raw date standard date object string format hai
          else if (rawText.length > 10 && !isNaN(Date.parse(rawText))) {
            let d = new Date(rawText);
            if (!isNaN(d.getTime())) {
              let day = String(d.getDate()).padStart(2, '0');
              let month = String(d.getMonth() + 1).padStart(2, '0');
              let year = d.getFullYear();
              dateCell.innerText = `${day}-${month}-${year}`;
            }
          }
        }
      }
    });

    // Observer options configuration
    observer.observe(tableBody, { childList: true, subtree: true });
  }

  // Runtime context initiation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSafeInterception);
  } else {
    startSafeInterception();
  }
})();
