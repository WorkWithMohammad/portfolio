/* ============================================================
   JobNest — design system
   Modern, minimal, indigo accent. Mobile-first.
   ============================================================ */
:root{
  --bg:#f7f8fb;
  --surface:#ffffff;
  --surface-2:#f1f3f9;
  --border:#e5e8ef;
  --text:#0f172a;
  --muted:#64748b;
  --primary:#4f46e5;
  --primary-600:#4338ca;
  --primary-50:#eef2ff;
  --success:#10b981;
  --danger:#ef4444;
  --warn:#f59e0b;
  --radius:14px;
  --radius-sm:10px;
  --shadow-sm:0 1px 2px rgba(15,23,42,.06);
  --shadow:0 8px 24px rgba(15,23,42,.08);
  --shadow-lg:0 20px 50px rgba(15,23,42,.14);
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,sans-serif;
}

*{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:var(--font);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
h1,h2,h3,h4{margin:0 0 .4em;line-height:1.2}
p{line-height:1.55;color:var(--muted)}
button{font-family:inherit;cursor:pointer}

/* ---------- Buttons ---------- */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border:1px solid transparent;background:var(--surface-2);color:var(--text);padding:.6rem 1rem;border-radius:var(--radius-sm);font-weight:600;font-size:.92rem;transition:transform .05s,background .15s,box-shadow .15s}
.btn:hover{background:#e7eaf3}
.btn:active{transform:translateY(1px)}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:var(--primary-600)}
.btn-ghost{background:transparent;border-color:var(--border)}
.btn-ghost:hover{background:var(--surface-2)}
.btn-danger{background:#fee2e2;color:#b91c1c}
.btn-danger:hover{background:#fecaca}
.btn-lg{padding:.85rem 1.4rem;font-size:1rem;border-radius:12px}
.btn-block{width:100%}
.btn-sm{padding:.4rem .7rem;font-size:.82rem}

/* ---------- Topbar ---------- */
.topbar{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:.9rem 1.4rem;background:rgba(255,255,255,.85);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
.brand{font-weight:800;font-size:1.15rem;display:flex;align-items:center;gap:.45rem}
.brand .logo{color:var(--primary);font-size:1.4rem}
.topnav{display:flex;align-items:center;gap:1rem}
.topnav a{color:var(--muted);font-weight:500}
.topnav a:hover{color:var(--text)}

/* ---------- Hero ---------- */
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;align-items:center;max-width:1200px;margin:2.5rem auto 1rem;padding:0 1.4rem}
.hero h1{font-size:clamp(2rem,4.6vw,3.4rem);letter-spacing:-.02em}
.lead{font-size:1.1rem;max-width:38ch}
.hero-cta{margin-top:1.4rem;display:flex;gap:.7rem;flex-wrap:wrap}
.badges{margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;color:var(--muted);font-size:.9rem}

.hero-art{position:relative;height:380px}
.card-float{position:absolute;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow-lg);border-radius:var(--radius);padding:1rem 1.1rem;width:230px;animation:float 6s ease-in-out infinite}
.card-float strong{display:block;margin-bottom:.2rem}
.card-float small{color:var(--muted);display:block;margin-bottom:.6rem}
.card-float .chip{display:inline-block;background:var(--primary-50);color:var(--primary-600);font-size:.72rem;padding:.2rem .55rem;border-radius:999px;margin-right:.3rem;font-weight:600}
.c1{top:10px;left:20px}
.c2{top:130px;right:0;animation-delay:1.5s}
.c3{bottom:0;left:60px;animation-delay:3s}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}

/* ---------- Features ---------- */
.features{max-width:1200px;margin:3rem auto;padding:0 1.4rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
.feature{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.4rem;box-shadow:var(--shadow-sm)}
.feature h3{font-size:1.05rem}

/* ---------- Footer ---------- */
.foot{text-align:center;padding:2rem 1rem;color:var(--muted)}

/* ---------- Modal ---------- */
.modal{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;z-index:50;padding:1rem;animation:fade .15s ease}
.modal[hidden]{display:none}
.modal-card{background:var(--surface);border-radius:18px;width:100%;max-width:440px;padding:1.6rem;position:relative;box-shadow:var(--shadow-lg);max-height:92vh;overflow:auto}
.modal-close{position:absolute;top:10px;right:14px;background:transparent;border:0;font-size:1.6rem;color:var(--muted)}
@keyframes fade{from{opacity:0}to{opacity:1}}

.tabs{display:flex;background:var(--surface-2);border-radius:10px;padding:4px;margin-bottom:1.2rem}
.tab{flex:1;background:transparent;border:0;padding:.55rem;border-radius:8px;font-weight:600;color:var(--muted)}
.tab.active{background:var(--surface);color:var(--text);box-shadow:var(--shadow-sm)}

/* ---------- Forms ---------- */
.auth-form,form.stack{display:flex;flex-direction:column;gap:.85rem}
label{display:flex;flex-direction:column;gap:.35rem;font-size:.85rem;font-weight:600;color:var(--text)}
input[type=text],input[type=email],input[type=password],input[type=search],input[type=url],input[type=number],textarea,select{font:inherit;padding:.65rem .8rem;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);width:100%;transition:border .15s,box-shadow .15s}
input:focus,textarea:focus,select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-50)}
textarea{min-height:90px;resize:vertical}
.form-error{color:var(--danger);font-size:.85rem;margin:0;min-height:1em}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:.85rem}

.role-pick{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
.role-card{position:relative;border:1.5px solid var(--border);border-radius:12px;padding:.8rem;cursor:pointer;background:var(--surface)}
.role-card input{position:absolute;opacity:0}
.role-card span{display:block}
.role-card strong{display:block;font-size:.92rem}
.role-card small{color:var(--muted);font-size:.78rem}
.role-card:has(input:checked){border-color:var(--primary);background:var(--primary-50)}

/* ---------- Dashboard layout ---------- */
.app{display:grid;grid-template-columns:240px 1fr;min-height:100vh}
.sidebar{background:var(--surface);border-right:1px solid var(--border);padding:1.2rem .9rem;display:flex;flex-direction:column;gap:.3rem;position:sticky;top:0;height:100vh}
.sidebar .brand{margin-bottom:1.4rem;padding:0 .4rem}
.side-link{display:flex;align-items:center;gap:.7rem;padding:.6rem .8rem;border-radius:10px;color:var(--muted);font-weight:600;font-size:.92rem;cursor:pointer;background:transparent;border:0;text-align:left;width:100%}
.side-link:hover{background:var(--surface-2);color:var(--text)}
.side-link.active{background:var(--primary-50);color:var(--primary-600)}
.side-link .ico{width:18px;text-align:center}
.side-bottom{margin-top:auto;padding-top:1rem;border-top:1px solid var(--border)}
.user-chip{display:flex;align-items:center;gap:.6rem;padding:.5rem;border-radius:10px}
.avatar{width:34px;height:34px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem}
.user-chip small{display:block;color:var(--muted);font-size:.75rem}

.main{padding:1.6rem 2rem;max-width:1200px;width:100%}
.page-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.4rem;gap:1rem;flex-wrap:wrap}
.page-head h1{font-size:1.6rem;margin:0}
.page-head p{margin:.2rem 0 0}

/* ---------- Cards / grids ---------- */
.grid{display:grid;gap:1rem}
.grid.cols-3{grid-template-columns:repeat(3,1fr)}
.grid.cols-2{grid-template-columns:repeat(2,1fr)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.1rem;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:.6rem}
.card h3{font-size:1.05rem;margin:0}
.card .meta{color:var(--muted);font-size:.85rem;display:flex;gap:.7rem;flex-wrap:wrap}
.card .actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:auto;padding-top:.4rem}

.chips{display:flex;gap:.35rem;flex-wrap:wrap}
.chip{display:inline-block;background:var(--primary-50);color:var(--primary-600);font-size:.74rem;padding:.22rem .6rem;border-radius:999px;font-weight:600}
.chip-muted{background:var(--surface-2);color:var(--muted)}

.stat{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.2rem;box-shadow:var(--shadow-sm)}
.stat .num{font-size:1.7rem;font-weight:800;color:var(--text)}
.stat .lbl{color:var(--muted);font-size:.85rem;margin-top:.15rem}

.empty{text-align:center;padding:3rem 1rem;color:var(--muted);background:var(--surface);border:1px dashed var(--border);border-radius:var(--radius)}

/* ---------- Toolbar (search + filters) ---------- */
.toolbar{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;background:var(--surface);border:1px solid var(--border);padding:.8rem;border-radius:var(--radius);margin-bottom:1.2rem;box-shadow:var(--shadow-sm)}
.toolbar input,.toolbar select{flex:1;min-width:140px}
.toolbar input[type=search]{flex:2}

/* ---------- Tables ---------- */
.table{width:100%;border-collapse:collapse;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
.table th,.table td{text-align:left;padding:.75rem 1rem;border-bottom:1px solid var(--border);font-size:.92rem}
.table th{background:var(--surface-2);font-weight:700;color:var(--muted);font-size:.78rem;text-transform:uppercase;letter-spacing:.04em}
.table tr:last-child td{border-bottom:0}

/* ---------- Toast ---------- */
.toast-wrap{position:fixed;bottom:1.2rem;right:1.2rem;display:flex;flex-direction:column;gap:.5rem;z-index:80}
.toast{background:var(--text);color:#fff;padding:.7rem 1rem;border-radius:10px;box-shadow:var(--shadow-lg);font-size:.9rem;animation:slide .25s ease}
.toast.success{background:var(--success)}
.toast.error{background:var(--danger)}
@keyframes slide{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}

/* ---------- Mobile menu toggle ---------- */
.menu-toggle{display:none;background:transparent;border:0;font-size:1.4rem;color:var(--text)}

/* ---------- Responsive ---------- */
@media (max-width:980px){
  .hero{grid-template-columns:1fr;text-align:left}
  .hero-art{display:none}
  .features{grid-template-columns:1fr}
  .grid.cols-3{grid-template-columns:1fr 1fr}
}
@media (max-width:760px){
  .app{grid-template-columns:1fr}
  .sidebar{position:fixed;left:0;top:0;height:100vh;width:240px;transform:translateX(-100%);transition:transform .2s;z-index:40;box-shadow:var(--shadow-lg)}
  .sidebar.open{transform:translateX(0)}
  .menu-toggle{display:inline-flex}
  .main{padding:1rem}
  .grid.cols-3,.grid.cols-2{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
  .topnav a:not(.btn){display:none}
}
