"use strict";

const Accounts = require("./app/controllers/accounts");
const POIs = require("./app/controllers/pois");
const Admins = require("./app/controllers/admins");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: "GET", path: "/adminDashboard", config: Admins.adminDashboard },
  { method: "GET", path: "/showAdminSignup", config: Admins.showAdminSignup },
  { method: "GET", path: "/showAdminLogin", config: Admins.showAdminLogin },
  { method: "GET", path: "/adminLogout", config: Admins.adminLogout },
  { method: "POST", path: "/adminSignup", config: Admins.adminSignup },
  { method: "POST", path: "/adminLogin", config: Admins.adminLogin },
  { method: "GET", path: "/deleteUser/{_id}", config: Admins.deleteUser },
  { method: "GET", path: "/adminDeletePOI/{_id}", config: Admins.adminDeletePOI },
  { method: "GET", path: "/showAdminEditPOI/{_id}", config: Admins.showAdminEditPOI },
  { method: "POST", path: "/adminEditPOI/{_id}", config: Admins.adminEditPOI },

  { method: "GET", path: "/home", config: POIs.home },
  { method: "POST", path: "/addPOI", config: POIs.addPOI },
  { method: "GET", path: "/report", config: POIs.report },
  { method: "GET", path: "/showEditPOI/{_id}", config: POIs.showEditPOI },
  { method: "POST", path: "/editPOI/{_id}", config: POIs.editPOI },
  { method: "GET", path: "/deletePOI/{_id}", config: POIs.deletePOI },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];