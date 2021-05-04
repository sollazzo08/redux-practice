import { compose, pipe } from 'lodash/fp';

// Non functional way of trimming input
let input = '   JavaScript      ';
let output = '<div>' + input.trim() + '</div>';

// Functional programming approach

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
//const wrapInSpan = (str) => `<span>${str}</span>`;
const wrap = type => str => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

//Using compose function to use functional composition. compose is a HOF
const transform = compose(wrapInDiv, toLowerCase, trim);
transform(input);

//Using pipe to compose functions is left to right order
const transform2 = pipe(trim, toLowerCase, wrap("div"));
console.log(transform2(input));

// This is called functional composition, in functional programming
const result = wrapInDiv(toLowerCase(trim(input)));