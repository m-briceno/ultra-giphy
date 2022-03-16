# UltraGiphy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Running
In order to run the project node, or another package manager, must be installed. 
First run npm i then run ng serve and navigate to localhost:4200. 

## About

Ultra giphy is an angular project that consumes the giphy API in order to present a 3x3 grid. 
The giphie search is, by default, the trending giphies and if the user wants he can search
for a specific giphy by querying the api through the search button.
The project has a simple pagination implemented that allows to move forward, backward or return
to the first page caching the results.

## Implementation

UltraGiphy was developed using ngrx + effects to manage the application store. The calls to the api
originate from effects that use a service to make the requests and when the response returns the
data is then saved on the store through a reducer.

The main component, smart component, is the UltraGiphyComponent that dispatches the actions and
listens(subscribes) to the store changes and propagates the data to the grid component, dummy
component, whose sole purpose is to handle the data accordingly and present it.

A service named GiphyService was created to make the giphy requests. These requests are intercepted by 
the GiphyHeaderInterceptor and the HttpCounterInterceptor. The first one adds to the request the api 
key whereas the second one, by using the store, implements a request counter. This request counter is
used to display a loading when count > 0 in case the request is longer than expected.

The project also supports routing but currently only has one route, the homepage. If the user tries
to navigate to a different url an error page is presented with a link to return to the homepage.
