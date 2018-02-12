import { registerActor } from '../../src/index';
import { TicketSeller } from './TicketSeller';
import { BoxOffice } from './BoxOffice';

const TICKET_SELLER = Symbol('TicketSeller');
const BOX_OFFICE = Symbol('BoxOffice');

registerActor(new TicketSeller(TICKET_SELLER));
registerActor(new BoxOffice(BOX_OFFICE, TICKET_SELLER));
