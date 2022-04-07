//require file
const Manager = require("../lib/Manager");

//jest test
test("get role", () => {
  const manager = new Manager("Maya", 12345, "mayatillman17@gmail.com");
  expect(manager.getRole()).toBe("Manager");
});

//hw tip: add module exports at the end of each test file
module.exports = Manager;
