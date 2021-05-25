"use strict";

const assert = require("chai").assert;
const poiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let pois = fixtures.pois;
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
  })

  test("add a POI", async function () {
    const returnedUser = await userService.createUser(newUser);
    const poi = await userService.addPoi(returnedUser._id, pois[0]);
    const returnedPoi = await userService.getPois(returnedUser._id);
    assert.equal(returnedPoi.length, 1);
    assert.equal(returnedPoi[0].name, pois[0].name, "returned poi name must match first poi name in array");
  });
  test("create multiple POIs", async function () {
    const returnedUser = await userService.createUser(newUser);
    for (var i = 0; i < pois.length; i++) {
      await userService.addPoi(returnedUser._id, pois[i]);
    }
    const returnedPois = await userService.getPois(returnedUser._id);
    assert.equal(returnedPois.length, pois.length);
    for (var i = 0; i < pois.length; i++) {
      assert.equal([returnedPois[i].name], pois[i].name, "returned POI must be a superset of POI");
    }
  });
  test("get invalid POI", async function () {
    const fakePoi = await userService.getPoi("1234");
    assert.isNull(fakePoi);
    const fakePoi2 = await userService.getPoi("12345678901234567890123");
    assert.isNull(fakePoi2);
  });
  test("delete all POIs", async function () {
    const returnedUser = await userService.createUser(newUser);
    for (var i = 0; i < pois.length; i++) {
      await userService.addPoi(returnedUser._id, pois[i]);
    }
    const d1 = await userService.getPois(returnedUser._id);
    assert.equal(d1.length, pois.length);
    await userService.deleteAllPois();
    const d2 = await userService.getPois(returnedUser._id);
    assert.equal(d2.length, 0);
  });
  test("get all POIs empty", async function () {
    const allPois = await userService.getAllPois();
    assert.equal(allPois.length, 0);
  });

  test("create a poi and check creator", async function () {
    const returnedUser = await userService.createUser(newUser);
    const poi = await userService.addPoi(returnedUser._id, pois[0]);
    const returnedPoi = await userService.getPois(returnedUser._id);
    assert.isDefined(returnedPoi[0].creator);

    const users = await userService.getUsers();
    assert(_.some([users[0]], newUser), "returnedUser must be a superset of newUser");
  });
});