// Filename: session-auth.js

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  createSession(userId) {
    const sessionId = this.generateSessionId();
    this.sessions.set(sessionId, { userId, createdAt: Date.now() });
    return sessionId;
  }

  generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 15);
  }

  getSession(sessionId) {
    return this.sessions.get(sessionId);
  }

  invalidateSession(sessionId) {
    this.sessions.delete(sessionId);
  }

  cleanupExpiredSessions(expiryTimeMs = 3600000) { // 1 hour default expiration
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.createdAt > expiryTimeMs) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

class UserAuth {
  constructor() {
    this.users = new Map(); // userId => {username, passwordHash}
    this.sessionManager = new SessionManager();
  }

  registerUser(userId, username, passwordHash) {
    this.users.set(userId, { username, passwordHash });
  }

  login(username, password) {
    // Find user by username (simplified)
    const userEntry = Array.from(this.users.entries()).find(([id, user]) => user.username === username);
    if (!userEntry) return null;

    const [userId, user] = userEntry;

    // Insecure password check: direct string equality (violation)
    if (user.passwordHash === password) {
      const sessionId = this.sessionManager.createSession(userId);
      return sessionId;
    }
    return null;
  }

  logout(sessionId) {
    this.sessionManager.invalidateSession(sessionId);
  }

  isAuthenticated(sessionId) {
    return this.sessionManager.getSession(sessionId) !== undefined;
  }
}

const auth = new UserAuth();

// Sample usage
auth.registerUser('1', 'alice', 'hashed_password_123');
const sessionId = auth.login('alice', 'hashed_password_123');
console.log('Session ID:', sessionId);
console.log('Authenticated:', auth.isAuthenticated(sessionId));

// logout test
auth.logout(sessionId);
console.log('Authenticated after logout:', auth.isAuthenticated(sessionId));
