### Business holder profile
- Add ```Authorization: Bearer token``` in the headers
#### Edit business company info
- Put request: ```api/businesses/company```
- Body:
```json
{
    "description": "Business description comes here ...",
    "address": "Business address comes here ..."
}
```
- Response
* 200 Success
```json
{
    "message": "The business details are updated.",
    "status": "success",
    "data": null
}
```
#### Set business holder availability
- Post request: ```api/users/profile/availability```
- Body:
```json
{
    "availability": [
        {
            "day": 1,
            "startHour": 10,
            "startMinute": 0,
            "endHour": 19,
            "endMinute": 0
        },
        {
            "day": 2,
            "startHour": 9,
            "startMinute": 30,
            "endHour": 19,
            "endMinute": 30
        },
        {
            "day": 3,
            "startHour": 11,
            "startMinute": 30,
            "endHour": 20,
            "endMinute": 30
        },
        {
            "day": 4,
            "startHour": 9,
            "startMinute": 0,
            "endHour": 20,
            "endMinute": 0
        },
        {
            "day": 5,
            "startHour": 9,
            "startMinute": 0,
            "endHour": 14,
            "endMinute": 0
        }
    ]
}
```
- Response
* 200 Success
```json
{
    "message": "The user availability is updated.",
    "status": "success",
    "data": null
}
```
* 400 Bad request
```json
{
    "message": "Start time cannot be less than or equal to end time",
    "status": "failure",
    "data": {}
}
```
#### Set business type
- Post request: ```users/profile/businessType```
- Body: 
```json
{
    "businessTypeId": "62055417ab89400c51fd7f12"
}
```
- Response
* 200 Success
```json
{
    "message": "The new business type is set.",
    "status": "success",
    "data": {}
}
```
* 400 Bad request
```json
{
    "message": "Error while setting the business type",
    "status": "failure",
    "data": {}
}
```
