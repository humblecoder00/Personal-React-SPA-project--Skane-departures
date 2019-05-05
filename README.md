# Skåne Departures v1: A Personal ReactJS SPA (Single Page Application) Project:

## About:

Skåne Departures is a responsive SPA which helps to search the closest departures based on given criterias:

`Start Point:` Address, Place or Station.
`Date:` Starting date.
`Time:` Starting time.

It uses Skånetrafiken's Open API endpoints to perform related queries.

###### Functionality:

`Calculate:` If the given start point is an Address or a Place, App first calculates the nearest station in meters and displays the distance - then searches and displays the departures based on closest station and given date & time.

If the given start point is a Station, App ignores displaying distance and only brings the departures based on given date & time.

###### Main technologies used during development:

`Front-end:` Built with using ReactJS as main framework, along with couple handy npm packages. CSS is fully custom hard-coded, background picture is taken personally.

###### Live version: https://skanedepartures.herokuapp.com
