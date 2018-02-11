import {expect, assert} from 'chai';
import {spy, SinonSpy} from 'sinon'
import {Actor, ISender, IMessage} from './Actor';
import {ActorSystem} from './ActorSystem';

class SimpleActor extends Actor {
    receive(message: IMessage, sender: ISender): void{
        switch (message.type) {
            case 'echo': 
                sender.reply(this.ref, message.data);
                break;
            default:
                break;
        }
    }
}

class AliceActor extends Actor{
    constructor(ref:Symbol, private bobRef: Symbol){
        super(ref);
    }

    receive(message: IMessage, sender: ISender): void{
        switch (message.type) {
            case 'echo': 
                sender.reply(this.ref, message.data);
                break;

            case 'bob':
                sender.forward(this.bobRef, {
                    type: 'echo',
                    data: 'hey!'
                });
                break;

            default:
                break;
        }
    }
}

describe('ActorSystem', () => {
    let actorSystem: ActorSystem;
    let worker: ISender;

    const ALICE = Symbol('Alice');
    const BOB = Symbol('Bob');

    beforeEach(() => {
        worker = {
            reply(actorRef, data):void {},
            forward(actorRef, data):void {}
        };
        actorSystem = new ActorSystem(worker);
        actorSystem.register(new AliceActor(ALICE, BOB));
        actorSystem.register(new SimpleActor(BOB));
    });

    it('should be able to broadcast a message to all available actors', () => {
        const workerReceives = spy(worker, 'reply');
        actorSystem.send({
            type: 'echo',
            data: 'Hello, World!'
        });
        assert(workerReceives.calledWith(ALICE, 'Hello, World!'));
        assert(workerReceives.calledWith(BOB, 'Hello, World!'));
    });

    it('should be able to send a message to a specific actor', () => {
        const workerReceives = spy(worker, 'reply');
        actorSystem.sendTo(ALICE, {
            type: 'echo',
            data: 'Hello, Alice!'
        });
        assert(workerReceives.calledWith(ALICE, 'Hello, Alice!'));
    });

    it('should be able to send a message from one actor to another', () => {
        const workerReceives = spy(worker, 'reply');
        actorSystem.sendTo(ALICE, {
            type: 'bob',
            data: 'Hello, this is Alice!'
        });
        assert(workerReceives.calledWith(BOB, 'hey!'));
    });
});