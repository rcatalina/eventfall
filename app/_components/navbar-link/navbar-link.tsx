"use client";

import {
  Link as NextUiLink,
  LinkProps as NextUiLinkProps,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export interface NavbarLinkProps extends NextUiLinkProps {
  label: string;
}

export default function NavbarLink({
  href,
  label,
}: Omit<NavbarLinkProps, "aria-current">) {
  const pathname = usePathname();
  const isActive = href === pathname || pathname?.startsWith(`${href}/`);

  return (
    <NextUiLink
      href={href}
      color={isActive ? "primary" : "foreground"}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </NextUiLink>
  );
}
