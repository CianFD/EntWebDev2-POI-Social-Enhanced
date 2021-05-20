"use strict";

const axios = require("axios");
const baseUrl = "http://localhost:3000";

class poiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /*async getPois() {
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

  async createPoi(newPoi) {
    const response = await axios.post(this.baseUrl + "/api/pois", newPoi);
    return response.data;
  }

  async deleteAllPois() {
    const response = await axios.delete(this.baseUrl + "/api/pois");
    return response.data;
  }

  async deleteOnePoi(id) {
    const response = await axios.delete(this.baseUrl + "/api/pois/" + id);
    return response.data;
  }*/

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

}

module.exports = poiService;