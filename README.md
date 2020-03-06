# googleAPIplaneat

PLAN EAT API FOR GOOGLE CLOUD

## OAuth procedures

### Register User

> POST - /auth/registerUser  
Headers: 'content-type' = application/json

PARAMETERS | Description
-----------| -----------
__mail__   | string(200, TODO: regex filter)
__password__| string (currently no restrictions, limit:100)
__premium__ | 0 or 1 (not secured at all, TODO: make it only modifiable internaly)

Return 200: OK, 400:Error

![Register](https://i.imgur.com/78xlzj6.png)
![Content-Type](https://i.imgur.com/N4fK8zs.png)

### Login
>POST - /auth/login  
Headers: 'content-type' = application/json

PARAMETERS | Description
-----------| -----------
__Username__ | email: string(200)
__password__ | string(100, TODO: max 16 chars, + regex filter)
__grant-type__ | default: password
__client_id__ | unset, any value but null will work
__client_secret__ | same as above

Return 200: OK, 400: Error

![Login](https://i.imgur.com/I2IcnE4.png)

## Authorisation
Any internal data will require an user token to grant accessibility.

> Prefix: Bearer  
> Token: XXXXXXXXXXXXXXXXXXXXXXXXXXXX

![Auth](https://i.imgur.com/2AgCjG3.png)
