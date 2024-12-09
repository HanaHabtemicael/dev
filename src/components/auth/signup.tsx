"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf } from "lucide-react";
import Link from "next/link";

export function SignInForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center text-emerald-600 mb-2">
          <Leaf className="w-8 h-8" />
          <span className="ml-2 text-xl font-semibold">LERSHA</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600">Please sign up to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-700" htmlFor="username">
            Username
          </label>
          <Input
            id="username"
            placeholder="GAS"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-700" htmlFor="email">
            Email or Username
          </label>
          <Input
            id="email"
            type="email"
            placeholder="gas@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-700" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to{" "}
            <Link href="/privacy" className="text-emerald-600 hover:underline">
              privacy policy
            </Link>{" "}
            &{" "}
            <Link href="/terms" className="text-emerald-600 hover:underline">
              terms
            </Link>
          </label>
        </div>

        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-emerald-600 hover:underline font-medium"
          >
            Sign in instead
          </Link>
        </p>
      </form>
    </div>
  );
}