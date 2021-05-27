"use strict";

const axios = require("axios");
const baseUrl = "http://localhost:4000";

class poiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + "/api/users");
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + "/api/users", newUser);
    return response.data;
  }

  async deleteAllUsers() {
    const response = await axios.delete(this.baseUrl + "/api/users");
    return response.data;
  }

  async deleteOneUser(id) {
    const response = await axios.delete(this.baseUrl + "/api/users/" + id);
    return response.data;
  }

  async addPoi(id, poi) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/" + id + "/pois", poi);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getAllPois() {
    const response = await axios.get(this.baseUrl + "/api/pois");
    return response.data;
  }

  async getPoi(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/pois/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPois(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id + "/pois");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPois() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/pois");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }

  async getAdmins() {
    const response = await axios.get(this.baseUrl + "/api/admins");
    return response.data;
  }

  async getAdmin(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/admins/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createAdmin(newAdmin) {
    const response = await axios.post(this.baseUrl + "/api/admins", newAdmin);
    return response.data;
  }

  async deleteAllAdmins() {
    const response = await axios.delete(this.baseUrl + "/api/admins");
    return response.data;
  }

  async deleteOneAdmin(id) {
    const response = await axios.delete(this.baseUrl + "/api/admins/" + id);
    return response.data;
  }

  async authenticateAdmin(admin) {
    try {
      const response = await axios.post(this.baseUrl + "/api/admins/authenticate", admin);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAdminAuth(admin) {
    axios.defaults.headers.common["Authorization"] = "";
  }

}

module.exports = poiService;