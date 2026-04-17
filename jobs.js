/* ============================================================
   auth.js
   Signup / login / logout / session guard.
   Uses Store from storage.js. Demo-only password hashing.
   ============================================================ */
(function (global) {
  const Auth = {
    current() {
      const s = Store.getSession();
      return s ? Store.getUser(s.userId) : null;
    },

    signup({ name, email, password, role }) {
      if (!name || name.trim().length < 2) throw new Error('Please enter a valid name.');
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Please enter a valid email.');
      if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.');
      if (!['applicant','company'].includes(role)) throw new Error('Pick a role.');
      if (Store.findUserByEmail(email)) throw new Error('An account with this email already exists.');

      const user = {
        id: Store.uid(),
        role,
        name: name.trim(),
        email: email.trim(),
        passwordHash: Store.hash(password),
        createdAt: Date.now(),
      };
      const users = Store.getUsers();
      users.push(user);
      Store.saveUsers(users);

      // Initialize empty profile shell
      if (role === 'applicant') {
        Store.saveProfile(user.id, { fullName: name, skills: [], education: '', bio: '' });
      } else {
        Store.saveProfile(user.id, { companyName: name, description: '', website: '' });
      }
      Store.setSession({ userId: user.id });
      return user;
    },

    login({ email, password }) {
      const user = Store.findUserByEmail(email || '');
      if (!user || user.passwordHash !== Store.hash(password || '')) {
        throw new Error('Invalid email or password.');
      }
      Store.setSession({ userId: user.id });
      return user;
    },

    logout() {
      Store.clearSession();
      window.location.href = resolveRoot() + 'index.html';
    },

    /** Redirect to login if not signed in. Optionally enforce role. */
    require(role) {
      const user = Auth.current();
      if (!user) { window.location.href = resolveRoot() + 'index.html'; return null; }
      if (role && user.role !== role) {
        window.location.href = resolveRoot() + (user.role === 'applicant' ? 'pages/applicant-dashboard.html' : 'pages/company-dashboard.html');
        return null;
      }
      return user;
    },

    /** Send freshly-logged-in user to the right dashboard. */
    routeToDashboard(user) {
      const root = resolveRoot();
      window.location.href = root + (user.role === 'applicant' ? 'pages/applicant-dashboard.html' : 'pages/company-dashboard.html');
    }
  };

  // Figure out the path back to the project root from the current page.
  function resolveRoot() {
    return location.pathname.includes('/pages/') ? '../' : '';
  }
  Auth.resolveRoot = resolveRoot;

  global.Auth = Auth;
})(window);
