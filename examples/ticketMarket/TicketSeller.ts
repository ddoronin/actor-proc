import { Actor, ISender, IMessage } from '../../src/Actor';
import { ActorSystem } from '../../src/ActorSystem';
import { Ticket } from './Ticket';

export class TicketSeller extends Actor {
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