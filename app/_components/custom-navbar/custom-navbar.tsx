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
import {
  NavbarItemWithLink,
  NavbarItemWithLinkProps,
} from "../navbar-item-with-link";
import { ThemeSwitcher } from "../theme-switcher";

const items: NavbarItemWithLinkProps[] = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
];

function GitHubButton() {
  return (
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
  );
}

export default function CustomNavbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Navbar
      position="static"
      maxWidth="2xl"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-4",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <Icon icon="la:meteor" className="text-4xl" />
        <p className="bg-gradient-to-r from-primary-700 to-secondary-800 bg-clip-text font-serif font-black text-transparent dark:from-primary-400 dark:to-secondary-400">
          <span className="text-3xl">E</span>
          <span className="text-2xl">VENT</span>
          <span className="text-3xl">F</span>
          <span className="text-2xl">ALL</span>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {items.map(({ href, label }, index) => (
          <NavbarItemWithLink key={index} href={href} label={label} />
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <GitHubButton />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
