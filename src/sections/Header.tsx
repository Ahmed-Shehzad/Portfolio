/**
 * Renders the main header navigation bar for the portfolio site.
 * @returns {JSX.Element} The header navigation bar component.
 */
export const Header = () => {
  return <div className="flex justify-center items-center relative top-3">
    <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a className="nav-item" href="#home">Home</a>
        <a className="nav-item" href="#about">About</a>
        <a className="nav-item" href="#projects">Projects</a>
        <a className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900" href="#contact">Contact</a>
    </nav>
  </div>
};
