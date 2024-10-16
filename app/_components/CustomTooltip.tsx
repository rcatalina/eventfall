import { Tooltip, TooltipProps } from "@nextui-org/react";
import { merge } from "lodash";
import { PropsWithChildren } from "react";

export default function CustomTooltip({
  children,
  ...rest
}: PropsWithChildren<TooltipProps>) {
  // props we want to override to be the new defaults
  const customProps: TooltipProps = { color: "foreground" };
  const finalProps: TooltipProps = merge(customProps, rest);

  return <Tooltip {...finalProps}>{children}</Tooltip>;
}
