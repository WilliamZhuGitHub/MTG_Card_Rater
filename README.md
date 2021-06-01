 # MTG_Card_Rater

## Description
* Create your own custom Magic the Gathering cards. 
* Users can rate and comment on other user created cards.
* Includes a database of standard sets using scryfall's API. 
* Includes search functionalities for user submitted cards and standard sets

![preview](https://user-images.githubusercontent.com/56366459/120350030-9abb1180-c2cc-11eb-85aa-0ac9b00b2659.JPG)

## How to use
* Create an account to access card creation and commenting features
* (All passwords are hashed and salted and authenticated using passport.js)
* Viewing custom cards and standard sets do not require an account 
* There is currently no email verification system
* Website may take up to 30 seconds to load 

## Technology Used
* Uses MongoDB with Mongoose for database storage, 
* Express.js and Node.js to handle routes, requests, and views. 
* Bootstrap for Front-End
* Deployed on Heroku at https://mtg-card-rater.herokuapp.com/
