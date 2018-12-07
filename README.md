# React Redux with Sagas

For this weekend challenge, you'll be building a portfolio site to showcase your work. 

## Setup

1. Create a database named `portfolio`
1. Run the following SQL using the `portfolio` database:

```SQL
CREATE TABLE "tags" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL
);

CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "description" varchar(2048),
    "thumbnail" varchar(2048), 
    "website" varchar(2048),
    "github" varchar(2048),
    "date_completed" date,
    "tag_id" INT REFERENCES "tags"
);

CREATE TABLE "project_tags" (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES "projects",
  tag_id INT REFERENCES "tags",
  tags INT
);


INSERT INTO "tags" ("name") 
VALUES ('React'), ('jQuery'), ('Node'), ('SQL'), ('Redux'), ('HTML'),('CSS3'), ('Bootstrap'), ('Material UI');


INSERT INTO "project_tags" ("project_id", "project_tags", "tags") VALUES (5, 2, 3), (5, 3, 2), (5, 5, 5),
(4, 4, 2), (4, 5, 2), (2, 3, 1), (2, 1, 3),
(3, 2, 2), (3, 1, 1), (3, 4, 3), (1, 1, 2);

SELECT * FROM "projects"
JOIN "person_hobby" ON "person"."id"="person_hobby"."person_id"
JOIN "hobby" ON "hobby"."id" = "person_hobby"."hobby_id";

SELECT "tags"."id", "project_tags"."tags"
FROM "tags" JOIN "project_tags"
ON "tags"."name" = "project_tags"."tag_id"
WHERE "project_tags"."project_id" = $1;

```

1. `npm install`
1. `npm run server`
1. `npm run client`

## Notes

### Tags

We've given you some starter tags. Feel free to change or add some.

For base mode, you should only include **one** tag per project. This gives you a one to many relationship. We'll cover many to many SQL queries next week. 

### Screenshots

To take a screenshot of your project, use `Command-Shift-4` on your mac. It turns the cursor into a crosshair, which you can drag to select a portion of your screen to capture. The image will appear on your desktop.

Place thumbnail images in the `public/images` folder. 

**Do not implement image upload for base mode.**


## Feature List

> NOTE: Start by taking inventory of the existing code. Part of the work for setting up sagas has been done for you.


### Project Page

- [ X ] Client side route that displays projects that are stored in the database
- [ branch name: projectpage-display-projects] Each project should conditionally render a name, description, thumbnail, website, date complete and a tag. Many of the fields are optional, only show properties that aren't null.
- [branch name: projectpage-display-link ] Include a link to GitHub that opens in a new window
- [ branch name: projectpage-display-name ] Add your name at the top of the page
- [ branch name: projectpage-sagas ] Use Sagas for API requests to your server

### Admin Page

- [ branch name: adminpage-form ] Client side route that displays a form allowing you to add a new project to your portfolio
- [ branch name: adminpage-dropdown-menu ] Include a drop down menu with a list of tags
- [ branch name: adminpage-post ] Send data to the server and notify the user of success or failure
- [ branch name: adminpage-table ] List projects by name and allow the user to delete them
- [  branch name: adminpage-btnto-projectpage ] Include a button that navigates to the project page

### General Tasks

- [ ] Commit your code frequently! You should have at 15+ commits on a project of this size. Use branches to help break down your features.
- [ ] Comment your code.
- [ ] Update this README to include a description of the project in your own words.

## Wireframes

> NOTE: Feel free to modify the styling and layout of content on the page. 

### Project Page

<img src="https://github.com/PrimeAcademy/weekend-6-portfolio/raw/master/wireframes/project_page.png" width="560">


### Admin Page

<img src="https://github.com/PrimeAcademy/weekend-6-portfolio/raw/master/wireframes/admin_page.png" width="560">

## Stretch Goals

- [ ] Use the GitHub API to get user information to display at the top of the page
- [ ] Improve styling on the page using Material UI
- [ ] Include a form on the admin page for adding new tags
- [ ] Implement additional features of the GitHub API
