# menuManagement

# Menu Management API

Foobar is a Python library for dealing with word pluralization.

## Installation

* clone the repository locally.
* Open root folder and run 'npm install' to install all dependencies.
* Get a mongoDB connection string and add it in db.js
* run node index.js
* Open postman and test all the endpoints.

## Endpoints
One can test the following end points-

* To create a category(Use POST)

```bash
http://localhost:3000/api/category
```
Request Body should look like-
```bash
{
"name": "Breakfast",
 "description":"Food for your bright Mornings!",
  "image":"url://12345678rv92nb",
  "tax":50,
"taxApplicability":true,
"taxType":"GST"
}
```
* To create a Sub-Category(Use POST)

```bash
http://localhost:3000/api/subcategory
```
Request Body should look like-
```bash
{
"name": "Sandwiches",
"description":"This is a Sandwich",
"image":"phoigtjrv92nb",
"categoryId":"66bdc730776ee9f4c24d1e70"
}
```

* To create a item(Use POST)

```bash
http://localhost:3000/api/items
```
Request Body should look like-
```bash
{
"name": "Kheer",
 "description":"This is Kheer Item",
  "image":"fasvcjrv92nb",
"baseAmount":200,
"discount":50,
"categoryId":"66bdc970776ee9f4c24d1e74"
}
```

* To create a item(Use POST)

```bash
http://localhost:3000/api/items
```
Request Body should look like-
```bash
{
"name": "Kheer",
 "description":"This is Kheer Item",
  "image":"fasvcjrv92nb",
"baseAmount":200,
"discount":50,
"categoryId":"66bdc970776ee9f4c24d1e74"
}
```
* To get all categories(Use GET)

```
http://localhost:3000/api/category
```
* To get a category by name or objectId(Use GET)

```
http://localhost:3000/api/category/66bdc970776ee9f4c24d1e74
```
```
http://localhost:3000/api/category/Breakfast
```
* To get a sub-category by name or objectId(Use GET)

```
http://localhost:3000/api/subcategory/66bdc970566ee9f4c24d1e74
```
```
http://localhost:3000/api/subcategory/Parantha
```
* To get a item by name or objectId(Use GET)

```
http://localhost:3000/api/items/66bdc970566ee9f4c24d1e74
```
```
http://localhost:3000/api/subcategory/Cheese Sandwich
```

* To get all subcategories in a category(Use GET)

```
http://localhost:3000/api/category/subcategories/66bba86486956a2891b4dd74
```
* To get all subcategories in a category(Use GET)

```
http://localhost:3000/api/category/subcategories/66bba86486956a2891b4dd74
```
* To get all items in a sub-category(Use GET)

```
http://localhost:3000/api/subcategory/items/66bdce88776ee9f4c24d1e83
```
* To update a category(Use PUT)

```bash
http://localhost:3000/api/category/66bbc1f78c3aed099ffd06a5
```
Request Body should look like-
```bash
{
"name": "1232435",
 "description":"Rajma chawal",
  "image":"56789"
}
```
* To update a Subcategory(Use PUT)

```bash
http://localhost:3000/api/subcategory/66bbc1f78c3aed099ffd06a5
```
Request Body should look like-
```bash
{
"name": "Lunch",
 "description":"THis is lunch",
  "image":"56789",
  "taxApplicability":true
}
```
* To update a Item(Use PUT)

```bash
http://localhost:3000/api/items/66bdd8ca3eeeb0e618cb200a
```
Request Body should look like-
```bash
{
"name": "paneer",
 "description":"THis is paneer",
  "image":"url56789",
  "taxApplicability":true
}
```


```

```
* To Search a Item(Use GET)

```bash
http://localhost:3000/api/searchitems?name=al
```
## Questions
* Which database you have chosen and why?

I chose MongoDB as the database for this assignment because it is a NoSQL database that offers flexibility in data modeling, which is particularly useful for hierarchical structures like categories, subcategories, and items. MongoDB's document-oriented storage allows for the efficient storage of complex and nested data, such as the tax applicability and pricing details associated with each menu item.

* 3 things that you learned from this assignment?

->Handling Hierarchical Data in MongoDB 

->API Design and Implementation

->Handling Search APIs

* What was the most difficult part of the assignment?

The most difficult part of the assignment was implementing the hierarchical relationships between categories, subcategories, and items while ensuring that the tax and pricing logic remained consistent across different levels. Handling scenarios where tax applicability or pricing needed to inherit or override values from parent categories required careful schema design and complex querying logic.

* What you would have done differently given more time?

 I would have added authentication logic to secure the API endpoints, ensuring that only authenticated users can access the system.Furthermore, I would have restricted the ability to create, edit, or delete categories, subcategories, and items to users with admin privileges.

