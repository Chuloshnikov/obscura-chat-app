import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

import { Link } from "react-router-dom";
import { authFormSchema } from "../lib/validation";
import { toast } from "sonner";
import FormField from "./FormField";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FormType } from "@/types";
import { Loader2 } from "lucide-react";




const AuthForm = ({ type }: {type: FormType}) => {
    const navigate = useNavigate();
  const formSchema = authFormSchema(type);

  const { authUser, logIn, signUp, isLoggingIn, isSigningUp, isCheckingAuth } = useAuthStore();
    console.log(authUser);

    useEffect(() => {
    if (authUser) {
        navigate('/');
    }
  }, [authUser, navigate]);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    },
  })
 

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        await signUp(values);
        if (authUser) {
          toast.success("Account created successfully!");
          navigate('/sign-in');
        }
      } else {
        await logIn(values);
        if (authUser) {
            toast.success("Signed in successfully!");
            navigate('/');
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`There was an error: ${error.message || error}`);
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="z-50 card-border lg:min-w-[400px] p-5 mdl:p-10">
      <div className="flex flex-col gap-6 card">
      <div className="flex flex-col gap-2 justify-center text-center">
          <h2 className="text-6xl font-bold bg-gradient-to-b from-gray-200 to-gray-700 text-transparent bg-clip-text drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
            Obscura
          </h2>
          <h3 className="text-transparent bg-gradient-to-b from-gray-200 to-gray-700 text-transparent bg-clip-text drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] font-bold text-sm">
            Maybe this time you&apos;ll be able to receive a message even from a parallel reality.
          </h3>
      </div>
      </div>  
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 mt-4">
               {!isSignIn && (
                <FormField 
                control={form.control} 
                name="fullName" 
                label="Name"
                placeholder="Your Name" 
                />
               )}
                <FormField 
                control={form.control} 
                name="email" 
                label="Email"
                placeholder="Your email address"
                type="email" 
                />
               <FormField 
                control={form.control} 
                name="password" 
                label="Password"
                placeholder="Enter your password"
                type="password" 
                />
                <Button className="btn my-4" type="submit">
                  {isSignIn ? 'Sign in' : 'Create Account'}
                </Button>
            </form>
        </Form>
        <p className="text-center text-gray-400 text-sm">
        {isLoggingIn || isSigningUp || isCheckingAuth ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                {isSignIn ? "No account yet?" : "Have an account already?"}
                </>
              )}
          <Link 
          className="font-bold text-gray-500 ml-1"
          to={!isSignIn ? '/sign-in' : '/sign-up'}
          >
            {!isSignIn ? "Sign in" : "Sign up"}
          </Link>
        </p>
    </div>
  )
}

export default AuthForm;