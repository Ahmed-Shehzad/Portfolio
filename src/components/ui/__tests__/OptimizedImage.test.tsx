import { cleanup, fireEvent, render } from "@/test/utils/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OptimizedImage } from "../OptimizedImage";

vi.mock("next/image", () => ({
  default: vi.fn(({ src, alt, onError, ...props }) => (
    <img src={src} alt={alt} onError={onError} {...props} data-testid="next-image" />
  )),
}));

describe("OptimizedImage", () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    src: "/test-image.jpg",
    alt: "Test image",
    width: 100,
    height: 100,
  };

  it("renders basic image", () => {
    const { getByTestId } = render(<OptimizedImage {...defaultProps} />);
    const image = getByTestId("next-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test image");
  });

  it("renders picture element with webp source", () => {
    const { container } = render(<OptimizedImage {...defaultProps} webpSrc="/test-image.webp" />);
    const picture = container.querySelector("picture");
    const webpSource = container.querySelector('source[type="image/webp"]');

    expect(picture).toBeInTheDocument();
    expect(webpSource).toBeInTheDocument();
    expect(webpSource).toHaveAttribute("srcSet", "/test-image.webp");
  });

  it("renders picture element with avif source", () => {
    const { container } = render(<OptimizedImage {...defaultProps} avifSrc="/test-image.avif" />);
    const picture = container.querySelector("picture");
    const avifSource = container.querySelector('source[type="image/avif"]');

    expect(picture).toBeInTheDocument();
    expect(avifSource).toBeInTheDocument();
    expect(avifSource).toHaveAttribute("srcSet", "/test-image.avif");
  });

  it("handles image error with fallback", () => {
    const { getByTestId } = render(
      <OptimizedImage {...defaultProps} fallbackSrc="/fallback.jpg" />
    );
    const image = getByTestId("next-image");

    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/fallback.jpg");
  });

  it("applies default quality and sizes", () => {
    const { getByTestId } = render(<OptimizedImage {...defaultProps} />);
    const image = getByTestId("next-image");

    expect(image).toHaveAttribute("quality", "85");
    expect(image).toHaveAttribute(
      "sizes",
      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    );
  });

  it("handles static image data objects", () => {
    const staticImageData = { src: "/static-image.jpg", width: 100, height: 100 };
    const { getByTestId } = render(
      <OptimizedImage src={staticImageData} alt="Static image" width={100} height={100} />
    );
    const image = getByTestId("next-image");

    expect(image).toHaveAttribute("src", "/static-image.jpg");
  });

  it("handles number src values", () => {
    const { getByTestId } = render(
      <OptimizedImage src={123 as any} alt="Number src" width={100} height={100} />
    );
    const image = getByTestId("next-image");

    expect(image).toHaveAttribute("src", "123");
  });

  it("renders both webp and avif sources when provided", () => {
    const { container } = render(
      <OptimizedImage {...defaultProps} webpSrc="/test-image.webp" avifSrc="/test-image.avif" />
    );

    const avifSource = container.querySelector('source[type="image/avif"]');
    const webpSource = container.querySelector('source[type="image/webp"]');

    expect(avifSource).toBeInTheDocument();
    expect(webpSource).toBeInTheDocument();
    expect(avifSource).toHaveAttribute("srcSet", "/test-image.avif");
    expect(webpSource).toHaveAttribute("srcSet", "/test-image.webp");
  });

  it("passes through custom props to Next Image", () => {
    const { getByTestId } = render(
      <OptimizedImage {...defaultProps} priority placeholder="blur" quality={90} sizes="100vw" />
    );
    const image = getByTestId("next-image");

    expect(image).toHaveAttribute("placeholder", "blur");
    expect(image).toHaveAttribute("quality", "90");
    expect(image).toHaveAttribute("sizes", "100vw");
  });

  it("handles error without fallback gracefully", () => {
    const { getByTestId } = render(<OptimizedImage {...defaultProps} />);
    const image = getByTestId("next-image");

    // Should not throw when no fallback is provided
    expect(() => fireEvent.error(image)).not.toThrow();
  });

  it("applies custom className", () => {
    const { container } = render(<OptimizedImage {...defaultProps} className="custom-class" />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders without picture wrapper when no modern formats provided", () => {
    const { container, getByTestId } = render(<OptimizedImage {...defaultProps} />);

    const picture = container.querySelector("picture");
    const image = getByTestId("next-image");

    expect(picture).not.toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
