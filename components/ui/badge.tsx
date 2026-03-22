import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[#2e7d32] text-white [a&]:hover:bg-[#27692b]',

        secondary:
          'border-transparent bg-[#1b1b1b] text-gray-200 [a&]:hover:bg-[#2a2a2a]',

        success: 
      'border-transparent bg-[#1b5e20] text-white [a&]:hover:bg-[#164d1a]',

        warning:
          'border-transparent bg-[#8a6d1a] text-white [a&]:hover:bg-[#735a15]',

        error:
          'border-transparent bg-[#7f1d1d] text-white [a&]:hover:bg-[#661717]',

        destructive:
          'border-transparent bg-[#5a0f0f] text-white [a&]:hover:bg-[#4a0c0c] focus-visible:ring-[#7f1d1d]/30',

        outline:
          'border border-[#2e7d32] text-[#66bb6a] [a&]:hover:bg-[#1b2b1d] [a&]:hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
