import Button from "./Button"

export default function ContactUs() {
    return (
        <section id="contact-us" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 py-20 p-8">
            <div className="col-span-1">
                <h1 className="text-6xl mb-4">How to get in touch with us</h1>
                <p className="mb-6">Have a question? We're always here to help.</p>
                <div className="bg-white rounded-lg shadow p-4  ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1316874509134!2d108.21767827495499!3d16.071034184608717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836b5f0b5d5%3A0xf372c18deace6db!2zVmnhu4duIE5naGnDqm4gY-G7qXUgdsOgIMSQw6BvIHThuqFvIFZp4buHdCAtIEFuaCwgxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e1!3m2!1sen!2s!4v1747971638378!5m2!1sen!2s"
                        width="80%" height="400px" style={{ border: '0' }} allowFullScreen loading="lazy"></iframe>
                </div>
            </div>
            <div className="grid grid-cols-1 col-span-1 gap-6">
                <div className="bg-primary rounded-lg shadow p-4">
                    <h2 className="text-2xl text-mainColor">Book online</h2>
                    <p className="mb-4">Choose your date and book online now.</p>
                    <Button
                        text="Book now"
                        href="#book"
                        className="mt-6 button inline-block"
                    />
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-2xl ">Speak to us</h2>
                    <p className="mb-4">Speak to us over the phone.</p>
                    <Button
                        text="Call us"
                        href="tel:+1234567890"
                        className="mt-6 button inline-block"
                    />
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-2xl ">Visit us</h2>
                    <p className="mb-4">Monday to Friday 8am - 5pm</p>
                    <Button
                        text="Get Directions"
                        href="https://maps.app.goo.gl/4ust7RzBsmEetita6"
                        className="mt-6 button inline-block"
                    />
                </div>
            </div>
        </section>
    )
}