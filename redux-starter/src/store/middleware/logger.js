const logger = params => store => next => action => {
  console.log(params)
  // console.log("store", store);
  // console.log("next", next);
  // console.log("action", action);
  return next(action);
}

export default logger;