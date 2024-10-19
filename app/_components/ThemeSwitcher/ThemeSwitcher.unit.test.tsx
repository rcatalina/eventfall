import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeSwitcher from "./ThemeSwitcher";

const POSSIBLE_ICONS = ["mdi:moon-and-stars", "mdi:white-balance-sunny"];

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    // there might be a delay on the tooltip so we use fake timers to speed up the tests
    // jest.useFakeTimers();
  });

  afterEach(() => {
    // jest.useRealTimers();
    cleanup();
  });

  it("renders a button with an icon", () => {
    render(<ThemeSwitcher />);
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("theme-switcher-icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(POSSIBLE_ICONS).toContain(icon.getAttribute("icon"));
  });

  it("renders a tooltip when hovered", async () => {
    // const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const user = userEvent.setup();
    render(<ThemeSwitcher />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.hover(button);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
  });

  it("renders a tooltip when hovered", async () => {
    // const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const user = userEvent.setup();
    render(<ThemeSwitcher />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.hover(button);

    const tooltip = await screen.findByRole("tooltip2");
    expect(tooltip).toBeInTheDocument();
  });

  // it("updates icon when clicked", async () => {
  //   const user = userEvent.setup();
  //   render(<ThemeSwitcher />);
  //   const button = screen.getByRole("button");
  //   const beforeClickIcon = screen
  //     .getByTestId("theme-switcher-icon")
  //     .getAttribute("icon");

  //   await user.click(button);

  //   const afterClickIcon = screen
  //     .getByTestId("theme-switcher-icon")
  //     .getAttribute("icon");
  //   expect(afterClickIcon).not.toEqual(beforeClickIcon);
  // });
});
