# soc-network api

## Description

A social network API utilizing MongoDB. There is no front end so users must utilizie something like Insomnia or Postman to access routes and perform CRUD operations. Users are able to add thoughts and react to other users' thoughts, as well as add and remove friends or update their profile.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation

To run this app users must have node and MongoDB installed on their device. They must also have Insomnia or Postman to view the routes and perform CRUD operations.

## Walkthrough Video

[A walkthrough video of the app](https://drive.google.com/file/d/15CGc86EEHAwmpGhc7fofXBJx4CL7a9Jj/view?usp=sharing)