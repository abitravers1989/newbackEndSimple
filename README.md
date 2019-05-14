## To Run

Run `mongod` on a separate terminal window.

`npm run start`

## To Test

`npm run test:unit`
`npm run test:unit:watch`

## Configuration

The USER_PASSWORD can be set to whatever you want. This is the password which is checked when a request is made to the service to post an article. So this is the password which you must pass in the header of the post request.

All configuration is done using environment variables, the following are required:

- **PORT** - Port to run the server on. Defaults to 3000. _Optional_

## Endpoints

After running it locally the following endpoints will be exposed:

GET

- http://localhost:3000/api/readiness
- http://localhost:3000/api/liveness
- http://localhost:3000/private/readiness
- http://localhost:3000/private/liveness
- http://localhost:3000/api/getAllArticles
- http://localhost:3000/api/getArticle?id=5c6ee5adb0d1d8168805d502

POST

- http://localhost:3000/api/postArticles
  example body for this post request: {"title": "Test title", "author": "Abi", "articleBody": "Test desc"}
  ...in body make sure selected raw input and JSON formats...
In header set a key: password with the value of the env variable that you set with USER_PASSWORD.

DELETE

- http://localhost:3000/api/id?id=5c1938eab5c54772905d0b26
- http://localhost:3000/api/deleteAll

PUT

- http://localhost:3000/api/editArticle?title=Test 3

//TESTING ---- not contact based ... don't assert when do x then do x ... assert that when something happens get an empty response etc.

## Resources Used

https://blog.cloudboost.io/learn-how-to-create-a-simple-blog-with-react-node-c05fa6889de3

For testing: https://scotch.io/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs

# TODO

TODO: dockarise the app and mongo

- replace mongoose with native driver
- put end point
- refactor findinding
- only allow to add article if title is not already there

- replacve cgls with logging
