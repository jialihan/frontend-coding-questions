// The constructor to decorate
function MacBook() {
  this.cost = function () {
    return 997;
  };
  this.screenSize = function () {
    return 11.6;
  };
}

// Decorator 1
function Memory(macbook) {
  var v = macbook.cost();
  macbook.cost = function () {
    return v + 75;
  };
}
// Decorator 2
function Engraving(macbook) {
  var v = macbook.cost();
  macbook.cost = function () {
    return v + 200;
  };
}
// Decorator 3
function Insurance(macbook) {
  var v = macbook.cost();
  macbook.cost = function () {
    return v + 250;
  };
}

var mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);
// Outputs: 1522
console.log(mb.cost());
// Outputs: 11.6
console.log(mb.screenSize());

// Using List to implement decorator properties
Sale.decorators = {};
Sale.decorators.fedtax = {
  getPrice: function (price) {
    return price + (price * 5) / 100;
  }
};
Sale.decorators.quebec = {
  getPrice: function (price) {
    return price + (price * 7.5) / 100;
  }
};
Sale.decorators.money = {
  getPrice: function (price) {
    return "$" + price.toFixed(2);
  }
};

// class Decorator
function hero(target) {
  target.isHero = true;
  target.heroName = "superman";
}

@hero
class Person {
  constructor(name) {
    this.name = name;
  }
}
console.log(Person.isHero); // true
