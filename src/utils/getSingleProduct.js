import 'server-only';
import { cache } from 'react'
import { getProductByIdFromDB } from '@/services/product.service';


const getSingleProduct = cache(getProductByIdFromDB);

export default getSingleProduct;