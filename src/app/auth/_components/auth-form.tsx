'use client'

import { useForm } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

import { signIn } from "next-auth/react"

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      // console.log(data) 
      await signIn('email', { email: data.email, redirect: false })

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      })
    }
  })

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email below to receive a magic link to sign in.</p>
        </div>
        <form onSubmit={ handleSubmit } className="space-y-4">
          <div>
            <Label className="sr-only" htmlFor="email">
              Email address
            </Label>
            <Input id="email" placeholder="name@example.com" required type="email" { ...form.register('email') } />
          </div>
          <Button className="w-full" type="submit">
            Send magic link
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <span>Dont have an account?</span>
          <Link className="font-medium underline" href="#">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
