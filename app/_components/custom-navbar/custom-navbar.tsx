"use client";

import { Icon } from "@iconify-icon/react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUiLink,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CustomTooltip } from "../custom-tooltip";
import { EventFallLogo } from "../eventfall-logo";
import { NavbarLink, NavbarLinkProps } from "../navbar-link";
import { ThemeSwitcher } from "../theme-switcher";

const items: NavbarLinkProps[] = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
];

export default function CustomNavbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar position="static">
      <NavbarBrand>
        <EventFallLogo />
        <p className="font-bold text-inherit">EVENTFALL</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {items.map(({ href, label }, index) => (
          <NavbarLink key={index} href={href} label={label} />
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <CustomTooltip content="GitHub">
            <Button
              href="https://github.com/rcatalina/eventfall"
              as={NextUiLink}
              isExternal
              isIconOnly
              color="default"
              variant="flat"
              aria-label="GitHub repository"
            >
              <Icon
                icon="mdi:github"
                className="text-2xl"
                data-testid="github-icon"
              />
            </Button>
          </CustomTooltip>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
