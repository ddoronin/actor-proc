import {Actor, ISender, IMessage} from './Actor';

export class ActorSystem implements ISender {
    constructor(
        private readonly sender: ISender,
        private readonly actors?: Map<Symbol, Actor>) {
        if(!actors){
            this.actors = new Map();
        }
    }

    register(actor: Actor): void {
        this.actors.set(actor.ref, actor);
    }

    remove(actorRef: Symbol): boolean {
        return this.actors.delete(actorRef);
    }

    send(message: IMessage) {
        for(let [_, actor] of this.actors) {
            actor.receive(message, this);
        }
    }

    sendTo(actorRef: Symbol, message: IMessage) {
        if(!this.actors.has(actorRef)) {
            console.log('Actor not founf', actorRef.toString());
            return;
        }
        this.actors.get(actorRef).receive(message, this);
    }

    // ISender
    forward(actorRef: Symbol, message: IMessage): void{
        console.log('Actor forwards message to', actorRef.toString());
        this.sendTo(actorRef, message);
    }

    reply(actorRef: Symbol, data: any): void {
        console.log('Actor replies', actorRef.toString(), JSON.stringify(data));
        this.sender.reply(actorRef, data);
    }
}