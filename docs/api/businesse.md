### Businesses
#### Get businsses by type
- Get request: ```/businesses/byType/:id``` where id is the id of the service type
    - Example: /businesses/byType/6c9dfff-d9b0-43c6-9aae-99102281884c - get all businsses for type Gym and Fitness
- Add ```Authorization: Bearer token``` in the headers
- Response: 
```json
[
    {
        "id": "6c9ef89f-d9b0-43c6-9aae-99102281884c",
        "firstName": "Anna",
        "lastName": "Velichkova",
        "phone": "+35987568945",
        "description": "Anna hairdressing studio",
        "address": "Sofia, ul. \"Atanas Manchev\" 18",
        "addedToFavourites": false
    },
    {
        "id": "6c9ef89f-d9b0-43c6-9aae-99102281884c",
        "firstName": "Galena",
        "lastName": "Petrova",
        "phone": "+35987568333",
        "description": "Gelena hairdressing studio",
        "address": "Sofia, ul. \"Atanas Ishirkov\" 18",
        "addedToFavourites": true
    },
    {
        "id": "6c9ef89f-d9b0-43c6-9aae-99102281884d",
        "firstName": "Maria",
        "lastName": "Marinova",
        "phone": "+35987568777",
        "description": "Maria hairdressing studio",
        "address": "Sofia, ul. \"Ivan Vazov\" 18",
        "addedToFavourites": false
    },
    {
        "id": "6c9ef89f-d9b0-43c6-9aae-99102281884e",
        "firstName": "Plamen",
        "lastName": "Terziev",
        "phone": "+35987568475",
        "description": "Plamen hairdressing studio",
        "address": "Sofia, ul. \"Ivan Ivanov\" 18",
        "addedToFavourites": true
    },
    {
        "id": "6c9ef89f-d9b0-43c6-9aae-991022818dfc",
        "firstName": "Mario",
        "lastName": "Kirov",
        "phone": "+35987568783",
        "description": "Mario hairdressing studio",
        "address": "Sofia, bul. \"Asen Yordanov\" 1",
        "addedToFavourites": false
    },
    {
        "id": "6c9ef89f-d9b0-43c6-9aae-99102281rf4c",
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "phone": "+35987568478",
        "description": "Ivan hairdressing studio",
        "address": "Sofia, bul. \"Bulgaria\" 11",
        "addedToFavourites": false
    }
]
```
