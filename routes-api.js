const Users = require('./app/api/users');
const Pois = require("./app/api/pois");
const Admins = require("./app/api/admins");


module.exports = [
  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: Users.authenticate },
  { method: "PUT", path: "/api/users/{id}", config: Users.update },

  { method: "GET", path: "/api/pois", config: Pois.findAll },
  { method: "GET", path: "/api/users/{id}/pois", config: Pois.findByUser },
  { method: "POST", path: "/api/users/{id}/pois", config: Pois.addPoi },
  { method: "DELETE", path: "/api/pois", config: Pois.deleteAll },

  { method: 'GET', path: '/api/admins', config: Admins.find },
  { method: 'GET', path: '/api/admins/{id}', config: Admins.findOne },
  { method: "POST", path: "/api/admins", config: Admins.create },
  { method: "DELETE", path: "/api/admins/{id}", config: Admins.deleteOne },
  { method: "DELETE", path: "/api/admins", config: Admins.deleteAll },
  { method: "POST", path: "/api/admins/authenticate", config: Admins.authenticateAdmin },
  { method: "PUT", path: "/api/admins/{id}", config: Admins.update },
];