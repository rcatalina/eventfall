import { expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import ThemeSwitcher from "./ThemeSwitcher";

it("renders theme switcher component unchanged", () => {
  const { container } = render(<ThemeSwitcher />);
  expect(container).toMatchSnapshot();
});
