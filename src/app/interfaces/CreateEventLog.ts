export default interface CreateEventLog {
    description: string;
    eventTypeId: number;
    date: string | Date; 
}