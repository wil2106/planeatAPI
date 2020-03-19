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
__grant_type__ | default: password
__client_id__ | unset, any value but null will work
__client_secret__ | same as above

Return 200: OK, 400: Error

![Login](https://i.imgur.com/I2IcnE4.png)

## Authorisation
Any internal data will require an user token to grant accessibility.

> Prefix: Bearer  
> Token: XXXXXXXXXXXXXXXXXXXXXXXXXXXX

![Auth](https://i.imgur.com/2AgCjG3.png)

## Endpoints

### Products

> GET - /products 

Parameters | Description |
-----------| ----------- |
__/__  | /|

> GET - /products/:id  

Parameters | Description |
-----------| ----------- |
__id__  | Integer|

Example: GET - /products/1

### Recipes

> GET - /recipes  

Parameters | Description |
-----------| ----------- |
__/__  | /|


> GET - /recipes/search  

Content-Type: JSON

Parameters | Description |
-----------| ----------- |
__keywords__  | Search keywords |

Example: { "keywords": "pates" }

> GET - /recipes/:id  

Parameters | Description |
-----------| ----------- |
__ID__  | Integer |

Example: GET - /recipes/1

> GET - /recipes/:id/details  

Parameters | Description |
-----------| ----------- |
__ID__  | Integer |

Example: GET - /recipes/1/details

> POST - /recipes/:id/rate

Parameters | Description |
-----------| ----------- |
__ID__  | Integer

Content-type: JSON
Parameters | Description |
-----------| ----------- |
__user_id__  | Integer, user ID|
__rate__ | Rating, from 0 to 10 |

Example: { "user_id": 1, "rate": 5 }

### Planning

> GET - /planning

Content-type: JSON
Parameters | Description |
-----------| ----------- |
__user_id__  | Integer |
Example: { "user_id": 1 }

> POST - /planning  

Content-type: JSON
Parameters | Description |
-----------| ----------- |
__date__  | Javascript : new Date() object |
__user_id__ | Integer|
__recipe_id__ | Integer |
__mealtype_id__ | Integer: 1,2,3 |

> DELETE - /planning  

Content-type: JSON
Parameters | Description |
-----------| ----------- |
__meal_id__  | Integer |

