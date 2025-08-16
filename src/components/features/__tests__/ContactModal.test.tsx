import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/test/utils/test-utils";
import { ContactModal } from "../ContactModal";

// Mock the contact query hook
vi.mock("@/features/contact/hooks/useContactQuery", () => ({
  useSubmitContactForm: () => ({
    mutate: vi.fn(),
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
    reset: vi.fn(),
  }),
}));

const mockProps = {
  isOpen: true,
  onClose: vi.fn(),
};

describe("ContactModal", () => {
  it("renders when open", () => {
    render(<ContactModal {...mockProps} />);
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const { container } = render(<ContactModal {...mockProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("calls onClose when close button clicked", () => {
    render(<ContactModal {...mockProps} />);
    const closeButtons = screen.getAllByRole("button", { name: /close modal/i });
    fireEvent.click(closeButtons[0]); // Click the first close button
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it("renders contact form", () => {
    render(<ContactModal {...mockProps} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });
});
