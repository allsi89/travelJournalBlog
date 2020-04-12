# TravelJournalBlog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.


Public parts: 
- Home 
- All Posts - two different views: 
   1. Normal view, including all posts as cards
   2. Table view, including brief information about all posts
- Login 
- Regiser

Private Parts:
- Create Post
- Delete Post
- User Posts
- Post Info
- Like Post
- Edit Post (only init view and access to it, no actual edit logic)

Functionalities:
1. Completed:
 - Create a post
 - Delete own post 
 - Upload Images for posts
 - Like posts
 - View posts by author
 - Filter posts on Table view All Posts (no paging or sort => To Be Added)
 - View Details Page for each post
 - Form validations
 
2. To be added:
 - account settings: change password/username/email/profile picture/basic info, forgot password 
 - profile page, including posts by the specific user plus profile public information
 - share posts
 - comment on posts
 - notifications on own posts' comments
 - edit post
 - post structure with location
 - map travel locations -> inclusion of travel entry location 
 
 Database structures:
 
 1. Users database: collection of users where each user = {username, id, email} (To Add profile picture, brief description)
 2. Posts database(name: posts-db): collection of documents(docId = userId) where each user has a collection of posts (To add collection of comments for each post)
 
 

Providers used:
- Angular FireStore: database + storage for images
- Angular Material
- ngRx store

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
