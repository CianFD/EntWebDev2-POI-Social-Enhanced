"use strict";

const Poi = require("../models/poi");
const Boom = require("@hapi/boom");
const User = require("../models/user");

const Pois = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const pois = await Poi.find();
      return pois;
    },
  },

  findByUser: {
    auth: false,
    handler: async function (request, h) {
      const pois = await Poi.find({ creator: request.params.id });
      return pois;
    },
  },

  addPoi: {
    auth: false,
    handler: async function (request, h) {
      let poi = new Poi(request.payload);
      const user = await User.findOne({ _id: request.params.id });
      if (!user) {
        return Boom.notFound("No User with this id");
      }
      poi.creator = user._id;
      poi = await poi.save();
      return poi;
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Poi.deleteMany({});
      return { success: true };
    },
  },

};

module.exports = Pois;