# JB CLI

Scaffolding for building a CLI

## Installation

```sh
npm ci
```

## Usage

```sh
# To run TS files directly (convenient during development)
npm start
# To run transpiled JS (a little snappier startup)
npm run build && npm run start:js
```

### Logging

This scaffold is set up to make logging a primary concern of the application in
two ways:

1. Keep the CLI logging tight and focused
2. Write _everything_ that happens to a log file for after-the-fact
   troubleshooting

To that end, _all_ logs are written to the file at `~/Desktop/CLI Logs/cli.log`,
but by default `trace` and `debug` are not shown in console output.

To adjust console log level, set `CONSOLE_LOG_LEVEL`, e.g.

```sh
CONSOLE_LOG_LEVEL=trace npm start
```

Similarly, if you want less information in the log file:

```sh
FILE_LOG_LEVEL=debug npm start
```

These env vars can be renamed in the `EnvVar` enum in `./src/common/constants.ts`

The log file is cleaned at startup of the CLI, so will reflect all of the
information relevant to the most recent run of the application.

Logs written from classes extending `ClassWithLogger` will be prepended with
their class names to make it easier to see where things are happening, e.g.:

```sh
[09:00:40.499] INFO: [CLI] Hello from user interface land
[09:00:40.499] INFO: [App] Hello from businesss logic land
```

Using `console` is mostly discouraged, except in the "frontend" where a `console.table`
can come in handy for presenting data to the user.

## Development

Separation of concerns is a forethought in this project, so that you can create
more than one user interface using the same business logic code. It's a CLI now,
but maybe you want to build a web server and/or web page later. This may require
slight modification to the `Logger` and maybe `ClassWithLogger` classes to allow
instantiation based on use case.

- Business logic should live in `./src/app/`. This is the meat n' taters of your
  application - the stuff that makes it unique in the problem(s) it solves.
- Anything that can be shared between the "frontend" and "backend" goes in
  `./src/common/`, for example the `Logger` class.
- Data storage and retrieval goes in `./src/data/`. By having the application interact
  with the data layer using a defined contract, you keep this concern decoupled from
  the business logic. In this example repo, you can choose between an `InMemoryDataStore`
  or `FileDataStore`. This keeps your options open later when you may want to move
  from a memory or file based storage system to a database, cloud storage, or something
  like that.
- User interface things belong in `./src/user_interface/`

### Unit Testing

Tests all go in `./tests`

```sh
npm test
# or
npm run test:watch
# or
npm run coverage
```

### Formatting and Linting

```sh
npm run format
# and
npm run lint
```
