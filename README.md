# Personal Website

For this weekend challenge, you'll be building a portfolio site to showcase your work. 

## Setup

1. Create a database named `portfolio`
1. Run the following SQL using the `portfolio` database:

```SQL
CREATE TABLE "tags" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL
);

INSERT INTO "tags" ("name") 
VALUES ('React.js'), ('jQuery'), ('Node.js'), ('MongoDB'), ('Mongoose'), 
('Redux.js'), ('HTML'),('CSS'), ('Bootstrap'), ('Material UI'), 
('Passport'), ('Google Maps API'), ('Twilio API'), 
('Giphy API'), ('Express'), ('PostgreSQL'), ('Firebase'),  
('Heroku'), ('GitHub'), ('Jest');

CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "description" varchar(2048),
    "thumbnail" varchar(2048), 
    "website" varchar(2048),
    "github" varchar(2048),
);



```

1. `npm install`
2. `npm run server`
3. `npm run client`



