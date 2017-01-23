# Supported tags and respective `Dockerfile` links

-	[`latest`](https://raw.githubusercontent.com/ilice/OSCWeb/master/Dockerfile)

This image is updated via [commits and releases to the `ilice/OSCWeb` GitHub repo](https://github.com/ilice/OSCWeb).

# What is OSCWeb?

OSCWeb is the front end side of Open Smart Country, a new project with the intent of revolution land use. It's developed with several libraries and frameworks like nodejs,  npm, Browserify, Gulp, SaSS, babelify, pagejs, yo-yo, and more.

> [OSCWeb wiki](https://github.com/ilice/OSCWeb/wiki)

![logo](https://github.com/ilice/OSCWeb/blob/master/assets/favicon/OpenSmartCountry_logo_128x128.png)

# How to use this image

## Starting simple web server

```console
$ docker run -ti -P -d --name oscweb teanocrata/oscweb
```

Runs container in background and prints container ID with web server at a random port with OSCWeb page.

## Starting simple web server at specific port

```console
$ docker run -ti -p 8000:8000 -d --name oscweb teanocrata/oscweb
```

This binds port 8000 of the container to port 8000 on the host machine.

Then you can hit `http://localhost:8080` or `http://host-ip:8080` in your browser.

## Run a console in the container

```console
$ docker exec -ti oscweb bash
```

# User Feedback

## Issues

If you have any problems with or questions about this image, please contact us through a [GitHub issue](https://github.com/ilice/OSCWeb/issues).

## Contributing

You are invited to contribute new features, fixes, or updates, large or small; we are always thrilled to receive pull requests, and do our best to process them as fast as we can.

Before you start to code, we recommend discussing your plans through a [GitHub issue](https://github.com/ilice/OSCWeb/issues), especially for more ambitious contributions. This gives other contributors a chance to point you in the right direction, give you feedback on your design, and help you find out if someone else is working on the same thing.

## Documentation

Documentation for this image will be stored in the [OSCWeb wiki](https://github.com/ilice/OSCWeb/wiki).
