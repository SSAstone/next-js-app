"use client";
import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const AddToCartBtn = ({ id }) => {
    const { cart, isLoading, mutate } = useCart();
    // let cart = [],
        // isLoading;

    const isAlready = cart.findIndex((pd) => pd._id === id);

    const handleAddToCart = async (id) => {
        try {
            const res = await fetch(`/api/cart?id=${id}`, {
                method: "POST",
            });
            const result = await res.json();
            if (result.added) {
                toast.success(result.message);
                mutate();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <button onClick={() => handleAddToCart(id)} className="btn btn-primary mt-4" disabled={isAlready !== -1 || isLoading}>
            <MdOutlineAddShoppingCart></MdOutlineAddShoppingCart>
            {isAlready !== -1 ? 
                "Already in cart": 
                "Add to cart"
            }
        </button>
    );
};

export default AddToCartBtn;