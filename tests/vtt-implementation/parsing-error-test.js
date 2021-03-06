var NodeVTT = require("node-vtt"),
    assert = Object.create(require("assert")),
    async = require("async"),
    path = require("path");

function testParsingError(nodeVTT, testInfo) {
  async.series([
    function(onDone) {
      nodeVTT.parseFile(path.resolve(__dirname, testInfo.file), onDone);
    },
    function(onDone) {
      assert.equals(nodeVTT.errors.length, 1, "Should have one ParsingError.");
      var error = nodeVTT.errors[0];
      assert.equals(error.name, testInfo.name, "Error's name should be '" +
                    testInfo.name + "'.");
      assert.equals(error.code, testInfo.code, "Error's code should be '" +
                    testInfo.code + "'.");
      onDone();
    },
    nodeVTT.clear
  ], function(error) {
    error && assert.ok(false, error.message);
  });
}

var nodeVTT = new NodeVTT();

describe("parsing error tests", function(){

  before(function(onDone) {
    nodeVTT.init({
      uri: path.resolve(__dirname, "../../utils/basic.html")
    }, onDone);
  });

  after(function() {
    nodeVTT.shutdown();
  });

  it("parsing error tests", function(onDone) {
    var testInfo = [{
      file: "../file-layout/blank-file.vtt",
      name: "ParsingError",
      code: 0
    }, {
      file: "../cue-times/fraction-digits.vtt",
      name: "ParsingError",
      code: 1
    }];
    testInfo.forEach(function(info) {
      testParsingError(nodeVTT, info);
    });
    onDone();
  });
});
