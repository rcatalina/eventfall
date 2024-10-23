import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { ReactElement, ReactNode } from "react";

type TestProviderOptions = {
  theme?: string;
};

type CustomOptions = RenderOptions & TestProviderOptions;

const createTestProviders = ({
  theme = "dark",
}: TestProviderOptions): React.FC<{ children: ReactNode }> =>
  function ProvideThemes({ children }) {
    return (
      <NextThemesProvider
        defaultTheme={theme}
        enableSystem={false}
        attribute="class"
      >
        {children}
      </NextThemesProvider>
    );
  };

export const renderWithThemeContext = (
  ui: ReactElement,
  { theme, ...options }: CustomOptions = {},
): RenderResult =>
  render(ui, { wrapper: createTestProviders({ theme }), ...options });
