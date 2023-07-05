/* --- sampleMiddleware.js --- */

// Create your middleware object
var sampleMiddleware = new TykJS.TykMiddleware.NewMiddleware({});

// Initialise it with your functionality by passing a closure that accepts two objects
// into the NewProcessRequest() function:
sampleMiddleware.NewProcessRequest(function (request, session, config) {

    request.SetHeaders({
        'Authorization': 'eyJvcmciOiIxIiwiaWQiOiJhYTYxZGIxNzVjZjA0NmFiODZlMGQ2MWNlNGQxYzU3YyIsImgiOiJtdXJtdXI2NCJ9'
    });
    return testJSVMData.ReturnData(request, {});
});
