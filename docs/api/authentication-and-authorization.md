### Authentication and authorization
#### Register as customer
- Post request: ```/api/users/register```
- Body:
```json
{
    "firstName": "Atanas",
    "lastName": "Vasilev",
    "password": "123QWE!@#",
    "email": "nasko@scheduler.com",
    "phone": "0876359789"
}
```
- Response
* 200 Success
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjY1ZGVkZDA3MzRjY2FlM2U4Y2JjZCIsImVtYWlsIjoiZGV2QHNjaGVkdWxlci5jb20iLCJyb2xlcyI6W10sImlhdCI6MTY0MzUzNTg1MywiZXhwIjoxNjQzNTM5NDUzfQ.fchaX6Poxw3sZz9oKgrB3wb2ol9gfHn6s2aYB5fgmrM",
    "email": "dev@scheduler.com",
    "id": "61f65dedd0734ccae3e8cbcd"
}
```
* 400 Bad request
```json
{
    "message": "User with the same email already exists.",
    "status": "failure",
    "data": {}
}
```
```json
{
    "message": "Some of the fields are invalid.",
    "status": "validationError",
    "data": [
        {
            "value": "As",
            "msg": "Invalid value",
            "param": "firstName",
            "location": "body"
        },
        {
            "value": "nasko@scheduler",
            "msg": "Invalid value",
            "param": "email",
            "location": "body"
        },
        {
            "value": "087635970",
            "msg": "Invalid value",
            "param": "phone",
            "location": "body"
        }
    ]
}
```
#### Register as business holder
- Post request: ```/api/users/register?type=BusinessHolder```
- Body: 
```json
{
    "firstName": "Atanas",
    "lastName": "Vasilev",
    "password": "n.it2021#JSAdv@nced",
    "email": "nasko.it_work@scheduler.com",
    "phone": "0876357785",
    "address": "Sofia, Bulgaria ...",
    "description": "One of the best hairdresser in the town!",
    "availability": [1, 2, 4, 5]
}
```
- Reponse:
* 200 Success:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTAxZWVkYzUxYjI5YWI4NmEyMDczZiIsImVtYWlsIjoibmFza28uaXRfd29ya0BzY2hlZHVsZXIuY29tIiwicm9sZXMiOlsiQnVzaW5lc3MgSG9sZGVyIl0sImlhdCI6MTY0NTIyMzY2MSwiZXhwIjoxNjQ1MjI3MjYxfQ.iQunyOoPbo9oWakp-_wuSqrH-uV2ZZHi0z52GZ8Pqk4",
    "email": "nasko.it_work@scheduler.com",
    "roles": [
        "Business Holder"
    ],
    "id": "62101eedc51b29ab86a2073f"
}
```
* 400 Bad request
```json
{
    "message": "User with the same email already exists.",
    "status": "failure",
    "data": {}
}
```
```json
{
    "message": "Some of the fields are invalid.",
    "status": "validationError",
    "data": [
        {
            "value": "de",
            "msg": "Invalid value",
            "param": "description",
            "location": "body"
        }
    ]
}
```
#### Login
- POST request: ```/api/users/login```
- Body:
```json
{
    "password": "n.it2021#JSAdv@nced",
    "email": "nasko.it@scheduler.com"
}
```
- Response:
* 200 Success:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDk0YWQ3MDY3ZDAwNTdjMzlkYTU1MyIsImVtYWlsIjoibmV0aS5pdEBzY2hlZHVsZXIuY29tIiwicm9sZXMiOlsiQnVzaW5lc3MgSG9sZGVyIl0sImlhdCI6MTY0NTIyNDA3MCwiZXhwIjoxNjQ1MjI3NjcwfQ.cyJE_82jMCzXJc3n7qIc-8RGxhU0nubGLtZO9gjAj0w",
    "id": "62094ad7067d0057c39da553",
    "email": "neti.it@scheduler.com",
    "roles": [
        "Business Holder"
    ],
    "firstName": "Aneta",
    "lastName": "Tcvetkova",
    "phone": "0876357785"
}
```
* 400 Bad request:
```json
{
    "message": "Invalid username or password.",
    "status": "failure",
    "data": {}
}
```
