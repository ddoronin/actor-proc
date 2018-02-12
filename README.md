[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ddoronin/actor-proc/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/actor-proc)

# actor-proc
Actor pattern implementation in JavaScript

## Motivation
JavaScript is based upon a single event loop which handles one event at a time that means that CPU heavy tasks will block other tasks from being executed. In case of a browser environment, the browser will not response to user events.

**actor-proc** offers an easy way to offload business access layer tasks from the main event loop onto dedicated *workers*, which run independently in parallel in dedicated threads in a browser environment, [Web Workers](http://www.html5rocks.com/en/tutorials/workers/basics/)

## Getting Started

Install via yarn:
```console
yarn add actor-proc
```

Install via npm:
```console
npm i --save actor-proc
```

## API

The API of actor-proc consists of two parts: a function `registerActor(actor: Actor)` to add actors in the Actor System, and `spawnActorSystem(url: string): ActorSystemProcess` to spawn the Actor System with actors inside of a dedicated worker (the url refers to the actor system javascript bundle).

## Examples

Examples are available in the examples directory:
[https://github.com/ddoronin/actor-system/tree/master/examples](https://github.com/ddoronin/actor-system/tree/master/examples)
