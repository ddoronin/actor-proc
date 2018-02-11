export interface IMessage {
    type: string
    data: any
}

export interface ISender {
    reply(actorRef: Symbol, data: any): void

    forward(actorRef: Symbol, message: IMessage): void
}

export abstract class Actor {
    constructor(public readonly ref:Symbol){
    }
    public abstract receive(message:IMessage, sender:ISender):void
}