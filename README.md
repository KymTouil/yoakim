# yoakim

ROUTES POSTMAN:

POST http://localhost:1407/auth/login
-get a token

        body: email
        password
        
POST http://localhost:1407/auth/register
-register a new user

        body: email
        password

-- Below routes require

        header: Authorization: token

GET http://localhost:1407/users
-get the list of all users


GET http://localhost:1407/messages
-get the list of all messages
  
GET http://localhost:1407/messages/user
-get the list of message of the logged user

  
POST http://localhost:1407/messages
-create a new message
  
        body: userId
        message

PUT http://localhost:1407/messages/:id
-edit a message
  
        body: userId
        message
        
DELETE http://localhost:1407/messages/:id
-delete a message
  
  
