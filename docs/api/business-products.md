### Business products
- Add ```Authorization: Bearer token``` in the headers
#### Get user products
- Get request: ```api/products``` - get all the user products
- Response:
```json
[
    {
        "name": "Gentleman hairstyle",
        "price": 25,
        "durationInMinutes": 30,
        "id": "62094c87e193dd9cf08a9f42"
    },
    {
        "name": "High-level manicure",
        "price": 25,
        "durationInMinutes": 30,
        "id": "62094bfae193dd9cf08a9f3b"
    }
]
```

#### Create product
- Post request: ```api/products```
- Body
```json
{
    "name": "Gentleman hairstyle",
    "durationInMinutes": 30,
    "price": 25
}
```
- Response
* 200 Success
```json
{
    "message": "Product created successfully.",
    "status": "success",
    "data": {
        "name": "Gentleman hairstyle",
        "price": 25,
        "durationInMinutes": 30,
        "businessOwner": "62094ad7067d0057c39da553",
        "id": "62094ed8e193dd9cf08a9f47"
    }
}
```
* 400 Bad request
```json
{
    "message": "Error while saving the product.",
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
            "value": "L",
            "msg": "Invalid value",
            "param": "name",
            "location": "body"
        },
        {
            "value": 45.5,
            "msg": "Invalid value",
            "param": "durationInMinutes",
            "location": "body"
        }
    ]
}
```
#### Update product
- Put request: ```api/products/:id```
    - Example ```api/products/6208fe8a0f8742bc3a35f0a``` where ```6208fe8a0f8742bc3a35f0a``` is the product id
- Body
```json
{
    "name": "Gentleman hairstyle - edited",
    "price": 33,
    "durationInMinutes": 30
}
```
- Response
* 200 Success
```json
{
    "message": "The product were updated successfully.",
    "status": "success",
    "data": {}
}
```
* 400 Bad request
```json
{
    "message": "Error while updating the product",
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
            "value": "G",
            "msg": "Invalid value",
            "param": "name",
            "location": "body"
        }
    ]
}
```
#### Delete product
- Delete request: ```api/products/:id``` where id is the product id. Example: ```http://localhost:4000/api/products/62055f84e558e7a0d557c13b```
- Response
* 200 Success
```json
{
    "message": "The product was deleted",
    "status": "success",
    "data": {}
}
```
* Bad request
```json
{
    "message": "Problem occur while deleting the product.",
    "status": "failure",
    "data": {}
}
```
