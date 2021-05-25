"use strict";

const Poi = require("../models/poi");
const Boom = require("@hapi/boom");
const User = require("../models/user");

const Pois = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const pois = await Poi.find();
      return pois;
    },
  },

  findByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const pois = await Poi.find({ creator: request.params.id });
      return pois;
    },
  },

  addPoi: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      let poi = new Poi(request.payload);
      const userId = utils.getUserIdFromRequest(request);
      poi.creator = userId;
      poi = await poi.save();
      return poi;
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await Poi.deleteMany({});
      return { success: true };
    },
  },

};

module.exports = Pois;