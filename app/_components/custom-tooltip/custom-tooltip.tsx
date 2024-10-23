import { Tooltip, TooltipProps } from "@nextui-org/react";
import { merge } from "lodash";
import { PropsWithChildren } from "react";

export default function CustomTooltip({
  children,
  ...rest
}: PropsWithChildren<TooltipProps>) {
  const defaultProps: TooltipProps = {
    color: "foreground",
    delay: 400,
  }; // props we want to override to be the custom defaults
  const finalProps: TooltipProps = merge({}, defaultProps, rest);

  return <Tooltip {...finalProps}>{children}</Tooltip>;
}
