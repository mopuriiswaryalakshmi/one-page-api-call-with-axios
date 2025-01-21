/*A closure is a feature where an inner function retains access to the 
variables of its outer function even after the outer function has 
finished executing.

function outer() {
    let count = 0; // Variable in the outer scope

    function inner() {
        count++; // Inner function has access to `count`
        console.log(count);
    }

    return inner; // Return the inner function
}

const counter = outer(); // `outer` returns `inner`, which is now stored in `counter`

counter(); // Output: 1
counter(); // Output: 2
counter(); // Output: 3


function add(a) {
    return function(b) {
        return a + b;
    };
}
const addFive = add(5);
console.log(addFive(10)); // Output: 15

function createCounter() {
    let count = 0;

    return {
        increment: function() {
            count++;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}
const counter = createCounter();
console.log(counter.increment()); // Output: 1
console.log(counter.getCount());  // Output: 1


In JavaScript, prototypes are used to define properties and methods that 
can be shared among all instances of a constructor function.

Hoisting refers to the JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation.


The this keyword refers to the context in which a function is executed. Its value can change depending on how a function is called.
    Methods: In a method of an object, this refers to the object itself.
    Constructor Functions: In a constructor function, this refers to the new instance being created.
    Arrow Functions: Arrow functions do not have their own this context but inherit it from their surrounding lexical context.



Closures: Inner functions that capture the lexical scope of outer functions.
Prototypes: Mechanism for sharing properties and methods among instances created by constructor functions.
Hoisting: JavaScript’s behavior of moving variable and function declarations to the top of their scope.
this Keyword: Refers to the context in which a function is executed, and its value can vary depending on how the function is invoked.

//Prototypes
function Person(name) {
    this.name = name;
    
    // This method is not using the prototype and is specific to each instance
    this.sayHello = function() {
        console.log(`Hello, my name is ${this.name}`);
    };
}

const person1 = new Person('Alice');
const person2 = new Person('Bob');

person1.sayHello(); // Output: Hello, my name is Alice
person2.sayHello(); // Output: Hello, my name is Bob


function Person(name) {
    this.name = name;
}

// Define the method on the prototype
Person.prototype.sayHello = function() {
    console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person('Alice');
const person2 = new Person('Bob');

person1.sayHello(); // Output: Hello, my name is Alice
person2.sayHello(); // Output: Hello, my name is Bob

Defining methods on the prototype is the preferred approach because it ensures that all instances share the same method, reducing memory usage and allowing for inheritance.

Instance Methods Inside Constructor: Defined within the constructor function itself. Each instance has its own copy of the method.
Prototype Methods: Defined on the constructor’s prototype (Person.prototype). All instances share the same method, which is more memory-efficient and leverages inheritance.

𝐒𝐎𝐋𝐈𝐃 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥es
𝐒𝐢𝐧𝐠𝐥𝐞 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐢𝐛𝐢𝐥𝐢𝐭𝐲 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞 (𝐒𝐑𝐏):    
    Every class should have one and only one responsibility, making the code easier to understand and modify.
        Example:* Rather than modifying a `PaymentProcessor` class to add new payment methods, create new subclasses for `CreditCardPayment` or `PayPalPayment` that extend the base processor class.
𝐎𝐩𝐞𝐧/𝐂𝐥𝐨𝐬𝐞𝐝 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞 (𝐎𝐂𝐏):
    Classes should be open for extension but closed for modification, enabling us to add new features without altering existing code.
        *Example:* Rather than modifying a `PaymentProcessor` class to add new payment methods, create new subclasses for `CreditCardPayment` or `PayPalPayment` that extend the base processor class.
Liskov Substitution Principle (LSP)
    Objects of a superclass should be replaceable with objects of its subclasses without affecting the program's correctness.
        *Example:* If you have a `Bird` class with a `fly()` method, and a `Penguin` class that extends `Bird`, the `Penguin` class should not override `fly()` in a way that breaks the code (e.g: throwing an error since penguins can't fly).
Interface Segregation Principle (ISP)
    Clients should not be forced to depend on interfaces they don't use; it's better to have many client-specific interfaces than one general-purpose interface.
         *Example:* Instead of having a `Printer` interface with methods for both printing and scanning, separate them into `Printable` and `Scannable` interfaces to allow a simple printer to implement only the `Printable` interface.
Dependency Inversion Principle (DIP)
    High-level modules should not depend on low-level modules; both should depend on abstractions, promoting more flexible and maintainable code.
        *Example:* Instead of a `UserService` class directly depending on a `MySQLDatabase` class, have it depend on a `Database` interface. This allows you to switch databases (e.g: from MySQL to MongoDB) without modifying `UserService`.

Encapsulation:
    It also involves restricting direct access to some of an object's components, which can prevent the accidental modification of data.
    Explanation:
    Example: 
        Public Method: greet() is accessible from outside the class.
        Private Method: #calculateBirthYear() is not accessible from outside the class; it’s encapsulated within the class.

Inheritance
     Inheritance allows a new class (subclass or derived class) to inherit properties and methods from an existing class (superclass or base class). This promotes code reuse and establishes a hierarchical relationship between classes.
        Example: Superclass: Animal with a speak method.
        Subclass: Dog that extends Animal and overrides the speak method, also adds a new method displayBreed.

Polymorphism:
    Run-Time Polymorphism (Method Overriding):
    Definition: Occurs when a method in a subclass overrides a method in its superclass.
        Example: When a method in a subclass has the same name as a method in its superclass, the subclass method is called at runtime.
        Example: In JavaScript, method overloading is not natively supported, but polymorphic behavior can be mimicked using default parameters or rest parameters.

        class Bird {
            speak() {
                console.log('Chirp chirp!');
            }
        }

        class Cat {
            speak() {
                console.log('Meow!');
            }
        }

        function makeAnimalSpeak(animal) {
            animal.speak();
        }

        const bird = new Bird();
        const cat = new Cat();

        makeAnimalSpeak(bird); // Output: Chirp chirp!
        makeAnimalSpeak(cat); // Output: Meow!

        Polymorphism: The makeAnimalSpeak function can accept any object that has a speak method, and it will call the appropriate method based on the object’s type.




4. Abstraction
Definition: Abstraction involves hiding the complex implementation details of an object and exposing only the necessary parts of it. It helps in reducing complexity and allows the focus to be on interactions at a higher level.

Encapsulation: Bundles data and methods, restricting direct access to some components.
Inheritance: Enables a class to inherit properties and methods from another class.
Polymorphism: Allows methods to perform different tasks based on the object it is acting upon.
Abstraction: Hides complex implementation details and exposes only necessary parts.
*/