import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";

describe("Weather Frontend Integration", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("successful submission renders result", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        city: "Kuala Lumpur",
        days: 3,
        averageTemperature: 29.5,
        unit: "C",
        cached: false,
      }),
    }) as jest.Mock;

    render(<Home />);

    const cityInput = screen.getByPlaceholderText(/kuala lumpur/i);
    const daysInput = screen.getByDisplayValue("3");
    const button = screen.getByRole("button", { name: /get average/i });

    fireEvent.change(cityInput, { target: { value: "Kuala Lumpur" } });
    fireEvent.change(daysInput, { target: { value: "3" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/29.5 C/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("shows validation error when city is empty", async () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /get average/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/City is required/i)).toBeInTheDocument();
    });
  });

  test("renders backend error message", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: { message: "City not found" },
      }),
    }) as jest.Mock;

    render(<Home />);

    const cityInput = screen.getByPlaceholderText(/kuala lumpur/i);
    const button = screen.getByRole("button", { name: /get average/i });

    fireEvent.change(cityInput, { target: { value: "InvalidCity" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/City not found/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
