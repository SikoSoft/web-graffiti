# Web Graffiti

Canvas & Node based live drawing application that enables multiple users to draw on the same image in real time.

To see it in action, visit:

[drawonmywall.live](https://drawonmywall.live)

# Running locally

Install NPM dependencies:

npm install

Depending on your system, you may need to manually install additional system dependencies to build the "canvas" package. More information can be found at:

https://www.npmjs.com/package/canvas

When dependencies are in place, setup the configuration file.

Copy example.config.json to config.json and adjust the values as necessary. Nothing should need to be changed and the application will run as-is.

Access the web page at:

http://localhost

Script naming convention

It can be assumed that scripts beginning with "compile" will transpile Typescript to Javascript, and nothing else. Scripts beginning with "build" will not only perform transpilation, but also might copy files or run additional scripts needed to wrap things up neatly.
