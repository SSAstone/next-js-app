"use client";

import useTheme from "@/hooks/useTheme";
import NavLink from "./NavLink";
import { BiMenu } from 'react-icons/bi';
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import useCart from "@/hooks/useCart";
import Link from "next/link";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { uid, displayName, photoURL } = user || {}

    const { theme, toggleTheme } = useTheme();
    const { replace } = useRouter();
    const path = usePathname();
    const { cart } = useCart();
    const total = useMemo(
        () => cart.reduce((pre, cur) => cur.price * cur.quantity + pre, 0),
        [cart]
    );

    const handleLogout = async () => {
        try {
            await logout();
            const res = await fetch("/api/auth/logout", {
                method: "POST",

            });
            const data = await res.json();
            toast.success('Successfully logged out!');
            if (path.includes('/dashboard') || path.includes('/profile')) {
                replace('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className=" bg-slate-200">
            <div className="navbar w-11/12 mx-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Shop app</a>
                </div>
                <div className="flex-none">
                    <div className="hidden lg:block">
                        <NavLink exact={true} activeClass="text-blue-900" className='mr-5' href={'/'}>Home</NavLink>
                        <NavLink activeClass="text-blue-900" href={'/about'} className='mr-5'>About</NavLink>
                        <NavLink activeClass="text-blue-900" href={'/products'} className='mr-5'>Products</NavLink>
                        <NavLink activeClass="text-blue-900" href={'/login'} className='mr-5'>Login</NavLink>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart.length}</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{cart.length}</span>
                                <span className="text-info">Subtotal: ${total}</span>
                                <Link href="/checkout" className="block w-full">
                                    <button className="btn-primary btn-block btn">
                                        View cart
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {uid &&
                        <div className="dropdown dropdown-end hidden lg:block">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {/* <Image src={photoURL} alt="#" width={40} height={40} className="h-10 w-10 rounded-full"></Image> */}
                                    <Image
                                        alt="user-logo"
                                        title={displayName}
                                        src={
                                            photoURL ||
                                            "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                                        }
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-full"
                                    />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-30">
                                <li>
                                    <a className="justify-between">
                                        {displayName}
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    }
                    <div className="hidden lg:block">
                        <label className="swap swap-rotate">

                            <input onChange={toggleTheme} checked={theme === "dark"} type="checkbox" />

                            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                    </div>
                </div>
                <div className="lg:hidden z-50">
                    <div className="drawer drawer-end">

                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-4">
                                <BiMenu className="text-2xl"></BiMenu>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-3/5 h-screen bg-base-100 text-base-content">
                                <NavLink exact={true} activeClass="text-blue-900" className='mr-5 mb-8' href={'/'}>Home</NavLink>
                                <NavLink activeClass="text-blue-900" href={'/about'} className='mr-5'>About</NavLink>
                                <NavLink activeClass="text-blue-900" href={'/login'} className='mr-5'>Login</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;