export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    },
    chip: {
      variants: {
        color: {
          success: 'bg-[var(--color-green-500)]',
        },
      },
    },
    kbd: {
      variants: {
        size: {
          'xl': 'h-10 min-w-[40px] text-[20px]'
        }
      }
    },
    toast: {
      variants: {
        color: {
          error: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-red-500)]',
            icon: 'text-[var(--color-red-500)]',
            progress: 'bg-[var(--color-red-500)]',
          },
        }
      }

    },

    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    }
  }
})
