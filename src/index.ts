import { WorkerMan, IWorker } from './WorkerMan';
import { ActorSystem } from './ActorSystem';

export const createActorSystem = (): ActorSystem => {
    const browserWorker = (self||this) as IWorker
    return new WorkerMan(browserWorker);
};
