// 53. write your own `extends` in es5
const myExtends = (SuperType, SubType) => {
  function Child(...args) {
    SuperType.apply(this, args);
    SubType.apply(this, args);

    // Important to make ALL instances directly from SubType
    // instanceChild.__proto__ === Student.prototype
    this.__proto__ = SubType.prototype;
  }

  // instanceChild.__proto__.__proto__ === Person.prototype
  SubType.prototype.__proto__ = SuperType.prototype;

  // This is ONLY on static method Child, NO affects on instances
  // NOT needed on creating instances
  // Child.prototype = Object.create(SubType.prototype);

  // For test case: ExtendedType.prototype should be SuperType
  // NOT needed on creating instances
  // only for edge cases eg: SuperType.boo = 'abc', then Child.boo = 'abc'.
  Child.__proto__ = SuperType;

  return Child;
};

// solution3: My SOLUTION
const myExtends = (SuperType, SubType) => {
  function Child(...args) {
    SuperType.apply(this, args);
    SubType.apply(this, args);
    Object.setPrototypeOf(this, SubType.prototype);
  }
  Object.setPrototypeOf(SubType.prototype, SuperType.prototype);
  // NOT necessary on instances
  // Object.setPrototypeOf(Child.prototype, SubType.prototype);
  Object.setPrototypeOf(Child, SuperType);
  return Child;
};

/***************************************************************
 * Test and Examples
 **************************************************************/
var Person = function () {
  this.name = "x";
  this.age = 20;
};
Person.prototype.calcP = () => console.log("proptotype method in Person");
var jel = new Person(); // instance of person
console.log(Person);
console.log(jel);

var Student = function () {
  this.sid = 11120;
};
// // set prototype on ALL instances
// Object.setPrototypeOf(this, Person.prototype);
// this.__proto__ = Person.prototype;
// };
// // static method add proto link
// Student.__proto__ = Person;
// Object.setPrototypeOf(Student, Person);

// // WRONG, nothing happened, nothing inherits
// Object.setPrototypeOf(Student, Person.prototype);

// // Wrong: create new proto object, no inherit from Person
// Student.prototype = Object.assign({},Person.prototype,Student.prototype);

// use object.create() to extend
// Student.prototype = Object.create(Person.prototype);
// Student.prototype.calcS=()=>console.log("proptotype method in Student");

// // Object.setPrototypeOf() exmaple:
// Object.setPrototypeOf(Student.prototype, Person.prototype);
// Student.prototype.__proto__ =  Person.prototype;

var student = new Student();
console.log("instance obj:", student);
student.calcS();
student.calcP();
