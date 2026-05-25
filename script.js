/* ═══════════════════════════════════════
   GIFT SITE — script.js
═══════════════════════════════════════ */

// ──────────────────────────────────────
// !! ПРОМЕНИ ТОВА — датата на запознанството
// Формат: ДД/ММ/ГГГГ
// ──────────────────────────────────────
const CORRECT_DATE = "24/02/2026"; // <-- СМЕНИ ТУК

// ──────────────────────────────────────
// Funny Bulgarian error messages
// ──────────────────────────────────────
const errorMessages = [
  "Грешно 😐 Опитай пак, умничке.",
  "Хм. Явно не помниш. Интересно. 🤔",
  "Не е това. Дали изобщо помниш? 👀",
  "Нееее. Мисли по-добре. 🙃",
  "Пак грешно. Може би ти трябва подсказка? 💀",
  "Стъпи назад и се замисли. 😌",
  "Ако беше правилно щях да те пусна. Но не е. 🚪",
  "Любопитно. Толкова много опити. Не те ли е срам. 😂",
  "Бъди сериозна, имаш само едно сърце, пази го за верния отговор ❤️",
  "Аз чакам. Цял ден. 🙄",
];

let errorCount = 0;

// ──────────────────────────────────────
// Format input as DD/MM/YYYY while typing
// ──────────────────────────────────────
const dateInput = document.getElementById("date-input");

dateInput.addEventListener("input", (e) => {
  let val = e.target.value.replace(/\D/g, ""); // digits only
  if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
  if (val.length > 5) val = val.slice(0, 5) + "/" + val.slice(5);
  e.target.value = val.slice(0, 10);
});

dateInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkLogin();
});

// ──────────────────────────────────────
// Login check
// ──────────────────────────────────────
function checkLogin() {
  const val = dateInput.value.trim();
  const errorEl = document.getElementById("error-msg");

  if (val === CORRECT_DATE) {
    errorEl.textContent = "";
    goTo("welcome-page");
  } else {
    const msg = errorMessages[errorCount % errorMessages.length];
    errorCount++;
    errorEl.textContent = msg;
    dateInput.classList.add("shake");
    setTimeout(() => dateInput.classList.remove("shake"), 500);
  }
}

// ──────────────────────────────────────
// Page transitions
// ──────────────────────────────────────
function goTo(targetId) {
  const current = document.querySelector(".page.active");
  const target = document.getElementById(targetId);
  if (!target || !current) return;

  // Fade out current
  current.classList.remove("visible");

  setTimeout(() => {
    current.classList.remove("active");
    target.classList.add("active");

    // Force reflow then fade in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.classList.add("visible");
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });
  }, 350);
}

// ──────────────────────────────────────
// Voucher flip
// ──────────────────────────────────────
function flipVoucher(el) {
  el.classList.toggle("flipped");

  // Little haptic-style feedback on mobile
  if (navigator.vibrate) navigator.vibrate(20);
}

// ──────────────────────────────────────
// Init — show first page
// ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const firstPage = document.getElementById("login-page");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      firstPage.classList.add("visible");
    });
  });
});

// ──────────────────────────────────────
// Shake animation (CSS injected via JS
// to keep CSS file clean)
// ──────────────────────────────────────
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
  .shake { animation: shake 0.4s ease; }
`;
document.head.appendChild(shakeStyle);
