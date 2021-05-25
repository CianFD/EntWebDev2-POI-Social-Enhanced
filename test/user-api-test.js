"use strict";

const assert = require("chai").assert;
const poiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function () {
  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const userService = new poiService(fixtures.poiService);

  suiteSetup(async function () {
    await userService.deleteAllUsers();
    const returnedUser = await userService.createUser(newUser);
    const response = await userService.authenticate(newUser);
  });

  suiteTeardown(async function () {
    await userService.deleteAllUsers();
    userService.clearAuth();
  });

  test("create a user", async function () {
    const returnedUser = await userService.createUser(newUser);
    assert(_.some([returnedUser], newUser), "returnedUser must be a superset of newUser");
    assert.isDefined(returnedUser._id);
  });

  test("get user", async function () {
    const u1 = await userService.createUser(newUser);
    const u2 = await userService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test("get invalid user", async function () {
    const u1 = await userService.getUser("1234");
    assert.isNull(u1);
    const u2 = await userService.getUser("012345678901234567890123");
    assert.isNull(u2);
  });

  test("delete a user", async function () {
    let u = await userService.createUser(newUser);
    assert(u._id != null);
    await userService.deleteOneUser(u._id);
    u = await userService.getUser(u._id);
    assert(u == null);
  });

  test("get all users", async function () {
    await userService.deleteAllUsers();
    await userService.createUser(newUser);
    await userService.authenticate(newUser);
    for (let u of users) {
      await userService.createUser(u);
    }

    const allUsers = await userService.getUsers();
    assert.equal(allUsers.length, users.length + 1);
  });

  test("get users detail", async function () {
    await userService.deleteAllUsers();
    const user = await userService.createUser(newUser);
    await userService.authenticate(newUser);
    for (let u of users) {
      await userService.createUser(u);
    }

    const testUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    users.unshift(testUser);
    const allUsers = await userService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
    }
  });

  test("get all users empty", async function () {
    await userService.deleteAllUsers();
    const user = await userService.createUser(newUser);
    await userService.authenticate(newUser);
    const allUsers = await userService.getUsers();
    assert.equal(allUsers.length, 1);
  });
});