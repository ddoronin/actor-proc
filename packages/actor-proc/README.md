[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ddoronin/actor-proc/blob/master/packages/actor-proc/LICENSE) [![npm](https://img.shields.io/npm/v/actor-proc.svg)](https://www.npmjs.com/package/actor-proc)

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

1. Let's register actors in `actors-system.js`:

```javascript
import { registerActor } from 'actor-proc';
import { TicketSeller } from './TicketSeller';
import { BoxOffice } from './BoxOffice';

const TICKET_SELLER = Symbol('TicketSeller');
const BOX_OFFICE = Symbol('BoxOffice');

registerActor(new TicketSeller(TICKET_SELLER));
registerActor(new BoxOffice(BOX_OFFICE, TICKET_SELLER));
```

This code will be run inside of a dedicated worker that should refer to `actors-system.js`.

2. Let's run a dedicated worker:

```javascript
import { spawnActorSystem } from 'actor-proc';

const actorSystem = spawnActorSystem('./actor-system.js');
```

Now the code is running in a web worker. The main app can communicate with actors by sending messages and listening for replies.

3. Let's subscribe on messages and log them in console:

```javascript
actorSystem.listen(({ref, data}) => {
    console.log('Received from actor', ref, data);
});
```

where `ref` is a name of actor that replies with given data.

4. Now let's send a message to the actor system. This message will be broadcasted and handled by one or more actors.

```javascript
actorSystem.send({
    type: 'find-and-buy',
    data: {}
})
```
This message will be handled by the `BoxOffice` actor that will ask a `TicketSeller` actor to buy some tickets. The `TicketSeller` actor should reply to the initial sender, so it will be printed in console (see step #3).

## Examples

Examples are available in the examples directory:
[https://github.com/ddoronin/actor-system/tree/master/examples](https://github.com/ddoronin/actor-system/tree/master/examples)
