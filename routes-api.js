const Users = require('./app/api/users');
const Pois = require("./app/api/pois");


module.exports = [
  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: Users.authenticate },

  { method: "GET", path: "/api/pois", config: Pois.findAll },
  { method: "GET", path: "/api/users/{id}/pois", config: Pois.findByUser },
  { method: "POST", path: "/api/users/{id}/pois", config: Pois.addPoi },
  { method: "DELETE", path: "/api/pois", config: Pois.deleteAll },
];