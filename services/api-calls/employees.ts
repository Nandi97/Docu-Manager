import { Employee } from '@/types';
import axios from 'axios';

interface FetchEmployeesResponse {
    employees: Employee[];
    pageCount: number;
    totalEmployees: number;
}

export const fetchAllEmployees = async (
    page: number = 1,
    limit: number = 10,
    search: string = ''
): Promise<FetchEmployeesResponse> => {
    const response = await axios.get(`/api/employees/get`, {
        params: {
            page,
            limit,
            search
        }
    });
    return response.data;
};
