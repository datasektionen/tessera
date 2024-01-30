# Tessera

Tessera is a comprehensive event management platform designed to streamline the process of creating, managing, and attending events. It provides functionalities for creating and managing organizations, events, and ticket types. Users can request tickets for events, view details about events and organizations, and manage their own events. The platform is built with a focus on user experience, ensuring that all features are easy to use and accessible. Whether you're an event organizer or an attendee, Tessera makes the process of managing and attending events seamless and enjoyable.

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node -v
    v21.2.0

    $ npm -v
    10.2.3

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone git@github.com:DowLucas/tessera.git
    $ cd tessera
    $ npm install

### Configure app

Copy `.env.example` to `.env` then edit it with it by inserting the google maps api key and stripe key.

```
REACT_APP_ENV=development
REACT_APP_BASE_URL=http://localhost:5000
REACT_APP_BACKEND_URL=http://localhost:8080
REACT_APP_GOOGLE_MAPS_API=<INSERT KEY HERE>
REACT_APP_STRIPE_KEY=<INSERT KEY HERE>
```

## Translations

Currently, tessera supports english and swedish translations. You will find the translation text files under the `translations` folder. When adding content to the website, use the files to write text for the supported languages. Ensure that `npm run test` for translation consistency passes before pushing.

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

## Using Docker

You can use docker in order to run the application aswell. For development, use

    $ docker-compose up --build

## Languages & tools

- [TypeScript](https://www.typescriptlang.org/) is used as the primary development language, offering static typing and advanced JavaScript features.
- [Redux](https://redux.js.org/) for state management in React applications, ensuring predictable state updates.
- [React](http://facebook.github.io/react) is used for building user interfaces, particularly single-page applications.
