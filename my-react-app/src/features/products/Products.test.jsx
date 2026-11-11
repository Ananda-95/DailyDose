
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act
} from "@testing-library/react";

import Products from "./Products";

describe("Products Component Test Cases", () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    // 1. Check initial loading state
    test("should display loading initially", () => {

        fetch.mockReturnValue(new Promise(() => { }));

        render(<Products />);

        expect(screen.getByText("Loading..."))
            .toBeInTheDocument();
    });

    // 2. Check API success and product rendering
    test("should fetch and display products", async () => {

        const mockProducts = [
            { id: 1, title: "Learn React" },
            { id: 2, title: "Learn JavaScript" }
        ];

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        render(<Products />);

        expect(await screen.findByText("Learn React"))
            .toBeInTheDocument();

        expect(screen.getByText("Learn JavaScript"))
            .toBeInTheDocument();

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(fetch).toHaveBeenCalledWith(
            "https://jsonplaceholder.typicode.com/todos"
        );
    });

    // 3. Check API error response
    test("should display error when API returns failure response", async () => {

        fetch.mockResolvedValue({
            ok: false
        });

        render(<Products />);

        expect(
            await screen.findByText("error with api endpoint")
        ).toBeInTheDocument();

        expect(screen.queryByText("Loading..."))
            .not.toBeInTheDocument();
    });

    // 4. Check network error
    test("should display error when API request fails", async () => {

        fetch.mockRejectedValue(
            new Error("Network error")
        );

        render(<Products />);

        expect(
            await screen.findByText("Network error")
        ).toBeInTheDocument();
    });

    // 5. Check empty products response
    test("should display no products available when API returns empty array", async () => {

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue([])
        });

        render(<Products />);

        expect(
            await screen.findByText("no products available")
        ).toBeInTheDocument();
    });

    // 6. Check search functionality
    test("should filter products based on search text", async () => {

        const mockProducts = [
            { id: 1, title: "Learn React" },
            { id: 2, title: "Learn JavaScript" },
            { id: 3, title: "Learn Angular" }
        ];

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        render(<Products />);

        await screen.findByText("Learn React");

        const searchInput = screen.getByPlaceholderText("search text");

        fireEvent.change(searchInput, {
            target: { value: "React" }
        });

        await waitFor(() => {
            expect(screen.getByText("Learn React"))
                .toBeInTheDocument();

            expect(screen.queryByText("Learn JavaScript"))
                .not.toBeInTheDocument();

            expect(screen.queryByText("Learn Angular"))
                .not.toBeInTheDocument();
        });
    });

    // 7. Check case-insensitive search
    test("should filter products without considering uppercase or lowercase", async () => {

        const mockProducts = [
            { id: 1, title: "Learn React" },
            { id: 2, title: "Learn JavaScript" }
        ];

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        render(<Products />);

        await screen.findByText("Learn React");

        fireEvent.change(
            screen.getByPlaceholderText("search text"),
            {
                target: { value: "REACT" }
            }
        );

        expect(await screen.findByText("Learn React"))
            .toBeInTheDocument();

        expect(screen.queryByText("Learn JavaScript"))
            .not.toBeInTheDocument();
    });

    // 8. Check debounce functionality
    test("should filter products only after 500ms debounce", async () => {

        jest.useFakeTimers();

        const mockProducts = [
            { id: 1, title: "Learn React" },
            { id: 2, title: "Learn JavaScript" },
            { id: 3, title: "Learn Angular" }
        ];

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        render(<Products />);

        // Wait for API response
        await act(async () => {
            await Promise.resolve();
        });

        // Check all products initially
        expect(screen.getByText("Learn React"))
            .toBeInTheDocument();

        expect(screen.getByText("Learn JavaScript"))
            .toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText("search text");

        // Enter search text
        fireEvent.change(searchInput, {
            target: { value: "React" }
        });

        // Before 500ms, all products should be displayed
        expect(screen.getByText("Learn JavaScript"))
            .toBeInTheDocument();

        // Advance timer by 500ms
        await act(async () => {
            jest.advanceTimersByTime(500);
        });

        // After 500ms, only matching product should display
        expect(screen.getByText("Learn React"))
            .toBeInTheDocument();

        expect(screen.queryByText("Learn JavaScript"))
            .not.toBeInTheDocument();

        expect(screen.queryByText("Learn Angular"))
            .not.toBeInTheDocument();
    });

    // 9. Check clearing search
    test("should display all products when search is cleared", async () => {

        const mockProducts = [
            { id: 1, title: "Learn React" },
            { id: 2, title: "Learn JavaScript" }
        ];

        fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts)
        });

        render(<Products />);

        await screen.findByText("Learn React");

        const searchInput = screen.getByPlaceholderText("search text");

        fireEvent.change(searchInput, {
            target: { value: "React" }
        });

        await screen.findByText("Learn JavaScript").catch(() => { });

        // Wait for React filter
        await waitFor(() => {
            expect(screen.queryByText("Learn JavaScript"))
                .not.toBeInTheDocument();
        });

        // Clear search
        fireEvent.change(searchInput, {
            target: { value: "" }
        });

        expect(await screen.findByText("Learn JavaScript"))
            .toBeInTheDocument();
    });

});
