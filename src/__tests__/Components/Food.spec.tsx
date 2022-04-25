import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

import Food from "components/Food";

describe("Component Food", () => {
  const food = {
    id: 1,
    name: "Ao molho",
    price: "19.90",
    description: "Macarrão ao molho branco, fughi e cheiro verde das montanhas",
    available: false,
    image:
      "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food1.png",
  };

  const handleDelete = jest.fn();
  const handleEditFood = jest.fn();

  it("Should be able render two card food", () => {
    render(
      <Food
        food={food}
        handleDelete={handleDelete}
        handleEditFood={handleEditFood}
      />
    );

    expect(screen.getByText("Ao molho")).toBeInTheDocument();
    expect(screen.getByText("19.90")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Macarrão ao molho branco, fughi e cheiro verde das montanhas"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`change-status-food-${food.id}`)
    ).not.toBeChecked();
  });

  it("Should be able food available", () => {
    render(
      <Food
        food={food}
        handleDelete={handleDelete}
        handleEditFood={handleEditFood}
      />
    );

    const checkAvailable = screen.getByTestId(`change-status-food-${food.id}`);

    fireEvent.change(checkAvailable, { target: { checked: true } });

    expect(checkAvailable).toBeChecked();
  });

  it("Should be able render modal to edit food", () => {
    render(
      <Food
        food={food}
        handleDelete={handleDelete}
        handleEditFood={handleEditFood}
      />
    );

    const editFood = screen.getByTestId(`edit-food-${food.id}`);

    fireEvent.click(editFood);

    expect(handleEditFood).toBeCalledTimes(1);
  });

  it("Should be able exclude food", () => {
    render(
      <Food
        food={food}
        handleDelete={handleDelete}
        handleEditFood={handleEditFood}
      />
    );

    const editFood = screen.getByTestId(`remove-food-${food.id}`);

    fireEvent.click(editFood);

    expect(handleDelete).toBeCalledTimes(1);
  });
});
