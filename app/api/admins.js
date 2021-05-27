"use strict";

const Admin = require("../models/admin");
const Boom = require("@hapi/boom");
const utils = require('./utils.js');

const Admins = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const admins = await Admin.find();
      return admins;
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const admin = await Admin.findOne({ _id: request.params.id });
        if (!admin) {
          return Boom.notFound("No Admin with this id");
        }
        return admin;
      } catch (err) {
        return Boom.notFound("No Admin with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const newAdmin = new Admin(request.payload);
      const admin = await newAdmin.save();
      if (admin) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating admin");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Admin.deleteMany({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const admin = await Admin.deleteOne({ _id: request.params.id });
      if (admin) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },

  authenticateAdmin: {
    auth: false,
    handler: async function (request, h) {
      try {
        const admin = await Admin.findOne({ email: request.payload.email });
        if (!admin) {
          return Boom.unauthorized("Admin not found");
        } else if (admin.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        } else {
          const token = utils.createToken(admin);
          return h.response({ success: true, token: token }).code(201);
        }
      } catch (err) {
        return Boom.notFound("internal db failure");
      }
    },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const adminEdit = request.payload;
      const admin = await User.findById(adminEdit._id);
      admin.firstName = adminEdit.firstName;
      admin.lastName = adminEdit.lastName;
      admin.email = adminEdit.email;
      admin.password = adminEdit.password;
      await admin.save();
      if (admin) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = Admins;