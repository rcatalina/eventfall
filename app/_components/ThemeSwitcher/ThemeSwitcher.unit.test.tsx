import { renderWithThemeContext } from "@/app/_lib/test-utils";
import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "next-themes";
import ThemeSwitcher from "./ThemeSwitcher";

type ThemeVariant = "light" | "dark" | "system";

const ThemeSpy: React.FC = () => {
  const { theme } = useTheme();
  return <span data-testid="theme-spy">{theme}</span>;
};

// Function to render the spy span & theme switcher component with a specific theme
const setupWithTheme = (theme: ThemeVariant | undefined = "dark") => {
  renderWithThemeContext(
    <>
      <ThemeSpy />
      <ThemeSwitcher />
    </>,
    { theme },
  );
  const spy = screen.getByTestId("theme-spy");
  const toggleButton = screen.getByLabelText("Switch theme");
  return { toggleButton, spy };
};

let localStorageMock: { [key: string]: string } = {};

describe("ThemeSwitcher", () => {
  beforeAll(() => {
    // Create a mock of the window.matchMedia function
    global.matchMedia = jest.fn(
      (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }) as MediaQueryList,
    );
    // Create mocks of localStorage getItem and setItem functions
    global.Storage.prototype.getItem = jest.fn(
      (key: string) => localStorageMock[key],
    );
    global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
  });

  afterEach(() => {
    jest.useRealTimers(); // Revert to real timers, in case some test used the built-in useFakeTimers
    cleanup(); // React trees cleanup
    localStorageMock = {}; // Clear the localStorage mock
  });

  describe("(light theme)", () => {
    it("renders a button with an icon", () => {
      const { toggleButton } = setupWithTheme("light");
      const icon = screen.getByTestId("theme-switcher-icon");
      expect(toggleButton).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(icon.getAttribute("icon")).toBe("mdi:moon-and-stars");
    });
    it("changes the theme when clicked", async () => {
      const user = userEvent.setup();
      const { toggleButton, spy } = setupWithTheme("light");
      await user.click(toggleButton);
      expect(spy).toHaveTextContent("dark");
    });
  });

  describe("(dark theme)", () => {
    it("renders a button with an icon", () => {
      const { toggleButton } = setupWithTheme("dark");
      const icon = screen.getByTestId("theme-switcher-icon");
      expect(toggleButton).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(icon.getAttribute("icon")).toBe("mdi:white-balance-sunny");
    });
    it("changes the theme when clicked", async () => {
      const user = userEvent.setup();
      const { toggleButton, spy } = setupWithTheme("dark");
      await user.click(toggleButton);
      expect(spy).toHaveTextContent("light");
    });
  });

  it("renders a tooltip when hovered", async () => {
    jest.useFakeTimers(); // We use fake timers to speed up the test, since there's a delay before the tooltip appears
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ThemeSwitcher />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    const toggleButton = screen.getByLabelText("Switch theme");
    await user.hover(toggleButton);
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass("before:bg-foreground");
  });
});
