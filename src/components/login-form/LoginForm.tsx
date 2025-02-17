'use client';

import {useForm} from "react-hook-form";
import './LoginForm.css';
import {FC, useActionState} from "react";
import {LoginDataType} from "@/models/LoginDataType";
import {LoginSchema} from "@/validation/LoginSchema";
import {joiResolver} from "@hookform/resolvers/joi";
import {loginUser} from "@/server-actions/serverActions";

const LoginForm: FC = () => {
    const {register, formState: {errors, isValid}} = useForm<LoginDataType>({
        mode: 'all', resolver: joiResolver(LoginSchema)
    });

    const initialState = {
        errors: ''
    };

    const [formState, formAction] = useActionState(loginUser, initialState);


    return (
        <div className='search-container'>
            <form action={formAction} className='search-form'>
                <legend className='text-2xl'>Login to your account</legend>
                <label htmlFor='username'>Enter your username</label>
                <input id='username' type='text'
                       autoComplete={'on'} placeholder='Username' required {...register('username')} />
                <div>{errors.username && errors.username.message}</div>
                <label htmlFor='password'>Enter your password</label>
                <input id='password' type='password' autoComplete='on'
                       required {...register('password')} />
                <div>{errors.password && errors.password.message}</div>
                <button className={isValid ? 'btn' : 'btn cursor-not-allowed'} type="submit">Login
                </button>
                <p className='text-red-500'>{formState.errors}</p>
            </form>
        </div>
    );
};

export default LoginForm;