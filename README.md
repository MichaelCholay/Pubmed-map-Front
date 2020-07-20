# Welcome to Pubmed-map !
 ### Search - Localize - Cooperate
(Angular: part 4/4)

Pubmed-map allows localization and mapping of authors of biomedical literature from medline and life science journals of pubmed.gov library (NIH National Library of Medicine and NCBI National Center for Biotechnology Information) in the aim to develop cooperation between scientists. At this time, Pubmed-map API collect articles of the TOP3 of scientific journals (Cell, Nature Reviews Genetics and Nature Reviews Molecular Cell Biology) each day).
 
Pubmed-map is divided into 4 parts available in this Github account :
   
   - [Pubmed-map - API REST]([https://github.com/MichaelCholay/Pubmed-map-Node](https://github.com/MichaelCholay/Pubmed-map-Node)) to send daily requests to the official Pubmed api and to save specific articles' data in MongoDb with NodeJs server.
   - [Pubmed-map - Spring Microservice article]([https://github.com/MichaelCholay/Pubmed-map-spring-articles](https://github.com/MichaelCholay/Pubmed-map-spring-articles)) to send request to Pubmed-map API and to analyze recovered data
   - [Pubmed-map - Spring Microservice authentification]([https://github.com/MichaelCholay/Pubmed-map-spring-jwt](https://github.com/MichaelCholay/Pubmed-map-spring-jwt)) to allow creation of user session and selection of favorite articles in MySQL database. This part is based on JWT authentification tutorial of [grokonez.com](http://www.grokonez.com)
   - [Pubmed-map - Angular]([https://github.com/MichaelCholay/Pubmed-map-Front](https://github.com/MichaelCholay/Pubmed-map-Front)), the front part of this project based on open-source [Leaflet library]([http://www.leafletjs.com](http://www.leafletjs.com))
 

## Technologies for development of Pubmed-map - Angular
   
   - Angular v9
   - Bootstrap v4.5
   - Angular Material v9
   - jquery v3.5
   - leaflet: v1.6
   - leaflet-geosearch: v3.0
   - leaflet-search: v2.9
   - leaflet.markercluster: v1.4

## Technologies for CI/CD of Pubmed-map - Angular
   
   - [Heroku](www.heroku.com), Cloud application platform
   - [GitHub actions]([https://fr.github.com/features/actions](https://fr.github.com/features/actions)), CI/CD workflow

## How to use Pubmed-map - Angular

### Installation
   In your terminal :
   - clone this repository `git clone https://github.com/MichaelCholay/Pubmed-map-spring-articles.git`

Then, you can import this project in your IDE.

### Configuration
Then, set environment variables (`articleHost` and `jwtHost`) for those different environments (dev and prod, for example) in these two files:
   - `src/environments/environment.ts` file for dev environment
   - `src/environments/environment.ts` file for prod environment
 
### Run
In the root directory:
  - build the project: `ng build` for dev environment with its variables
  - or build with `ng build --configuration=production`for prod environment with its variables
  - run the project: `ng serve -o`
  - got to `http://localhost:4200`with your favorite web browser
#