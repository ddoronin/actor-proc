import {Actor, ISender, IMessage} from './Actor';
import {ActorSystem} from './ActorSystem';

export interface EventListener {
    (evt: {data: any}): void;
}

export interface IWorker {
    postMessage(message: any, transfer?: any[]): void;
    terminate(): void;
    addEventListener(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListener, options?: boolean | EventListenerOptions): void;
}

export class WorkerMan extends ActorSystem {
    constructor(self: IWorker){
        super({
            reply(actorRef, data):void {
                self.postMessage({ref: actorRef.toString(), data});
            },
            forward(actorRef, data):void {
                console.debug('forward message');
            }
        });

        self.addEventListener('message', ({data}) => {
            this.send(data as IMessage);
        });
    }
}