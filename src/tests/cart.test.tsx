import { render, screen } from "@testing-library/react"
import Home from "../components/home"

test ("on load show cart", () => {
    render(<Home/>);
    
    expect(screen.getByRole("button", {name: /add/i}))
})