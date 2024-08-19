import { NavItem } from '@/types';
import axios from 'axios';

// Fetch All Menus
export const fetchAllNavItems = async (): Promise<NavItem[]> => {
    const response = await axios.get('/api/nav-items/get');
    return response.data;
};
