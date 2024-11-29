export const HOST = import.meta.env.VITE_SERVER_URL;
export const API =  'api/v1';
export const INITIALIZATION_ROUTE = `${API}/transactions/initialize`;
export const GET_TRANSACTIONS = (month,search='',page=1,perPage=10)=>`${API}/transactions/list?month=${month}&page=${page}&search=${search}  `;
export const GET_COMBINED_ROUTE = (month,search='',page=1,perPage=10)=>`${API}/combined/get-data?month=${month}`;

