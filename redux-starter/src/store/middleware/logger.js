const logger = params => store => next => action => {
  console.log("Logging to the", params)
  console.log("store", store);
  console.log("next", next);
  console.log("action", action);
  next(action);
}

export default logger;