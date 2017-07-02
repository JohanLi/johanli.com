Personal website built using React. The client part calls an Express backend, which in turn
uses MySQL and Redis. Server-side rendering is done in production. During local development,
React components are hot reloaded as well SASS and the Express backend.

Setup and deployment is done using Ansible, to a Debian 8 x64 droplet on DigitalOcean.

## Requirements

Node v8.x

Starting this project on your own computer won't work, as the database, environment file and
image assets are not committed to this repo.
