//require file
const { TestWatcher } = require("jest");
const Employee = require("../lib/Engineer");

//jest test

//getName()
test("get name", () => {
  const employee = new Employee("Maya", 12345, "mayatillman17@gmail.com");
  expect(employee.getName()).toBe("Maya");
});

//getId()
test("get id", () => {
  const employee = new Employee("Maya", 12345, "mayatillman17@gmail.com");
  expect(employee.getId()).toBe(12345);
});

//getOfficeNumber()
test("get office number", () => {
  const employee = new Employee("Maya", 12345, "mayatillman17@gmail.com");
  expect(employee.getofficeNumber()).toBe(12345);
});

//getEmail()
test("get email", () => {
  const employee = new Employee("Maya", 12345, "mayatillman17@gmail.com");
  expect(employee.getEmail()).toBe("mayatillman17@gmail.com");
});

//getRole()
test("get role", () => {
  const employee = new Employee("Maya", 12345, "mayatillman17@gmail.com");
  expect(employee.getRole()).toBe("Engineer");
});

module.exports = Employee;
