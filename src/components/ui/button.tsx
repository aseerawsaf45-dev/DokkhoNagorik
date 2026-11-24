import * as React from "react";
import { cn } from "./badge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "success" | "brand";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-slate-900 text-white hover:bg-slate-800 shadow-xs",
      brand: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      outline: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300 shadow-2xs",
      ghost: "hover:bg-slate-100 text-slate-700 hover:text-slate-900",
      link: "text-indigo-600 underline-offset-4 hover:underline",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs",
    }[variant];

    const sizeStyles = {
      default: "h-9 px-4 py-2 text-xs",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-11 rounded-lg px-6 text-sm",
      icon: "h-9 w-9",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.99]",
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
