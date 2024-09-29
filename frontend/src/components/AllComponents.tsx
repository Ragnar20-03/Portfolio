import React, { ButtonHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'react'

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <button 
    className={`px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
)

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ 
  className = '', 
  ...props 
}) => (
  <input 
    className={`w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    {...props}
  />
)

export const Label: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <label 
    className={`block text-sm font-medium text-foreground ${className}`}
    {...props}
  >
    {children}
  </label>
)

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-card text-card-foreground rounded-lg border border-border shadow-sm ${className}`}>
    {children}
  </div>
)

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
)

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
)

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
)