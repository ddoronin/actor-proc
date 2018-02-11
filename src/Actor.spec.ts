import {expect, assert} from 'chai';
import {spy, SinonSpy} from 'sinon'
import {Actor, ISender, IMessage} from './Actor';

class SimpleActor extends Actor {
    constructor() {
        super(Symbol('Simple'));
    }
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

describe('Actor', () => {
    let actor: Actor;
    let sender: ISender;

    beforeEach(() => {
        sender = {
            reply(actorRef, data):void {},
            forward(actorRef, data):void {}
        }
        actor = new SimpleActor();
    });

    it('should be able to receive a message and reply to a sender', () => {
        const sernderReply = spy(sender, 'reply');
        actor.receive({
            type: 'echo',
            data: 'Hello, World!'
        }, sender);
        assert(sernderReply.calledWith(actor.ref, 'Hello, World!'));
    });
});