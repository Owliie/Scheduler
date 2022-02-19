### Book appointment
#### Get hairdresser details
- Get request: ```/businesses/:id```
    - Example: ```/businesses/61f65f35d0734ccae3e8cbd2```
- Response: 
```json
{
    "firstName": "Atanas",
    "lastName": "Vasilev",
    "phone": "0876357845",
    "description": "Business description comes here ...",
    "address": "Business address comes here ...",
    "id": "61f65f35d0734ccae3e8cbd2",
    "businessType": {
        "name": "Tattoo",
        "imagePath": "public/images/business-types/tattoo.jpg",
        "id": "62055417ab89400c51fd7f12"
    },
    "addedToFavourites": false
}
```

#### Get business products
- Get request: ```/api/businesses/products/:businessId```
- Example: ```/api/businesses/products/61f65f35d0734ccae3e8cbd2```
- Response:
```json
[
    {
        "name": "Gentleman hairstyle",
        "price": 20,
        "durationInMinutes": 45,
        "id": "620af4ae04c7041ba09de80c"
    }
]
```

#### Get available hours by date
- Get request: ```api/businesses/freeSlots/61f65f35d0734ccae3e8cbd2?date=2022-02-16```
- Response:
- 200 Success
```json
[
    {
        "start": {
            "hour": 11,
            "minute": 30
        },
        "end": {
            "hour": 16,
            "minute": 30
        }
    },
    {
        "start": {
            "hour": 17,
            "minute": 45
        },
        "end": {
            "hour": 20,
            "minute": 30
        }
    }
]
```
* 400 Bad request
```json
{
    "message": "The business is not working at the selected date.",
    "status": "failure",
    "data": {}
}
```

#### Book an appointment
- Post request: ```api/appointments```
- Body: 
```json
{
    "businessHolder": "61f65f35d0734ccae3e8cbd2",
    "start": "2022-02-16T17:00",
    "durationInMinutes": 45,
    "product": "620af4ae04c7041ba09de80c"
}
```
- Response
* 200 Success
```json
 {
    "message": "The appointment was created successfully",
    "status": "success",
    "data": {
        "createdOn": "2022-02-16T21:45:12.836Z",
        "client": "61f65f35d0734ccae3e8cbd2",
        "businessHolder": "61f65f35d0734ccae3e8cbd2",
        "status": "Pending",
        "start": "2022-02-16T15:00:00.000Z",
        "durationInMinutes": 45,
        "product": "620af4ae04c7041ba09de80c",
        "id": "620d7654d426a4beea96803a"
    }
}
``` 
* 400 Bad request
```json
 {
    "message": "The selected time slot is not free.",
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
            "value": "not valid date",
            "msg": "Invalid value",
            "param": "start",
            "location": "body"
        },
        {
            "value": 55.5,
            "msg": "Invalid value",
            "param": "durationInMinutes",
            "location": "body"
        }
    ]
}
```