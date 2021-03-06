# Yelp Camp
Yelp Camp is full-stack web application project that allow users to post information about a camp or rate a camp.

This app is created in MVC architecture. The tech stack of this app contains Node.js, Express.js, MongoDB, and Bootstrap. Images are stored on Cloudinary, and maps are displayed using Mapbox API.

## Features
- Fully responsive website
- Support user authentication and authorization
- Support displaying location on Map
- Support multiple files select and upload
- Flash messages responding to user's interaction
- Images are stores on a cloud-based storage

## Backend API
### Index Routes
```
[METHOD]        [PATH]                              [detail]
GET             /                                   Landing page
```

### User Routes
```
[METHOD]        [PATH]                              [detail]
GET             /register                           User register page
POST            /register                           Register a new user
GET             /login                              User login page
POST            /login                              Login the user
GET             /logout                             Logout the user
```

### Campground Routes
```
[METHOD]        [PATH]                              [detail]
GET             /campgrounds                        Fetch all the campgrounds
POST            /campgrounds                        Create a new campground
GET             /campgrounds/new                    Campground create page
GET             /campgrounds/:id                    Show detail of a specific campground
PUT             /campgrounds/:id                    Update campground information
DELETE          /campgrounds/:id                    Delete a specific campground
GET             /campgrounds/:id/edit               Campground update page
```

### Review Routes
```
[METHOD]        [PATH]                              [detail]
POST            /campgrounds/:id/reviews            Post a review
DELETE          /campgrounds/:id/reviews/:reviewId  Delete a review
```

## Deployment
This app was deployed on Heroku. <br>
live at: https://immense-woodland-11059.herokuapp.com/
