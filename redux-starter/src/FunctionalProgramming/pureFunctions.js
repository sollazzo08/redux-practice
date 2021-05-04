/*
  Pure Functions 
   - no random values
   - no current date/time
   - no global state (DOM, files, db, etc)
   - no mutation of parameters

  Benefits
   - Self-documenting
   - Easily testable
   - Concurrency 
   - Cacheable 
*/

const minAge = 22;

// Not Pure, minAge can change here
function isEligible(age) {
  return age > minAge;
}

// Pure
function isEligible(age, minAge) {
  return age > minAge;
}
