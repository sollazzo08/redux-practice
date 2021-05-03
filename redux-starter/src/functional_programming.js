/*
In javascript functions are First class citizens 
  - They can be assigned to a variable 
  - Passed as an argument 
  - Returned from other functions

High Order Functions 
 - a function that takes a function as an argument or returns it or both.  
*/



/*
function sayHello() {
  return 'Hello World'
}

// fn is a reference to sayHello 
let fn = sayHello;

// passing a function as a argument 
function greet(fnMessage) {
  console.log(fnMessage())
}

greet(sayHello)

*/

function sayHello(){
  return function () { //anonymous 
    return 'hello world'
  }
}

let fn = sayHello();
let message = fn();


