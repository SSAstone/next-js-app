import 'server-only';
import { cache } from 'react'
import { getProductsFromDB } from '@/services/product.service';


const getProducts = cache(getProductsFromDB);

export default getProducts;