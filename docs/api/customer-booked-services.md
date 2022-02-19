### Customer booked services
#### Get cutomer upcomming appointments
- GET request: ```/api/appointments/upcoming```
- Response:
```json
[
    {
        "createdOn": "2022-02-16T21:45:12.836Z",
        "businessHolder": {
            "firstName": "Atanas",
            "lastName": "Vasilev",
            "email": "nasko.it@scheduler.com",
            "phone": "0876357845",
            "company": {
                "businessType": {
                    "name": "Tattoo",
                    "imagePath": "public/images/business-types/tattoo.jpg",
                    "id": "62055417ab89400c51fd7f12"
                },
                "description": "Business description comes here ...",
                "address": "Business address comes here ...",
                "id": null
            },
            "id": "61f65f35d0734ccae3e8cbd2"
        },
        "status": "Accepted",
        "start": "2022-02-17T18:30:00.000Z",
        "durationInMinutes": 55,
        "product": {
            "name": "Gentleman hairstyle",
            "price": 34,
            "id": "620af4ae04c7041ba09de80c"
        },
        "id": "620d7afcd426a4beea9680ac"
    },
    {
        "createdOn": "2022-02-16T21:45:12.836Z",
        "businessHolder": {
            "firstName": "Atanas",
            "lastName": "Vasilev",
            "email": "nasko.it@scheduler.com",
            "phone": "0876357845",
            "company": {
                "businessType": {
                    "name": "Tattoo",
                    "imagePath": "public/images/business-types/tattoo.jpg",
                    "id": "62055417ab89400c51fd7f12"
                },
                "description": "Business description comes here ...",
                "address": "Business address comes here ...",
                "id": null
            },
            "id": "61f65f35d0734ccae3e8cbd2"
        },
        "status": "Pending",
        "start": "2022-02-18T10:15:00.000Z",
        "durationInMinutes": 40,
        "product": {
            "name": "Gentleman hairstyle",
            "price": 34,
            "id": "620af4ae04c7041ba09de80c"
        },
        "id": "620d7ac4d426a4beea96808e"
    }
]
```