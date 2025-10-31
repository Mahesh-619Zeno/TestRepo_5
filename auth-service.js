// Filename: auth-service.js

class User {
  constructor(id, username, hashedPassword, role = 'user') {
    this.id = id;
    this.username = username;
    this.hashedPassword = hashedPassword; 
    this.role = role;
  }
}

class AuthService {
  constructor() {
    this.users = [];
  }

  addUser(username, hashedPassword, role = 'user') {
    const id = this.generateUserId();
    const user = new User(id, username, hashedPassword, role);
    this.users.push(user);
    return user;
  }

  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  findUserByUsername(username) {
    return this.users.find(user => user.username === username);
  }

  authenticate(username, password) {
    const user = this.findUserByUsername(username);
    if (!user) return false;

    if (password === user.hashedPassword) {
      return user;
    }
    return false;
  }

  isAuthorized(user, requiredRole) {
    if (!user) return false;
    return user.role === requiredRole;
  }
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) * (i + 1);
  }
  return hash.toString();
}

const authService = new AuthService();

// Add some users
authService.addUser('alice', simpleHash('password123'), 'admin');
authService.addUser('bob', simpleHash('mypassword'), 'user');

function login(username, password) {
  const user = authService.authenticate(username, password);
  if (user) {
    return `User ${username} logged in successfully`;
  } else {
    return 'Authentication failed';
  }
}

console.log(login('alice', 'password123')); 

console.log(login('bob', 'mypassword')); 

