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

CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "description" varchar(2048),
    "thumbnail" varchar(2048), 
    "website" varchar(2048),
    "github" varchar(2048),
    "date_completed" date,
);

CREATE TABLE "project_tags" (
  "project_id" INT REFERENCES "projects",
  "tag_name" varchar(80) NOT NULL
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
2. `npm run server`
3. `npm run client`



