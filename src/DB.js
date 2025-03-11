class Database {
  constructor() {
    this.users = {};
    this.currentUser = null;
  }

  saveUser(username, chips = 1000) {
    if (!this.users[username]) {
      this.users[username] = {
        chips: chips,
        history: [],
      };
    }
    return this.users[username];
  }

  updateChips(username, amount) {
    if (this.users[username]) {
      this.users[username].chips += amount;
      return this.users[username].chips;
    }
    return 0;
  }

  addBetHistory(username, option, amount, multiplier, result) {
    if (this.users[username]) {
      this.users[username].history.unshift({
        option,
        amount,
        multiplier,
        result,
        timestamp: new Date().toISOString(),
      });

      // Limit history to 100 items
      if (this.users[username].history.length > 100) {
        this.users[username].history.pop();
      }
    }
  }

  getAllUsers() {
    return this.users;
  }

  resetAllUsers() {
    this.users = {};
  }
}

// Create a singleton instance of the Database
const dbInstance = new Database();

export default dbInstance;
