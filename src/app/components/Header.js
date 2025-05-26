import Button from "./Button";

export default function Header() {
    return (
        <header id="header" className="fixed w-full border-b border-gray-200 py-4 bg-white ">
            <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="logo rounded-full p-2 bg-gray-200">
                        <span className="text-lg"></span>
                    </div>
                    <span className="logo-text text-xl font-semibold">Groomify</span>
                </div>

                {/* Nav Links */}
                <div className="flex space-x-6">
                    <a href="#about-us" className="hover:underline">About</a>
                    <a href="#services" className="hover:underline">Services</a>
                    <a href="#gallery" className="hover:underline">Gallery</a>
                    <a href="#faqs" className="hover:underline">FAQs</a>
                </div>

                {/* Log in/Book */}
                <div className="flex space-x-6 items-center">
                    <a href="#login" className="hover:underline">Log in</a>
                    <Button
                        text="Book a demo"
                        href="#book"
                        className="button"
                    />
                </div>
            </nav>
        </header>
    );
}