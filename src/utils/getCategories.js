import 'server-only';
import { cache } from 'react'
import { getCategoriesFromDB } from '@/services/category.service';


const getCategories = cache(() => {
    return getCategoriesFromDB();
});

export default getCategories;