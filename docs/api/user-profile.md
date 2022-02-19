### User profile
#### Get current logged in user profile details
- Add ```Authorization: Bearer token``` in the headers
- Get request: ```api/users/profile```
- Response
* Business holder
```json
{
    "firstName": "Atanas",
    "lastName": "Vasilev",
    "email": "nasko.it@scheduler.com",
    "phone": "0876357845",
    "roles": [
        "Business Holder"
    ],
    "company": {
        "availability": [
            {
                "day": 1,
                "startHour": 10,
                "startMinute": 0,
                "endHour": 19,
                "endMinute": 0,
                "id": "620bcc7e36b6da362e7c2421"
            },
            {
                "day": 2,
                "startHour": 9,
                "startMinute": 30,
                "endHour": 19,
                "endMinute": 30,
                "id": "620bcc7e36b6da362e7c2422"
            },
            {
                "day": 3,
                "startHour": 11,
                "startMinute": 30,
                "endHour": 20,
                "endMinute": 30,
                "id": "620bcc7e36b6da362e7c2423"
            },
            {
                "day": 4,
                "startHour": 9,
                "startMinute": 0,
                "endHour": 20,
                "endMinute": 0,
                "id": "620bcc7e36b6da362e7c2424"
            },
            {
                "day": 5,
                "startHour": 8,
                "startMinute": 0,
                "endHour": 14,
                "endMinute": 0,
                "id": "620bcc7e36b6da362e7c2425"
            }
        ],
        "businessType": "62055417ab89400c51fd7f12",
        "description": "Some description comes here",
        "address": "Some address comes here",
        "id": "620af1ddfcb9e655cbaf8a7e"
    },
    "id": "61f65f35d0734ccae3e8cbd2"
}
````
* Customer
```json
{
    "firstName": "JavaScript",
    "lastName": "Developer",
    "email": "dev@scheduler.com",
    "phone": "0876359789",
    "roles": [],
    "id": "61f65dedd0734ccae3e8cbcd"
}
```
#### Edit user personal data
- Put request: ```/api/users/profile```
- Body:
```json
{
    "firstName": "Nasko",
    "lastName": "Atanasov",
    "phone": "0876351984"
}
```
- Response
* 200 Success
```json
{
    "message": "The user personal data is updated.",
    "status": "success",
    "data": null
}
```