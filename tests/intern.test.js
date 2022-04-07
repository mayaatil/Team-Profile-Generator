//require file
const Intern = require("../lib/Intern");

//jest test
test("get role", () => {
  const intern = new Intern("Maya", 12345, "mayatillman17@gmail.com", "UIC");
  expect(intern.getRole()).toBe("Intern");
});

test("get school", () => {
  const intern = new Intern("Maya", 12345, "mayatillman17@gmail.com", "UIC");
  expect(intern.getSchool()).toBe("UIC");
});

//hw tip: add module exports at the end of each test file
module.exports = Intern;
