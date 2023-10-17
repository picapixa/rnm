import { createTheme } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { HTMLAttributes, forwardRef } from "react";

const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & LinkProps
>((props, ref) => <NextLink ref={ref} {...props} />);
Link.displayName = "Link";

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },
  },
});
