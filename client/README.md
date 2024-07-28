# Fully Functional Website for Students
> This project is a fully functional prototype of a student website, where a student can do use all these features:
> book class, Chat community, Task Manager, Quiz app :fire:.

![students](https://user-images.githubusercontent.com/57598091/143719053-7a96b3db-57b8-4b37-967b-36014680e4b2.jpeg)

## Demo version
</br>
:key: Login Credentials ( for better experience )

```
Email: gupta@gmail.com / john@gmail.com / sam@gmail.com
Password: pass
Admin Password: admin
```

</br>
A demo version is automatically deployed for this repositories:

- Deployment for frontend part -[https://anshu-engage.herokuapp.com/](https://anshu-engage.herokuapp.com/)
- Video Demo -[https://drive.google.com/file/d/19FHY4XJBySfSfEmrlY6lWGBgLsvEJPDs/view?usp=sharing](https://drive.google.com/file/d/19FHY4XJBySfSfEmrlY6lWGBgLsvEJPDs/view?usp=sharing)


## Local Installation
</br>

### Steps
- `git clone <repository-url>` where `<repository-url>`is the link to the forked repository
- `cd Microsoft-Engage-21-Project`

Note : If you want to contribute, first fork the original repository and clone the forked repository into your local machine followed by `cd` into the directory

```
git clone https://github.com/USERNAME/Microsoft-Engage-21-Project.git
cd Microsoft-Engage-21-Project
```

#### Starting server

```
cd server1
cd server2
```
- Install all the dependencies with `npm install` for both server1 and server2
- Start the server1 and server2 with `npm run dev`
- server1: Visit your API at [http://localhost:3001](http://localhost:3001.) :tada:
- server2: Visit your API at [http://localhost:3002](http://localhost:3002.) :tada:

#### Starting frontend

```
cd client
```
- Install all the dependencies with `npm install`
- Start the server with `npm start`
- Visit your app at [http://localhost:3000](http://localhost:3000.) :tada:

>Login Page
<img width="555" alt="Screenshot 2021-11-28 at 12 19 44 AM" src="https://user-images.githubusercontent.com/57598091/143718813-ec6822a0-6b1a-4363-9eaf-f69c0af606a7.png">

>Home Page
<img width="555" alt="Screenshot 2021-11-28 at 12 20 25 AM" src="https://user-images.githubusercontent.com/57598091/143718855-73fb6943-8160-4b3f-be7d-7d83d5eb5d7c.png">

>Book class

<img width="603" alt="Screenshot 2021-11-28 at 3 38 38 PM" src="https://user-images.githubusercontent.com/57598091/143763836-15094511-caa4-440a-8d07-013cf402ce52.png">


>Task Manager

<img width="603" alt="Screenshot 2021-11-28 at 3 38 52 PM" src="https://user-images.githubusercontent.com/57598091/143763839-3dd388aa-8e80-4cc1-9997-03ad80c5fc9e.png">


>Quiz Application

<img width="603" alt="Screenshot 2021-11-28 at 3 39 00 PM" src="https://user-images.githubusercontent.com/57598091/143763843-565e3d17-96ab-4d85-a5a5-e7553b56ea04.png">


>Chat Community

<img width="603" alt="Screenshot 2021-11-28 at 3 39 08 PM" src="https://user-images.githubusercontent.com/57598091/143763846-bd96a01f-7dec-456b-8b1a-1a48164bb18a.png">
<img width="603" alt="Screenshot 2021-11-28 at 3 39 30 PM" src="https://user-images.githubusercontent.com/57598091/143763851-f5cbe8a9-1f85-483c-8694-34e6326aac5c.png">

## Features
</br>


1. Book Class :mortar_board:
   1. Ability to book class
   2. Ability to generate Receipt
   3. Ability to Login as Admin
   4. Admin can update or Delete seats
   5. Admin can see list of students who booked the seats
   
2. Task Manager:pencil:
   1. Each student will have a Task manager
   2. Student can add or delete the task
   
3. Quiz :closed_book:
   1. Ability to choose category, Difficulty level and number of questions
   2. Randomly picked questions will be rendered
   3. Student can view score
   4. student can view status of each question
   
4. Chat Community :iphone:
   1. Ability to Join a new group
   2. Ability to create a new group
   3. Ability to open existing group
   4. Multiple people can chat at the same time
   5. Ability to access chat anytime
   6. New user can access old chats
   
5. Security :closed_lock_with_key:
   1. user can register and login
   2. unauthorized user can't use the website
   3. without login you can't route/access any page
   
6. Database :open_file_folder:
   1. Everything is stored in database
   2. data of each user is stored seperately

   



## Technology Stack 
</br>
Please get familiar with the components of the project in order to be able to contribute.

### components
- CSS: Styling web pages, html files
- Javascript: Primary programing language
- ReactJS: Javascript library for building User Interfaces
- nodejs: Used in the backend
- express: To create the calling API
- Material-UI: UI library for design system
- socket.io: To established real time socket connection
- JWT: used for securely transmitting information between parties



#### External Service Dependencies
- MongoDB Atlas: A cloud database used to store user personal data username, passwords, Book class History, To do List, Chats, Quiz score

## Requirements
</br>

- node --version >= 6
- npm --version >= 3




#### Config Variables
Define config variables in config.env.

- Create a free mongoDB atlas account at [https://www.mongodb.com](https://www.mongodb.com) and set a new cluster connection url equal to `DATABASE`
- Set `SECRET_KEY = <your_jwt_secret_string>` where `<your_jwt_secret_string>` is long alphanumerical string 



## Contributing

> Feel free to **contribute** :heart_eyes:
- When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.
