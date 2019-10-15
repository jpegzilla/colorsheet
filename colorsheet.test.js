const assert = require("assert");
var { expect } = require("chai");
const colorsheet = require(".");

describe("colorsheet tests", function() {
  describe("> colorsheet.hexToRGBA", function() {
    it("should return a valid rgba color when given a hex color", function() {
      assert.equal(colorsheet.hexToRGBA("#000000").r, 0);
      assert.equal(colorsheet.hexToRGBA("#000000").g, 0);
      assert.equal(colorsheet.hexToRGBA("#000000").b, 0);
    });

    it("should throw an error if given an invalid color", function() {
      expect(() => {
        colorsheet.hexToRGBA(1, 2);
      }).to.throw();
    });
  });

  describe("> colorsheet.calculateLuminance", function() {
    it("should return a number", function() {
      assert.equal(typeof colorsheet.calculateLuminance(0, 0, 0), "number");
    });

    it("should return the correct luminance value for the given rgb color", function() {
      assert.equal(colorsheet.calculateLuminance(0, 0, 0), 0);
      assert.equal(colorsheet.calculateLuminance(255, 255, 255), 1);
      assert.notEqual(colorsheet.calculateLuminance(120, 120, 120), 0.3);
    });

    it("should throw an error when given an invalid color", function() {
      expect(() => {
        colorsheet.calculateLuminance("r", "g", "b");
      }).to.throw();
    });
  });

  describe("> colorsheet.getWcagLevels", function() {
    it("should return a string", function() {
      assert.equal(typeof colorsheet.getWcagLevels(21), "string");
    });

    it("should return aaa contrast ratio at a contrast ratio > 7", function() {
      assert.equal(colorsheet.getWcagLevels(8), "wcag: 08.00 (AAA)");
    });
  });
});
