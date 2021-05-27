"use strict";

const assert = require("chai").assert;
const poiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Admin API tests", function () {
  let admins = fixtures.admins;
  let newAdmin = fixtures.newAdmin;

  const adminService = new poiService(fixtures.poiService);

  suiteSetup(async function () {
    await adminService.deleteAllAdmins();
    const returnedAdmin = await adminService.createAdmin(newAdmin);
    const response = await adminService.authenticateAdmin(newAdmin);
  });

  suiteTeardown(async function () {
    await adminService.deleteAllAdmins();
    adminService.clearAdminAuth();
  });

  test("create an admin", async function () {
    const returnedAdmin = await adminService.createAdmin(newAdmin);
    assert(_.some([returnedAdmin], newAdmin), "returnedAdmin must be a superset of newAdmin");
    assert.isDefined(returnedAdmin._id);
  });

  test("get admin", async function () {
    const u1 = await adminService.createAdmin(newAdmin);
    const u2 = await adminService.getAdmin(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("get invalid admin", async function () {
    const u1 = await adminService.getAdmin("1234");
    assert.isNull(u1);
    const u2 = await adminService.getAdmin("012345678901234567890123");
    assert.isNull(u2);
  });

  test("delete an admin", async function () {
    let u = await adminService.createAdmin(newAdmin);
    assert(u._id != null);
    await adminService.deleteOneAdmin(u._id);
    u = await adminService.getAdmin(u._id);
    assert(u == null);
  });

  test("get all admins", async function () {
    await adminService.deleteAllAdmins();
    await adminService.createAdmin(newAdmin);
    await adminService.authenticate(newAdmin);
    for (let u of admins) {
      await adminService.createAdmin(u);
    }

    const allAdmins = await adminService.getAdmins();
    assert.equal(allAdmins.length, admins.length + 1);
  });

  test("get admins detail", async function () {
    await adminService.deleteAllAdmins();
    const admin = await adminService.createAdmin(newAdmin);
    await adminService.authenticate(newAdmin);
    for (let u of admins) {
      await adminService.createAdmin(u);
    }

    const testAdmin = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
    };
    users.unshift(testAdmin);
    const allAdmins = await adminService.getAdmins();
    for (var i = 0; i < admins.length; i++) {
      assert(_.some([allAdmins[i]], admins[i]), "returnedAdmin must be a superset of newAdmin");
    }
  });

  test("get all users empty", async function () {
    await adminService.deleteAllAdmins();
    const admin = await adminService.createAdmin(newAdmin);
    await adminService.authenticate(newAdmin);
    const allUsers = await adminService.getAdmins();
    assert.equal(allAdmins.length, 1);
  });
});