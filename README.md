# yoakim

ROUTES POSTMAN:

POST http://localhost:1407/auth/login
  body: email
        password
        
POST http://localhost:1407/auth/register
  body: email
        password

GET http://localhost:1407/users
  header: Authorization: token

GET http://localhost:1407/messages
  header: Authorization: token
  
GET http://localhost:1407/messages/user
  header: Authorization: token
  
PUT http://localhost:1407/messages/:id
  header: Authorization: token
  body: userId
        message
        
DELETE http://localhost:1407/messages/:id
  header: Authorization: token
  
