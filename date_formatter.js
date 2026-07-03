/**
 * 📅 CASHGAIN INDEPENDENT UI DATE CONVERTER
 * File Name: date_formatter.js
 * Feature: Kisi bhi chalte hue backend ya frontend code ko touch kiye bina, 
 * sirf display ke waqt date ko dd-MM-yyyy format mein convert karta hai.
 */

(function() {
  // Jab poori window aur purana script load ho jaye, tab yeh chalega
  window.addEventListener('load', function() {
    
    // Purane chalte hue 'formatCleanDate' function ka backup le lete hain
    if (typeof window.formatCleanDate === 'function') {
      const originalFormatCleanDate = window.formatCleanDate;
      
      // Purane function ko touch kiye bina uske upar naya hard-locked format override kar rahe hain
      window.formatCleanDate = function(rawDate) {
        if (!rawDate) return "N/A";
        let dateStr = rawDate.toString().trim();
        
        // Check 1: Agar date pehle se hi sahi dd-MM-yyyy string format mein hai
        if (dateStr.includes("-") && dateStr.split("-")[0].length === 2) {
          return dateStr.substring(0, 10);
        }
        
        try {
          // Check 2: Agar ISO format (YYYY-MM-DD...) aa raha hai
          if (dateStr.includes("-") && dateStr.split("-")[0].length === 4) {
            let parts = dateStr.substring(0, 10).split("-");
            if (parts.length === 3) {
              return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to DD-MM-YYYY
            }
          }
          
          // Check 3: Agar standard system date object ya numeric string hai
          let d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            let day = String(d.getDate()).padStart(2, '0');
            let month = String(d.getMonth() + 1).padStart(2, '0');
            let year = d.getFullYear();
            return `${day}-${month}-${year}`;
          }
        } catch(e) {
          console.log("Date formatting bypass applied.");
        }
        
        // Agar kuch samajh na aaye, toh original chalte hue function ka output return karega
        return originalFormatCleanDate(rawDate);
      };
      
      // History ko automatic refresh karne ke liye ek baar fir se function call trigger karenge
      if (typeof window.loadWithdrawalHistory === 'function') {
        setTimeout(window.loadWithdrawalHistory, 500);
      }
    }
  });
})();
