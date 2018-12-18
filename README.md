## To Run 

`npm run start`

## To Test 

`npm run test:unit`
`npm run test:unit:watch`

## Configuration

All configuration is done using environment variables, the following are required:

- **PORT** - Port to run the server on. Defaults to 3000. _Optional_

## Endpoints 

After running it locally the following endpoints will be exposed:

- http://localhost:3000/api/readiness
- http://localhost:3000/api/liveness
- http://localhost:3000/private/readiness
- http://localhost:3000/private/liveness

## Resources Used

https://blog.cloudboost.io/learn-how-to-create-a-simple-blog-with-react-node-c05fa6889de3

For testing: https://scotch.io/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs
