"use strict";

const assert = require("chai").assert;
const poiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let pois = fixtures.pois;
  let newUser = fixtures.newUser;

  const userService = new poiService(fixtures.poiService);

  setup(async function () {
    userService.deleteAllUsers();
    userService.deleteAllPois();
  });

  teardown(async function () {});

  test("create a poi", async function () {
    const returnedUser = await userService.createUser(newUser);
    await userService.addPoi(returnedUser._id, pois[0]);
    const returnedPois = await userService.getPois(returnedUser._id);
    assert.equal(returnedPois.length, 1);
    assert(_.some([returnedPois[0]], pois[0]), "returned poi must be a superset of poi");
  });

  test("delete all pois", async function () {
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

});