### Business holder calendar
- Add ```Authorization: Bearer token``` in the headers
#### Get upcomming appointments by date
- Get Request: ```api/businesses/schedule?date=2022-01-05```
- Response:
```json
[
    {
        "createdOn": "2022-02-16T21:45:12.836Z",
        "client": {
            "firstName": "Atanas",
            "lastName": "Vasilev",
            "email": "nasko.it@scheduler.com",
            "phone": "0876357845",
            "id": "61f65f35d0734ccae3e8cbd2"
        },
        "status": "Accepted",
        "start": "2022-02-16T11:00:00.000Z",
        "durationInMinutes": 60,
        "product": {
            "name": "Gentleman hairstyle",
            "price": 34,
            "id": "620af4ae04c7041ba09de80c"
        },
        "id": "620d7a8ed426a4beea96806c"
    },
    {
        "createdOn": "2022-02-16T19:56:02.582Z",
        "client": {
            "firstName": "Nasko",
            "lastName": "Atanasov",
            "email": "dev@scheduler.com",
            "phone": "0876351984",
            "id": "61f65dedd0734ccae3e8cbcd"
        },
        "status": "Pending",
        "start": "2022-02-16T14:30:00.000Z",
        "durationInMinutes": 30,
        "product": {
            "name": "Gentleman hairstyle",
            "price": 34,
            "id": "620af4ae04c7041ba09de80c"
        },
        "id": "620d5888dce94d51dd61a675"
    },
    {
        "createdOn": "2022-02-16T21:45:12.836Z",
        "client": {
            "firstName": "Atanas",
            "lastName": "Vasilev",
            "email": "nasko.it@scheduler.com",
            "phone": "0876357845",
            "id": "61f65f35d0734ccae3e8cbd2"
        },
        "status": "Pending",
        "start": "2022-02-16T15:00:00.000Z",
        "durationInMinutes": 45,
        "product": {
            "name": "Gentleman hairstyle",
            "price": 34,
            "id": "620af4ae04c7041ba09de80c"
        },
        "id": "620d7654d426a4beea96803a"
    }
]
```

#### Accept appointment
- Post request: ```api/appointments/accept/:id```
    - Example: ```api/appointments/accept/620d7aadd426a4beea96807d```
- Body: empty
- Response
- 200 Success
```json
{
    "message": "The appointment is successfully accepted.",
    "status": "success",
    "data": null
}
```
- 400 Bad request
```json
{
    "message": "Error while accepting the appointment.",
    "status": "failure",
    "data": null
}
```
#### Decline appointment
- Post request: ```api/appointments/decline/:id```
- Example: ```api/appointments/decline/620d7aadd426a4beea96807d```
- Body: empty
- Response: 
- 200 OK
```json
{
    "message": "The appointment is successfully declined.",
    "status": "success",
    "data": null
}
```
- 400 Bad request
```json
{
    "message": "Error while declining the appointment.",
    "status": "failure",
    "data": null
}
```