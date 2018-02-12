import { WorkerMan, IWorker } from './WorkerMan';
import { ActorSystem } from './ActorSystem';
import { Actor, IMessage } from './Actor';
import { ActorSystemProcess } from './ActorSystemProcess';

let actorSystem: ActorSystem;

// works only in browsers
const selfish = self || this;

const createActorSystem = (): ActorSystem => {
    const context = selfish as IWorker
    return new WorkerMan(context);
}

const getActorSystem = (): ActorSystem => {
    if(!actorSystem) {
        actorSystem = createActorSystem();
    }
    return actorSystem;
}

export const registerActor = (actor: Actor) => 
    getActorSystem().register(actor);

export const spawnActorSystem = (url: string): ActorSystemProcess => {
    return new ActorSystemProcess(url);
};
