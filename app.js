/* ============================================================
   storage.js
   Thin wrapper around localStorage. All persistence flows here
   so swapping to a real backend later is a one-file change.
   ============================================================ */
(function (global) {
  const KEYS = {
    users: 'jn.users',           // [{id,role,name,email,passwordHash,createdAt}]
    profiles: 'jn.profiles',     // { [userId]: { ...applicantOrCompanyProfile } }
    jobs: 'jn.jobs',             // [{id, companyId, title, ...}]
    applications: 'jn.apps',     // [{id, jobId, applicantId, status, appliedAt}]
    notes: 'jn.notes',           // { [userId]: [{id, title, body, createdAt}] }
    documents: 'jn.docs',        // { [userId]: [{id, name, type, size, dataUrl}] }
    session: 'jn.session',       // { userId }
  };

  const read = (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

  // Tiny non-cryptographic hash (demo only — never use for real auth).
  const hash = (s) => {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
    return (h >>> 0).toString(16);
  };

  const Store = {
    KEYS, read, write, uid, hash,

    // Users
    getUsers: () => read(KEYS.users, []),
    saveUsers: (u) => write(KEYS.users, u),
    findUserByEmail: (email) => Store.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()),
    getUser: (id) => Store.getUsers().find(u => u.id === id) || null,

    // Profiles
    getProfile: (userId) => (read(KEYS.profiles, {})[userId]) || null,
    saveProfile: (userId, profile) => {
      const all = read(KEYS.profiles, {});
      all[userId] = { ...(all[userId] || {}), ...profile, updatedAt: Date.now() };
      write(KEYS.profiles, all);
      return all[userId];
    },

    // Jobs
    getJobs: () => read(KEYS.jobs, []),
    saveJobs: (j) => write(KEYS.jobs, j),
    addJob: (job) => {
      const list = Store.getJobs();
      const item = { id: uid(), createdAt: Date.now(), ...job };
      list.unshift(item);
      Store.saveJobs(list);
      return item;
    },
    updateJob: (id, patch) => {
      const list = Store.getJobs().map(j => j.id === id ? { ...j, ...patch } : j);
      Store.saveJobs(list);
    },
    deleteJob: (id) => {
      Store.saveJobs(Store.getJobs().filter(j => j.id !== id));
      // Remove related applications
      Store.saveApplications(Store.getApplications().filter(a => a.jobId !== id));
    },

    // Applications
    getApplications: () => read(KEYS.applications, []),
    saveApplications: (a) => write(KEYS.applications, a),
    addApplication: (app) => {
      const list = Store.getApplications();
      // prevent duplicate
      if (list.some(a => a.jobId === app.jobId && a.applicantId === app.applicantId)) return null;
      const item = { id: uid(), status: 'pending', appliedAt: Date.now(), ...app };
      list.unshift(item);
      Store.saveApplications(list);
      return item;
    },
    updateApplication: (id, patch) => {
      Store.saveApplications(Store.getApplications().map(a => a.id === id ? { ...a, ...patch } : a));
    },

    // Notes
    getNotes: (userId) => (read(KEYS.notes, {})[userId]) || [],
    addNote: (userId, note) => {
      const all = read(KEYS.notes, {});
      const list = all[userId] || [];
      const item = { id: uid(), createdAt: Date.now(), ...note };
      list.unshift(item);
      all[userId] = list;
      write(KEYS.notes, all);
      return item;
    },
    deleteNote: (userId, id) => {
      const all = read(KEYS.notes, {});
      all[userId] = (all[userId] || []).filter(n => n.id !== id);
      write(KEYS.notes, all);
    },

    // Documents (base64)
    getDocs: (userId) => (read(KEYS.documents, {})[userId]) || [],
    addDoc: (userId, doc) => {
      const all = read(KEYS.documents, {});
      const list = all[userId] || [];
      const item = { id: uid(), uploadedAt: Date.now(), ...doc };
      list.unshift(item);
      all[userId] = list;
      write(KEYS.documents, all);
      return item;
    },
    deleteDoc: (userId, id) => {
      const all = read(KEYS.documents, {});
      all[userId] = (all[userId] || []).filter(d => d.id !== id);
      write(KEYS.documents, all);
    },

    // Session
    getSession: () => read(KEYS.session, null),
    setSession: (s) => write(KEYS.session, s),
    clearSession: () => localStorage.removeItem(KEYS.session),

    // Utility: seed demo data on first run
    seedIfEmpty() {
      if (Store.getJobs().length || Store.getUsers().length) return;
      // Demo company
      const companyId = uid();
      const company = {
        id: companyId, role: 'company', name: 'Acme Corp',
        email: 'demo@acme.com', passwordHash: hash('demo123'), createdAt: Date.now(),
      };
      Store.saveUsers([company]);
      Store.saveProfile(companyId, {
        companyName: 'Acme Corp',
        description: 'A friendly demo company hiring great people.',
        website: 'https://acme.example',
      });
      const seedJobs = [
        { title: 'Senior Frontend Engineer', location: 'Remote', type: 'Full-time', salary: '$120k–$150k',
          description: 'Build a delightful product UI in React/TS.', skills: ['React','TypeScript','CSS'] },
        { title: 'Product Designer', location: 'Berlin', type: 'Hybrid', salary: '€70k–€90k',
          description: 'Own end-to-end design for new features.', skills: ['Figma','UX','Prototyping'] },
        { title: 'Data Analyst', location: 'Remote', type: 'Contract', salary: '$60/hr',
          description: 'Turn data into decisions with SQL & Python.', skills: ['SQL','Python','Dashboards'] },
      ];
      seedJobs.forEach(j => Store.addJob({ ...j, companyId, companyName: 'Acme Corp' }));
    }
  };

  global.Store = Store;
})(window);
