import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
    }, // override dark theme colors
  }
});