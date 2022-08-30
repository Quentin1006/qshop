user hits /
The page will load as unauthenticated the first time
User can login via the login button
When user click button he is redirected to the login page on auth0 server
He has the possibility to connect via login/pwd or via social

Case Google:
He clicks on the Google button
He is redirected to the Google login page
He enters his credentials (if he is connected already to his google account h will be redirected directly to the consent page)
He is redirected to the consent page
He clicks on the consent button
In case he declined the next server redirects to the error page with the error message
He is redirected to the callback page on auth0 server
He is redirected to the callback page on the frontend
He is redirected to the home page on the frontend
A session cookie is then stored on the browser that gives access to the user profile and the access token

Access token will be used to call the backend API
Id Token will be used to display user information on the frontend

When user connects to the auth server a request is sent to the api server that contains the user db to sync user info from auth0 to the api server db

Note: auth0 propose plusieurs types d'applications (Applications, API)
on a la possibilité d'interagir uniquement sur le idToken depuis l'application (correspondant au frontend) et on peut gérer l'expiration de l'access token uniquement depuis l'API (correspondant au backend)
Le seul but de créer une application de type API étant de pouvoir vérifier la validité du token et de gérer les scopes (permissions) la modification de la validité de l'accessToken via la configuration auth0 n'a pas d'impact sur l'accesstoken émit pour le frontend.
Je ne sais toujours pas si l'accesstoken a une validité pour google si je me suis connecté avec google
