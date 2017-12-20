var $ = require("jquery");
var multiply = require('..//public/js/index.js');
describe("search", function () {
  it("should search properly when passed the correct search parameters", function () {
    expect(search("edibles", "products", "flowers", "strains")).toEqual(search(forWhat));
  });

  it("should throw when not passed the correct search parameters", function () {
    expect(function testThrow() {
      search("");
    }).toThrow(Error);
  });
});