function EmployeeFactory() {
  this.create = function (name, type) {
    var employee;
    switch (type) {
      case "fulltime":
        employee = new FullTime(name);
        break;
      case "parttime":
        employee = new PartTime(name);
        break;
      case "contractor":
        employee = new Contractor(name);
        break;
      default:
        throw "invalid employee type";
    }
    employee.say = function () {
      console.log(this.name + ": I am a " + this.type + "empolyee");
    };
    return employee;
  };
}
var FullTime = function (name) {
  this.name = name;
};
var PartTime = function (name) {
  this.name = name;
};
var Contractor = function (name) {
  this.name = name;
};

// Usage
var factory = new EmployeeFactory();
var employees = [];
employees.push(factory.create("alice", "fulltime"));
employees.push(factory.create("bob", "parttime"));
employees.forEach((el) => el.say());

var o = new Object(),
  n = new Object(1),
  s = Object("1"),
  b = Object(true);

// test
console.log(o.constructor === Object); // true
console.log(n.constructor === Number); // true
console.log(s.constructor === String); // true
console.log(b.constructor === Boolean); // true
