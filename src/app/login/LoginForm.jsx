"use client";

import useAuth from '@/hooks/useAuth';
import createJWT from '@/utils/createJWT';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signIn, googleLogin } = useAuth();
    const search = useSearchParams();
    const from = search.get('redirectUrl' || '/');
    const { replace } = useRouter();

    const onSubmit = async (data) => {
        console.log(data);
        const { email, password } = data;
        const toastId = toast.loading("Signing in...");
        try {
            const user = await signIn(email, password);
            await createJWT({ email });
            // await signIn(email, password);
            toast.dismiss(toastId);
            toast.success("User signed in successfully");
            replace(from);
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    }
    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Signing in...");
        try {
            const { user } = await googleLogin();
            await createJWT({ email: user.email });
            toast.dismiss(toastId);
            toast.success("User signed in successfully");
            replace(from);
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email"
                    autoComplete='email' {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, })} placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" autoComplete='new-password' {...register('password', { required: true, minLength: 6 })} placeholder="password" className="input input-bordered" />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                    Login
                </button>
            </div>
            <p className="mt-3">
                Don not have an account?
                <Link className="text-blue-500 underline ml-1" href="/signup">
                    Signup
                </Link>
            </p>
            <div className="divider mt-5">OR</div>
            <button onClick={handleGoogleLogin} className="btn btn-outline w-full">Sign in with Google</button>
            {/* <GoogleLogin from={from} /> */}
        </form>
    );
};

export default LoginForm;