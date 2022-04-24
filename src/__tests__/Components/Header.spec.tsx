import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";

describe("Component Header", () => {
  const openModal = jest.fn();

  it("Should be able to render without opening modal to save new food", () => {
    render(<Header openModal={openModal} />);

    expect(openModal).not.toHaveBeenCalled();
  });

  it("should be able open modal to add new food", () => {
    render(<Header openModal={openModal} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(openModal).toBeCalledTimes(1);
  });
});
