import { Grid } from "@mui/material";
import React from "react";
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from "react-infinite-scroll-component";

type InfiniteCharacterListProps = InfiniteScrollProps;

const InfiniteCharacterList = React.forwardRef<
  InfiniteScroll,
  InfiniteCharacterListProps
>(({ children, style, ...props }, ref) => {
  return (
    <Grid container justifyItems="stretch">
      <InfiniteScroll
        style={{ display: "flex", flexWrap: "wrap", ...style }}
        ref={ref}
        {...props}
      >
        {children}
      </InfiniteScroll>
    </Grid>
  );
});
InfiniteCharacterList.displayName = "InfiniteCharacterList";

export default InfiniteCharacterList;
