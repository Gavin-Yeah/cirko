  ![Cirko poster](https://github.com/JiadaYe/cirko/blob/master/jiaday%40uci.edu-48x36.jpg)
## Background
Traditional social networking applications, like Twitter and Facebook, connect users who already share a relationship. Users are able to follow celebrities and online friends, and check the newest events, but they might neglect something happening around, in the same block, or in the same town. Cirko, our location-based social networking app helps in such situations.
Project Opportunity
Unlike the traditional social networking apps, Cirko can help users find out the events happening nearby despite not having any acquaintances at that location.
## Project Vision
Consider the example of John who traveled to New York for his Spring break. He could use Cirko to find out about the details of the ball game happens in Rucker Park, the great sale happening around the fifth street, and fireworks show in Central Park, even if he is new to New York.
Business Model
Similar to the existing social networking apps, advertisements will be the primary source of revenue. Through our project, we can tune the ads based on the user's location. Tuning advertisements by the distance to the users greatly increases the relevancy between the advertisement content and users, stimulating the consumptions.
## Target Market
1.	Tourists who want to explore interesting local events.
2.	Residents who are new to the city and are looking to make new friends and explore their neighborhood.
## Technical Stack
For the front-end, we used React framework to design and implement the single-page website, like a mobile application. We imported Ant Design UI Mobile Library to implement the responsive components compatible on a majority of mobile devices. We used Firebase Hosting to host out websites.
For the back-end, we used the firebase to deploy our project. Firebase authorization can help us to get the user’s information from google account, and we also use it to support the sign-in and sign-up part. For the database, we connected our project with Google Firebase Cloud Storage, and create two collections for the user and the post. To store the pictures in cloud, we connected with the Firebase Storage, which is a cloud storage built on google cloud server. 

## Result
We finished all the basic functions we expected at the web application.
1. Share Posts:
Users are able to input up to 300 words and upload up to 9 pictures. There is a radio button on which user can decide showing the location or not.
2. View Nearby Posts
Our application will attach a location tag to all the posts and the user. Through the slider, users can adjust the distance radius to control the range of incoming posts. Users can view the post information including post location, poster avatar, poster name, post content, comment number and like number.
3. Comment or Like a Post:
Users can view all comments of the post they are viewing, and they can make some comments up to 300 words. Users can also like a post. The liked post will be stored in Favorite Page.
4. Update Personal Information 
Users can update the user name, user avatar and password. 
5. Advertisement Rotator
We set an advertisement window on the top of the homepage, which is tuned by the user’s location. Clicking the advertisement will redirect the page to the advertisement website.
