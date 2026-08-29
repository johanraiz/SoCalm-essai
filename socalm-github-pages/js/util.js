function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function navigate(route) {
  window.location.hash = route;
}

let toastTimer = null;
function toast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

function backRow(label, onBack) {
  return `<div class="back-row"><button class="back" data-back>‹ ${escapeHtml(label)}</button></div>`;
}

function wireBack(root, handler) {
  const btn = root.querySelector("[data-back]");
  if (btn) btn.addEventListener("click", handler);
}
