# StyleMate - Project-2


Introducing StyleMate, the web application that empowers you to curate your very own wardrobe capsule collection and seamlessly share your unique fashion creations with a global community of like-minded fashion enthusiasts. With StyleMate, the fashion world is your canvas, allowing you to not only showcase your personal style but also find endless inspiration from others.

Gone are the days of endless scrolling and fashion dilemmas. Now, you can effortlessly assemble your carefully selected clothing pieces and give your curated collection a distinct name to capture the essence of each season's style evolution.

### What is a Wardrobe Capsule

A capsule wardrobe streamlines your clothing collection to a carefully curated selection of versatile, high-quality pieces that seamlessly harmonize with one another. This deliberate curation eliminates the clutter in your wardrobe, ensuring that every item is utilized to its fullest potential. By investing in timeless, durable clothing that aligns with your personal style, you ultimately save money over time, steering clear of impulsive fashion purchases. This approach not only saves you precious minutes during your daily clothing choices but also contributes to a more sustainable and eco-conscious lifestyle, embracing the notion that less can indeed be more.

## WireFraming 
**left side is the planing | right side the end product**
![StyleMate-Framing-END](https://github.com/Hirostory/Project2/assets/135872883/c10fea4f-dce4-4a37-8615-2a9b1c9b38eb)

## Language Used 

- HTML 
- CSS 
- JavaScript
- EXPRESS (7 RESTful routs, full CRUD, One to many Relationship, Method-Override, dotENV)
- Node.js
- EJS - holds the templates of the website and  used partials 
- Mongoose - holds the structure of the model 
- MongoDB - holds data base of my model

## Approach 

For this project, I decided to use the One-to-Many relationship by creating a main model that also has four models embedded in that schema. I built my whole website around it, having five routers, five EJS view folders, and five sets of restful routes designated to each of my models. Once that is set, I need to plan how to utilize my routes by directing or redirecting to them to create a unified website. After ensuring all the functionality works, I'll move on to getting my data and working on the design aspects. I opted for a simplistic design since my website is very image-heavy.

## Link to The Live Site 

Hosted by Heroku 
https://evening-mountain-25797-5882822564c4.herokuapp.com/stylemate

## Issues and Note to improve 


- pathing issues need to be resolve ( some redirect cant identify the object id)
- want to add a login/register user
- want to add a hover effect on the images
- want to add multiple forum which i started doing but didnt end up doing
- improve the design ( i think its not user friendly yet )
- want to add more sections ( accessories, trendy, and color story section )
