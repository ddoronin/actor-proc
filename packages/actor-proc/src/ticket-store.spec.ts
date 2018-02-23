import {expect, assert} from 'chai';
import {spy} from 'sinon'
import {Actor, ISender, IMessage} from './Actor';
import {ActorSystem} from './ActorSystem';

class Ticket{
    constructor(public id: number, public price: number){}
}

class TicketSeller extends Actor {
    receive(message: IMessage, sender: ISender): void{
        switch (message.type) {
            case 'buy': 
                const tickets = message.data as Array<Ticket>;
                if(!tickets){
                    console.error(tickets);
                    throw new Error('Tickets are invalid.');
                }
                sender.reply(this.ref, {
                    tickets,
                    amount: tickets.reduce((total, {price})=> total + price, 0)
                });
                break;
            default:
                break;
        }
    }
}

class BoxOffice extends Actor{
    constructor(ref:Symbol, private ticketSellerRef: Symbol){
        super(ref);
    }

    receive(message: IMessage, sender: ISender): void{
        switch (message.type) {
            case 'find-and-buy':
                const tickets = [
                    new Ticket(1, 1.1),
                    new Ticket(2, 2.2),
                    new Ticket(3, 3.3)
                ];
                sender.forward(this.ticketSellerRef, {
                    type: 'buy',
                    data: tickets
                });
                break;

            default:
                break;
        }
    }
}


describe('ticket-store', () => {
    let actorSystem: ActorSystem;
    let worker: ISender;

    const TICKET_SELLER = Symbol('TicketSeller');
    const BOX_OFFICE = Symbol('BoxOffice');

    beforeEach(() => {
        worker = {
            reply(actorRef, data):void {},
            forward(actorRef, data):void {}
        };
        actorSystem = new ActorSystem(worker);
        actorSystem.register(new TicketSeller(TICKET_SELLER));
        actorSystem.register(new BoxOffice(BOX_OFFICE, TICKET_SELLER));
    });

    it('should buy tickets', () => {
        const workerReceives = spy(worker, 'reply');
        actorSystem.send({type: 'find-and-buy', data: {}});
        assert(workerReceives.calledWith(TICKET_SELLER, {
            tickets: [
                {id: 1, price: 1.1}, 
                {id: 2, price: 2.2},
                {id: 3, price: 3.3}
            ],
            amount: 6.6
        }));
    });
});