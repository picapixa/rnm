import { useScrollTrigger } from "@mui/material";
import { UseScrollTriggerOptions } from "@mui/material/useScrollTrigger/useScrollTrigger";
import { Attributes, cloneElement } from "react";

type AppBarScrollProps = {
  options?: UseScrollTriggerOptions;
  children: React.ReactElement;
  onTriggeredProps?: Attributes;
  onUntriggeredProps?: Attributes;
};

const AppBarScroll = ({
  children,
  options,
  onTriggeredProps,
  onUntriggeredProps,
}: AppBarScrollProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    ...options,
  });

  return cloneElement(
    children,
    trigger ? onTriggeredProps : onUntriggeredProps,
  );
};

export default AppBarScroll;
