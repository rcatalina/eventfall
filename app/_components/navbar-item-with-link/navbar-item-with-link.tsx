"use client";

import {
  NavbarItem,
  Link as NextUiLink,
  LinkProps as NextUiLinkProps,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export interface NavbarItemWithLinkProps extends NextUiLinkProps {
  label: string;
}

/**
 * Component composed of a `NavbarItem` parent with a `Link` child from the `nextui` library.
 * It checks if the `NavbarItem` is active by comparing the current app URL with the provided `href` prop, using the hook `usePathname` from `Next.js`
 * @returns A React component.
 */
export default function NavbarItemWithLink({
  href,
  label,
}: Omit<NavbarItemWithLinkProps, "aria-current">) {
  const pathname = usePathname();
  const isActive = href === pathname || pathname?.startsWith(`${href}/`);

  return (
    <NavbarItem isActive={isActive ? true : undefined}>
      <NextUiLink
        href={href}
        color={isActive ? "primary" : "foreground"}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </NextUiLink>
    </NavbarItem>
  );
}
