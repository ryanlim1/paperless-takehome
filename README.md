# Paperless Parts Take-Home Assessment
Descriptions of Colleges in Massachusetts

## Features

- List/index view that shows all schools on the front page

- Pagination

- Sorting by default (the order in the json file), alphabetically, current location of the user (utilized geo-location api)

- A detailed view that shows all information about a particular school (data from all downloaded files)
## Technologies Used

- React - Frontend library.

- Node - Utilized the fs module to parse and read through the csv file.

- Express - Provides simple routing to retrieve csv data with a GET request. 
## How to Install and Run

1. Clone this repository to your local machine.
    
    - git clone 'url'

2. Install dependencies. 

    - npm i

3. To start the development server:
 
    - npm run start


## Additional Features I Would Add

- Filter - only display schools that the user would like to see (ex: schools greater than a certain admissions rate, SAT average, etc.).

- Search - display a detailed view of a school that a user searches for by name (disables need to paginate if user wants a detailed view of a certain school).

- SQL Database - utilize relational tables, instead of JSON and CSV files.

### How I Would Implement a DB

- Store all data from ma_schools.json into a table called Schools except for the programs (since it is an array). The primary key would be the institution's name.

- The programs for each school will be stored in a separate table called School-Programs (one-to-many relationship between each school and programs). The primary key is an auto-generated ID and the foreign key is the institution's name. 

- The CSV file is split up into 3 tables: Carnegie Classification, Highest Degree and Locale of Institution. The primary keys are the integer values corresponding to each description.

#### Schools

INSTNME (primary) | CITY | ADM_RATE | ZIP | HIGHDEGREE | LOCALE | SAT_AVG | LONGITUDE | LATITUDE | CCSIZESET | INSTURL
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |---

#### Programs

ID (primary)| 10-digit code | INSTNME (foreign) | Description of Program
--- | --- | --- | ---

#### Carnegie_Classification

ID (primary) | Description 
--- | ---

#### Locale

ID (primary) | Description 
--- | ---

#### Degrees

ID (primary) | Description 
--- | ---


- Utilize useEffect hook to SELECT INSTNME, LONGITUDE and LATITUDE (allows for sorting features)

- If a card is selected to show detailed view, 
    - SELECT INSTNME, CITY, ADM_RATE, ZIP, SAT_AVG, INSTURL, Programs.Description, Highest_Degree.Desciption, Locale.Description, Carnegie_Classification.Description FROM Schools JOIN Programs ON Schools.INSTNME = Programs.INSTNME JOIN Carnegie_Classification ON Schools.CCSIZESET = Carnegie_Classification.ID JOIN Degrees ON Schools.HIGHDEGREE = Degrees.ID JOIN Locale ON Schools.LOCALE = Locale.ID;






