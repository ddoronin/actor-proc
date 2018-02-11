import {expect, assert} from 'chai';
import {spy, SinonSpy} from 'sinon'
import {Actor, ISender, IMessage} from './Actor';
import {ActorSystem} from './ActorSystem';
import {WorkerMan, IWorker, EventListener} from './WorkerMan';

class TestWorker implements IWorker{
    postMessage(message: any, transfer?: any[]): void{};
    terminate(): void{};
    addEventListener(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void{};
    removeEventListener(type: string, listener: EventListener, options?: boolean | EventListenerOptions): void{};
}

describe('WorkerMan', () => {
    let workerMan: WorkerMan;
    let self: IWorker;

    beforeEach(() => {
        self = new TestWorker();
        workerMan = new WorkerMan(self);
    });

    it('should listen for incoming messages', () => {

    });

    it('should produce outgoing messages', () => {

    });
});