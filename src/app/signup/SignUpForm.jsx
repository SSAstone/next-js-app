"use client";
import useAuth from '@/hooks/useAuth';
import createJWT from '@/utils/createJWT';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    const { createUser, profileUpdate, googleLogin } = useAuth();
    const search = useSearchParams();
    const from = search.get('redirectUrl' || '/');
    const { replace } = useRouter();

    const uploadImage = async (e) => {
        const formData = new FormData();
        if (!e.target.files[0]) return;
        formData.append('image', e.target.files[0]);
        const toastId = toast.loading("Uploading...");
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Failed to upload image');
            const data = await res.json();
            toast.dismiss(toastId);
            toast.success("Image uploaded successfully");
            setValue('image', data.url);
        } catch (error) {
            toast.dismiss("Image upload failed");
            toast.error(toastId);
        }
    }

    const onSubmit = async (data) => {
        const { name, email, password, image } = data;
        const toastId = toast.loading("Signing in...");
        try {
            const user = await createUser(email, password);
            await createJWT({ email });
            await profileUpdate({
                displayName: name,
                photoURL: image
            })
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
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
                <label htmlFor="name" className="label label-text">
                    Name
                </label>
                <input
                    type="text"
                    placeholder="name"
                    id="name"
                    name="name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                />
                {errors.name && (
                    <span className="text-red-500 text-base mt-1">
                        Please enter your name.
                    </span>
                )}
            </div>
            <div className="form-control">
                <label htmlFor="email" className="label label-text">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    name="email"
                    className="input input-bordered"
                    autoComplete="email"
                    {...register("email", {
                        required: true,
                        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                    })}
                />
                {errors.email && (
                    <span className="text-red-500 text-base mt-1">
                        Please enter a valid email address.
                    </span>
                )}
            </div>
            <div className="form-control">
                <label htmlFor="password" className="label label-text">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                    className="input input-bordered"
                    autoComplete="new-password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && (
                    <span className="text-red-500 text-base mt-1">
                        Please enter a password.
                    </span>
                )}
            </div>
            <div className="form-control">
                <label htmlFor="confirmPassword" className="label label-text">
                    Confirm Password
                </label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="input input-bordered"
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
                        validate: (value) =>
                            value === getValues("password") || "The passwords do not match.",
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 text-base mt-1">
                        {errors.confirmPassword.message || "Please confirm your password."}
                    </span>
                )}
            </div>
            <div className="form-control">
                <label htmlFor="photo" className="label label-text">
                    Photo
                </label>
                <input
                    type="file"
                    id="photo"
                    onChange={uploadImage}
                    className="file-input file-input-bordered file-input-primary w-full"
                />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                    Sign Up
                </button>
            </div>
            <p className="mt-3">
                Already have an account?{" "}
                <Link className="text-blue-500 underline ml-1" href="/login">
                    Login
                </Link>
            </p>
            <div className="divider mt-5">OR</div>
            <button onClick={handleGoogleLogin} className="btn btn-outline w-full">Sign in with Google</button>
            {/* <GoogleLogin from={from} /> */}
        </form>
    );
};

export default SignUpForm;