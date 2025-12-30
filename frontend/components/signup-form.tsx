"use client";

import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Url } from "@/lib/url";


const signupSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain 1 uppercase letter")
      .regex(/[0-9]/, "Password must contain 1 number"),
    confirmPassword: z.string(),
    role: z.enum(["USER", "ADMIN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;


export function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", 
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await axios.post(`${Url}/api/auth/register`, {  
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      toast.success("Registration successful!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };     

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your details to register
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>

      
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input placeholder="Sanuj Kumar" {...register("name")} />
              {errors.name && (
                <FieldDescription className="text-red-500">
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>

           
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="you@example.com" {...register("email")} />
              {errors.email && (
                <FieldDescription className="text-red-500">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

      
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" {...register("password")} />
              <FieldDescription>
                Must be 6+ chars, 1 uppercase, 1 number
              </FieldDescription>
              {errors.password && (
                <FieldDescription className="text-red-500">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <FieldDescription className="text-red-500">
                  {errors.confirmPassword.message}
                </FieldDescription>
              )}
            </Field>

         
            <Field>
              <FieldLabel>Role</FieldLabel>
              <Select onValueChange={(v) => setValue("role", v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <FieldDescription className="text-red-500">
                  Role is required
                </FieldDescription>
              )}
            </Field>

           
            <Field className="flex flex-col gap-2 items-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </Button>

              <FieldDescription>
                Already have an account?{" "}
                <a href="/login" className="underline">
                  Login
                </a>
              </FieldDescription>
            </Field>

          </FieldGroup>
        </form>  
      </CardContent>
    </Card>
  );
}
