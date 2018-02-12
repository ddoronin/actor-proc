import { Actor, ISender, IMessage } from '../../src/Actor';
import { ActorSystem } from '../../src/ActorSystem';
import { Ticket } from './Ticket';

export class BoxOffice extends Actor{
    constructor(ref:Symbol, private ticketSellerRef: Symbol){
        super(ref);
    }

    receive(message: IMessage, sender: ISender): void{
        switch (message.type) {
            case 'find-and-buy':
                const tickets = [
                    {id: 1, price: 1.1},
                    {id: 2, price: 2.2},
                    {id: 3, price: 3.3},
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