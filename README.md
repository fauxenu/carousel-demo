Demo Carousel
==============
A demo project that uses Backbone, Marionette, and the [iTunes Search API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/) to display a list of songs as a paged carousel.

Running the Project
--------------------
Clone this repro and open ``build/deploy/index.html`` in an web browser:

```
$ git clone git@github.com:fauxenu/carousel-demo.git
$ cd carousel-demo
$ open build/deploy/index.html
```

Development Setup
--------------------
Clone this repro and run ``npm install`` to install dependencies:

```
$ git clone git@github.com:fauxenu/carousel-demo.git
$ cd carousel-demo
$ npm install
```

Running the Development Server
-------------------------------
Startup the development server:

```
$ grunt server
```

The app will now by running on port ``7070``, and can be opened in any browser:

```
$ open http://localhost:7070
```

Grunt will watch the `/src` directory and recompile the project as changes are made.

Deploying
----------
Run the deploy task:

```
$ grunt compile-deploy
```

This will compile, package, and uglified any code in ``/src`` and deploy it to
``build/deploy``.

