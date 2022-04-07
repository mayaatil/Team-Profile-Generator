//require file
const { TestWatcher } = require("jest");
const Engineer = require("../lib/Engineer");
//jest test
test("get role", () => {
  const engineer = new Engineer(
    "Maya",
    12345,
    "mayatillman17@gmail.com",
    "mayaatil"
  );
  expect(engineer.getRole()).toBe("Engineer");
});

test("get github", () => {
  const engineer = new Engineer(
    "Maya",
    12345,
    "mayatillman17@gmail.com",
    "mayaatil"
  );
  expect(engineer.getGithub()).toBe("mayaatil");
});

//hw tip: add module exports at the end of each test file
module.exports = Engineer;
