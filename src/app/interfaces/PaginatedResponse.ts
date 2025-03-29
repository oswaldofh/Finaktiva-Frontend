export default interface PaginatedResponse<T> {
  count: number;  
  pageIndex: number; 
  pageSize: number; 
  data: T[]; 
  pageCount: number;
}