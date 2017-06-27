This is an example of how we can piggyback on Clay sessions for auth. 

- A client-side JS app gets a Clay session by inspecting the cookie when the user is logged in to Clay.
- The client-side JS app sends the cookie in a header to a service that needs auth. The code in this repo shows what the service can do.
- The service checks that the Clay session is valid by asking Clay.
- If the Clay session is valid, the service completes the request successfully, otherwise it sends 403 FORBIDDEN or whatever the right status code is.

The code is running on Heroku and you can try it like this:

```
# For a 403 Forbidden:

curl -X POST   https://fierce-bayou-30965.herokuapp.com/

# OR

curl -X POST   https://fierce-bayou-30965.herokuapp.com/ -H 'x-clay-auth: invalid_session_key' 

# For a 200:

curl -X POST   https://fierce-bayou-30965.herokuapp.com/   -H 'x-clay-auth: <your valid clay-session here>' 

```

To get a valid Clay session:

- In Chrome, log in to Clay on the dev server
- in edit mode, in the Chrome console, in the Application tab, find the value for the clay-session cookie.
