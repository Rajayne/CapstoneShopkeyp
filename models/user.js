const db = require("../db");

class User {
  constructor({
    user_id,
    username,
    profile_image,
    balance,
    is_admin,
    active,
    date_created,
  }) {
    this.user_id = user_id;
    this.username = username;
    this.profile_image = profile_image;
    this.balance = balance;
    this.is_admin = is_admin;
    this.active = active;
    this.date_created = date_created;
  }
}
