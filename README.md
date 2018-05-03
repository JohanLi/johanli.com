## About

Personal website. Isomorphic React application, featuring the following:

* Express backend, fetching blog entries from MySQL.
* Hot reloading, as well as reloading of Express backend during development.
* Unit tests using Jest, and API and end to end tests using Cypress.
* Ansible playbooks for setting up a droplet on DigitalOcean, and deployment.
* Prism.js to highlight code snippets. Full-screen zoom feature on certain blog images.
* HSTS preloading.

Performance enhancements:

* Responsive images without reflow.
* CSS is inlined on first visit.
* Non-blocking web font, through rendering via system font first.
* Imagemin.
* HTTP/2.

## To-Do

Larger considerations:

- [ ] Improve Chrome DevTools audit scores, in particular through introducing Service Workers.
- [ ] Improve CI pipeline. Setup sandbox, and run Jest and Cypress before deploying to production. Use systemd instead of forever, and ensure npm install does not pull in devDependencies.
- [ ] Add pre-commit hook, to block committing unless linting and tests pass. Fix some outstanding ESLint warnings.
- [ ] Attempt to reduce boilerplate code, as a result of server-side rendering logic.
- [ ] Use Liquibase, and ensure project can be installed and run without having to set up the database manually.
