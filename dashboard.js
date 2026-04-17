/* ============================================================
   ui.js
   Tiny shared UI helpers: toast, escape, formatting, sidebar.
   ============================================================ */
(function (global) {
  function ensureToastWrap() {
    let w = document.querySelector('.toast-wrap');
    if (!w) { w = document.createElement('div'); w.className = 'toast-wrap'; document.body.appendChild(w); }
    return w;
  }
  function toast(msg, kind = '') {
    const w = ensureToastWrap();
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.textContent = msg;
    w.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }
  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }
  function timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return 'just now';
    const m = Math.floor(s/60); if (m < 60) return m+'m ago';
    const h = Math.floor(m/60); if (h < 24) return h+'h ago';
    const d = Math.floor(h/24); if (d < 30) return d+'d ago';
    return new Date(ts).toLocaleDateString();
  }
  function bytes(n) {
    if (n < 1024) return n+' B';
    if (n < 1024*1024) return (n/1024).toFixed(1)+' KB';
    return (n/1024/1024).toFixed(1)+' MB';
  }
  function initials(name) {
    return (name || '?').split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase();
  }
  function readFileAsDataURL(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  /** Build sidebar + topbar shell for an authed page. */
  function renderShell({ user, active, links }) {
    const root = Auth.resolveRoot();
    const side = `
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="${root}index.html"><span class="logo">●</span> JobNest</a>
        ${links.map(l => `
          <a class="side-link ${l.key===active?'active':''}" href="${l.href}">
            <span class="ico">${l.icon}</span><span>${l.label}</span>
          </a>`).join('')}
        <div class="side-bottom">
          <div class="user-chip">
            <div class="avatar">${escapeHtml(initials(user.name))}</div>
            <div>
              <div style="font-weight:700;font-size:.9rem">${escapeHtml(user.name)}</div>
              <small>${user.role}</small>
            </div>
          </div>
          <button class="side-link" id="logoutBtn" style="margin-top:.4rem"><span class="ico">⎋</span><span>Log out</span></button>
        </div>
      </aside>`;
    return side;
  }

  function bindShellEvents() {
    const btn = document.getElementById('logoutBtn');
    if (btn) btn.addEventListener('click', () => Auth.logout());
    const tog = document.getElementById('menuToggle');
    const side = document.getElementById('sidebar');
    if (tog && side) tog.addEventListener('click', () => side.classList.toggle('open'));
  }

  global.UI = { toast, escapeHtml, timeAgo, bytes, initials, readFileAsDataURL, renderShell, bindShellEvents };
})(window);
