<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Job · JobNest</title>
<link rel="stylesheet" href="../css/styles.css" />
</head>
<body>
<header class="topbar">
  <a class="brand" href="../index.html"><span class="logo">●</span> JobNest</a>
  <nav class="topnav">
    <a href="jobs.html">All jobs</a>
    <span id="authNav"></span>
  </nav>
</header>
<main style="max-width:880px;margin:1.5rem auto;padding:0 1.4rem" id="root"></main>

<script src="../js/storage.js"></script>
<script src="../js/auth.js"></script>
<script src="../js/ui.js"></script>
<script>
  Store.seedIfEmpty();
  const user = Auth.current();
  const nav = document.getElementById('authNav');
  nav.innerHTML = user
    ? `<a class="btn btn-primary" href="${user.role==='applicant'?'applicant-dashboard.html':'company-dashboard.html'}">Dashboard</a>`
    : `<a class="btn btn-primary" href="../index.html">Login / Sign up</a>`;

  const id = new URLSearchParams(location.search).get('id');
  const job = Store.getJobs().find(j => j.id === id);
  const root = document.getElementById('root');
  if (!job) { root.innerHTML = `<div class="empty">Job not found.</div>`; }
  else {
    const apps = Store.getApplications().filter(a => a.jobId === job.id);
    const myApp = user ? apps.find(a => a.applicantId === user.id) : null;
    root.innerHTML = `
      <a href="jobs.html" style="color:var(--muted);font-size:.9rem">← Back to jobs</a>
      <article class="card" style="margin-top:.6rem">
        <h1 style="margin:.2rem 0">${UI.escapeHtml(job.title)}</h1>
        <div class="meta">
          <span>🏢 ${UI.escapeHtml(job.companyName||'—')}</span>
          <span>📍 ${UI.escapeHtml(job.location||'—')}</span>
          <span>💼 ${UI.escapeHtml(job.type||'—')}</span>
          ${job.salary?`<span>💰 ${UI.escapeHtml(job.salary)}</span>`:''}
          <span>🗓 Posted ${UI.timeAgo(job.createdAt)}</span>
        </div>
        <div class="chips">${(job.skills||[]).map(s=>`<span class="chip">${UI.escapeHtml(s)}</span>`).join('')}</div>
        <p style="white-space:pre-wrap;color:var(--text)">${UI.escapeHtml(job.description||'')}</p>
        <div class="actions">
          ${(!user || user.role==='applicant') ? (myApp
            ? `<span class="chip" style="background:#dcfce7;color:#166534">✓ You applied · ${UI.timeAgo(myApp.appliedAt)}</span>`
            : `<button id="applyBtn" class="btn btn-primary">Apply now</button>`) : ''}
        </div>
        <small style="color:var(--muted)">${apps.length} applicant${apps.length===1?'':'s'} so far</small>
      </article>`;

    const btn = document.getElementById('applyBtn');
    if (btn) btn.addEventListener('click', () => {
      if (!user) { UI.toast('Please log in to apply.', 'error'); setTimeout(()=>location.href='../index.html', 600); return; }
      const r = Store.addApplication({ jobId: job.id, applicantId: user.id });
      if (!r) UI.toast('Already applied.');
      else { UI.toast('Application submitted!', 'success'); setTimeout(()=>location.reload(), 500); }
    });
  }
</script>
</body>
</html>
