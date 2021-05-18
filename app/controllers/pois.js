"use strict";
const POI = require("../models/poi");
const User = require("../models/user");
const Joi = require("@hapi/joi");

const POIs = {
  home: {
    handler: function(request, h) {
      return h.view("home", { title: "Home" });
    }
  },
  report: {
    handler: async function(request, h) {
      const pois = await POI.find().populate("creator").lean();
      return h.view("report", {
        title: "POIs Added",
        pois: pois
      });
    }
  },
  addPOI: {
    validate: {
      payload: {
        name: Joi.string().pattern(/^[A-Z][a-zA-Z\s-']{3,20}$/).required(),
        description: Joi.string().pattern(/[a-zA-Z\s-']$/).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("home", {
            title: "Add POI Failed",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newPOI = new POI({
          name: data.name,
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude,
          creator: user._id
        });
        await newPOI.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },
  showEditPOI: {
    auth: false,
    handler: async function(request, h) {
      try {
        const id = request.params._id
        const poi = await POI.findById(id).lean();
        return h.view("editPOI", { title: "Edit POI", poi: poi });
      } catch (err) {
        return h.view("report", { errors: [{ message: err.message }] });
      }
    },
  },
  editPOI: {
    validate: {
      payload: {
        name: Joi.string().pattern(/^[A-Z][a-zA-Z\s-']{3,20}$/).required(),
        description: Joi.string().pattern(/[a-zA-Z\s-']$/).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("editPOI", {
            title: "Change Failed",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const poiEdit = request.payload;
        const poi = await POI.findById(request.params._id);
        poi.name = poiEdit.name;
        poi.description = poiEdit.description;
        poi.latitude = poiEdit.latitude;
        poi.longitude = poiEdit.longitude;
        await poi.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("report", { errors: [{ message: err.message }] });
      }
    },
  },
  deletePOI: {
    handler: async function (request, h) {
      try {
        const poi = await POI.findById(request.params._id);
        await poi.delete();
        return h.redirect("/report");
      } catch (err) {
        return h.view("report", { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = POIs;