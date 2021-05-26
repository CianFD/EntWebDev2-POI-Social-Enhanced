"use strict";

const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
const Admin = require("../models/admin");
const POI = require("../models/poi");
const User = require("../models/user");


const Admins = {
  adminDashboard: {
    auth: false,
    handler: async function (request, h) {
      const pois = await POI.find().populate("creator").lean();
      const users = await User.find().populate().lean();
      return h.view("adminDashboard", {
        title: "Administrator Dashboard",
        pois: pois,
        user: users
      });
    }
  },
  showAdminSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("adminSignup", { title: "Create your Administrator Account" });
    },
  },
  adminSignup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("adminSignup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let admin = await Admin.findByEmail(payload.email);
        if (admin) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        const newAdmin = new Admin({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
        });
        admin = await newAdmin.save();
        request.cookieAuth.set({ id: admin.id });
        return h.redirect("/adminDashboard");
      } catch (err) {
        return h.view("adminSignup", { errors: [{ message: err.message }] });
      }
    },
  },
  showAdminLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("adminLogin", { title: " Administrator Login" });
    },
  },
  adminLogin: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("adminLogin", {
            title: "Sign in error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let admin = await Admin.findByEmail(email);
        if (!admin) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        admin.comparePassword(password);
        request.cookieAuth.set({ id: admin.id });
        return h.redirect("/adminDashboard");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  adminLogout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      try {
        const user = await User.findById(request.params._id);
        await user.delete();
        return h.redirect("/adminDashboard");
      } catch (err) {
        return h.view("adminDashboard", { errors: [{ message: err.message }] });
      }
    }
  },
  adminDeletePOI: {
    handler: async function (request, h) {
      try {
        const poi = await POI.findById(request.params._id);
        await poi.delete();
        return h.redirect("/adminDashboard");
      } catch (err) {
        return h.view("adminDashboard", { errors: [{ message: err.message }] });
      }
    }
  },
  adminEditPOI: {
    validate: {
      payload: {
        name: Joi.string().pattern(/^[A-Z][a-zA-Z\s-']{3,20}$/).required(),
        description: Joi.string().pattern(/[a-zA-Z0-9\s-']$/).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("adminDashboard", {
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
        return h.redirect("/adminDashboard");
      } catch (err) {
        return h.view("adminDashboard", { errors: [{ message: err.message }] });
      }
    },
  },
  showAdminEditPOI: {
    auth: false,
    handler: async function(request, h) {
      try {
        const id = request.params._id
        const poi = await POI.findById(id).lean();
        return h.view("adminEditPoi", { title: "Edit POI", poi: poi });
      } catch (err) {
        return h.view("adminDashboard", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Admins;