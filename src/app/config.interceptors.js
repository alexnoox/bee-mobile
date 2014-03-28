/*
 * config.interceptors.js
 *
 * Defines the interceptors for the application.
 *
 */
// Interceptor catching 401 responses
angular.module(_APP_).config(function($httpProvider, oauth2Token) {
  var responseInterceptor = function($q) {
    return {

      response: function (response) {
        // do something on success
        return response;
      },
      
      responseError: function (response) {
        // do something on error
        console.log('HTTP interceptor responseError:' + JSON.stringify(response));
        if(response.status === 401){
          
          // Try to obtain a Refresh token
          oauth2Token.retrieveRefreshToken();

          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }

    }
  };

  $httpProvider.interceptors.push(responseInterceptor);
});
