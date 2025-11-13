import type { TTicket } from "@/features/booking/domain/entity/ticket.entity";
import Ticket from "@/features/tickets/presentation/components/Ticket/Ticket";

type Props = { tickets: TTicket[] };

const Tickets = (props: Props) => {
  if (props.tickets.length === 0)
    return (
      <p className="text-muted-foreground text-center text-sm">Tickets empty</p>
    );
  return (
    <div className="space-y-4">
      {props.tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default Tickets;
