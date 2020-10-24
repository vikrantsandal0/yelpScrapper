# yelp-fusion
* A simple module written in node.js to fetch data from yelp-fusion API's.
### Tech-stack used
* express.js - a back end web application framework for Node.js.
* redis - In-memory caching solution used for fast access to API responses.
* axios - Promise based HTTP client for the browser and node.js.
* joi - powerful schema description language and data validator for JavaScript.
* Bluebird - fastest promises library in node.js
* underscore - utility-belt library for JavaScript that provides useful functional programming helpers.



### The complete yelp module can be divided into two main steps:

* Fetching business details like 10 results for coffee in the Kyoto area, pulling in photos, limit the number of results, sorting by one of the modes(recommended, rating, review counts, etc), capturing the Yelp ID of a business for further hits, etc.
* pull in some latest reviews for businesses using the Yelp ID of the businesses using.


### MODULE'S API RESPONSE EXAMPLES
   * **API results after we post term, location, sort_by(optional)through /scrapYelp API**
```{
  "message": "Successful",
  "status": 200,
  "data": [
    {
      "business_name": "Rolled Up Creamery",
      "business_image": "https://s3-media3.fl.yelpcdn.com/bphoto/bXfZdb-ormsgFwUhBwtJuw/o.jpg",
      "rating": 4.5,
      "address": "2621 Broadway St",
      "excerpt": "a nice young blonde lady was so kind to me. I haven't been treated so kindly by customer service in many years. she made me day, heck, my week! i believe...",
      "reviewer_name": "Audrey A.",
      "reviewer_image": "https://www.yelp.com/user_details?userid=R11XbzBJD_1nDOhpJF00LQ"
    },
    {
      "business_name": "Tin Pot Creamery",
      "business_image": "https://s3-media1.fl.yelpcdn.com/bphoto/Ssb4VrKoKwq7h0aRaosFDw/o.jpg",
      "rating": 4.5,
      "address": "855 El Camino Real",
      "excerpt": "The best ice cream in the Bay Area, hands down! If you visit during COVID, you won't be able to taste any samples. But every single ice cream we've ordered...",
      "reviewer_name": "Sophie S.",
      "reviewer_image": "https://www.yelp.com/user_details?userid=beUR5S_vG1M61GsoLHsB3A"
    },
    {
      "business_name": "Romolo's Cannoli",
      "business_image": "https://s3-media3.fl.yelpcdn.com/bphoto/AQ6Z0zLo99zZFhuY0vrG9A/o.jpg",
      "rating": 4.5,
      "address": "81 37th Ave",
      "excerpt": "I was in the Bay Area on business and arranged to get together with my sister and her partner in San Francisco for dinner over the weekend. My sister is the...",
      "reviewer_name": "Richard H.",
      "reviewer_image": "https://www.yelp.com/user_details?userid=S6gmpZrvppGPRRKTg4tymg"
    },
    {
      "business_name": "Scoop Microcreamery",
      "business_image": "https://s3-media3.fl.yelpcdn.com/bphoto/EF72G0yAqe_tkWJo0ynPkg/o.jpg",
      "rating": 4,
      "address": "203 University Ave",
      "excerpt": "Love that you can go in and check out all the flavors like in pre covid world but of Course at a social distance. Tried the taro and the bourbon vanilla....",
      "reviewer_name": "Linda H.",
      "reviewer_image": "https://www.yelp.com/user_details?userid=287YDYKELEL71qbCSU-z-Q"
    }
  ]
}
```

####  Caching middleware implementation
* Yelp says we may cache API content for up to a maximum of 24 hours. Therefore we used Redis as a middleware which is key/value store that we can use as a cache for our most frequently used data. We can use it as an alternative to forcing every single API call to hit yelp-fusion APIs which is an expensive hit. Hence we store our API results into Redis using Redis's SET using a time to live and let it manage how much memory is used for this and expire out the old data. 
* Our Redis cache middleware looking into the incoming request's body, check if there's already some data stored corresponding to it which hasn't expired and returns its which significantly reduces the response time of our API, hence in this way Offloading responsibilities from the application’s main logic to the caching layer frees up compute resources to process more incoming requests.



 ### FOLDER STRUCTURE
 * the complete structure has been built using Node.js, other libs like bluebird, joi etc.
 * modules -> scrapping  contains the parent API for fetching buisness details.
 * routes -> commonfunction.js contains API request body validation ,setting and getting data from redis.

### HOW TO INITIATE 
```
create .env file and add your yelp API key , (API_KEY = 'api key')
```
```
npm install
```
```
redis-server
```
```
nodemon server.js
```
```
To check my noob frontend skills :) go to  http://localhost:port/, it by defaults shows the best icecreams around redwood city.
```
### VIDEO LINK
[link](https://www.loom.com/share/70e3ce842f3441f2b0fff8658111e705)

### POSTMAN
[link](https://www.getpostman.com/collections/f9b81a2f37eecba0058b)

### images for reference
* **MIDDLEWARE DESIGN PATTERN**
![1_dWMuOSIJsuU27gZfuxJwRQ](https://user-images.githubusercontent.com/38485799/97068549-0f66f880-15e6-11eb-8021-35f848500bda.png)<br /><br /><br /><br /><br /><br />

* **CACHING APPROACH**
![Screenshot from 2020-10-24 10-44-28](https://user-images.githubusercontent.com/38485799/97068545-0b3adb00-15e6-11eb-97fe-972e0105e9fc.png)<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
* **FRONTEND**
![Screenshot from 2020-10-24 10-35-39](https://user-images.githubusercontent.com/38485799/97068544-070ebd80-15e6-11eb-8b3f-8ffabd251d30.png)


## Authors

* **Vikrant Sandal** 


