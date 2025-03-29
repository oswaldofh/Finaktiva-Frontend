export default interface Filter {
    pageIndex: number;
    pageSize: number;
    eventTypeId: number | null;
    startDate: string | Date | null; 
    endDate: string | Date | null; 
}