export default interface EventLog {
    id: number;
    description: string;
    eventType: string;
    eventTypeId: number;
    date: string | Date; 
}