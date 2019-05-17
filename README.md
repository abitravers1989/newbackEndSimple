# Blog Service 

A backend API for a blog site. It retrieves, creates, deletes and edits articles from a MongoDB. 

## Installation

`npm install`

## Configuration

All configuration is done using environment variables, the following are required:

- **PORT** - Port to run the server on. Defaults to 3000. _Optional_
- **USER_PASSWORD** -  The password which is used to grant POST or PUT requests permission to sent articles to this service. This password can be anything. It must be passed in the header of POST, PUT or DELETE requests with the key 'password'. 
-  **CONNECTION_STRING** - The string needed to connect to your local mongo database. This should include the extension to the database which you have decided to store these blog articles in, for example a 'blog' database.

To run this locally please create a .env in the route of this directory with the above in. See the .env.example.

## To Run

On a separate terminal window run:

```
$ mongod
```

Then run:

```
$ npm run start
```


## Testing

### All tests

Run all unit and integration tests

```
$ npm t
```

### Unit tests

Run just unit tests

```
$ npm run test:unit

# Coverage report
$ npm run test:coverage
```

### Integration tests

Run just unit tests

```
$ npm run test:unit
```

## Health endpoints

Once the service is running you will be able to access the following health endpoints to check the service is working:

GET
- http://localhost:3000/api/readiness
- http://localhost:3000/api/liveness

## Article endpoints 

### Get all the articles 

To see all the articles which have been saved in the mongo database being used:

GET
- http://localhost:3000/api/getAllArticles

### Get one article

To get one article pass the id of the article (which can be found when all articles are returned) to the `id` param of the request. For example see below:

GET
- http://localhost:3000/api/getArticle?id=5c6ee5adb0d1d8168805d502

### Add one article

To add an article to the database then hit the following endpoint with a POST method:

POST
- http://localhost:3000/api/postArticles

This POST request must pass the set password in the header of the request, such as:

password: 'your_set_password'

To post an article it must contain a title, author and articleBody in the body of the request. For example:

{"title": "Test title", "author": "Your Name", "articleBody": "The blog article you want to add."}
If using Postman make sure you have selected raw input for the body with JSON as the format.

### Delete all articles 

To delete all the articles in the database: 

DELETE
- http://localhost:3000/api/deleteAll

### Delete one article

To delete one article pass the title of the article to delete in the param of the `id` of the request. For example see below:

DELETE
- http://localhost:3000/api/id?id=5c1938eab5c54772905d0b26

### Edit one article

To edit one article pass the title of the article to edit in the param of the `title` of the request. For example see below:

PUT
- http://localhost:3000/api/editArticle?title=Test 3


## TODO

- Add password to delete endpoints.
- Dockarise the app and mongo. Use this to mock mongo in integration tests.
- Add further tests.
- Fix PUT endpoint.
- Make sure all console logs are replaced with logger.
- Change mongo DB to SQL.
- Launch as EC2 instance.

