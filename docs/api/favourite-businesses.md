### Favourite businsses
#### Get favourite businesses
- Get request: ```/api/users/favourites```
- Add ```Authorization: Bearer token``` in the headers
- Response: 
```json
[
    {
        "firstName": "Atanas",
        "lastName": "Vasilev",
        "company": {
            "businessType": {
                "name": "Tattoo",
                "imagePath": "public/images/business-types/tattoo.jpg",
                "id": "62055417ab89400c51fd7f12"
            },
            "description": "Some description comes here",
            "address": "Some address comes here",
            "id": null
        },
        "id": "61f65f35d0734ccae3e8cbd2"
    }
]
```
#### Remove business from favourites
- Delete request: ```/api/users/favourites/:id```
   - Example: ```/api/users/favourites/61f65f35d0734ccae3e8cbd2```
- Add ```Authorization: Bearer token``` in the headers
- Response: 
* 200 Success
```json
{
    "message": "Removed from favourites.",
    "status": "success",
    "data": null
}
 ```
* 400 Bad request
```json
{
    "message": "The passed business is not added to favourites.",
    "status": "failure",
    "data": null
}
```

### Add to favourites
- Post request: ```api/users/favourites```
- Add ```Authorization: Bearer token``` in the headers
- Body: 
```json
{
    "businessId": "6c9ef89f-d9b0-43c6-9aae-99102281884c"
}
```
- Reponse:
* 200 Success
```json
{
    "message": "Added to favourites.",
    "status": "success",
    "data": null
}
```
* 400 Bad request
```json
{
    "message": "The passed business is already added to favourites.",
    "status": "failure",
    "data": null
}
```