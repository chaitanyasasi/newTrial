import React from "react";
import "./Footer.css";

const FooterOne = () => {

    return (
        <div>
            <footer className="mainPart">
                <section className="about">
                    <h4>About Our Company</h4>
                    <p className="para">A Unique B2B Platform for Mobile Retailers, Wholesalers, and Distributors. With over two decades of experience, our founders are mobile industry experts

                    </p>
                    <a href="tel:">&#9742; +91 87008 91736</a>
                    <a href="mailto:">&#9746; support@dealsdray.com</a>
                </section>
                <section className="about">
                    <h4>Company</h4>
                    <a href="https://www.dealsdray.com/about-us/" target="_blank" rel="noreferrer">Our company</a>
                    <a href="https://www.dealsdray.com/careers/" target="_blank" rel="noreferrer">careers</a>
                    <a href="https://www.dealsdray.com/contact-us/" target="_blank" rel="noreferrer">Contact Us</a>
                    <a href="https://www.dealsdray.com/terms-of-use/" target="_blank" rel="noreferrer">Terms of Use</a>
                    <a href="https://www.dealsdray.com/fos-app-privacy-policy/" target="_blank" rel="noreferrer">FOS App Privacy Policy</a>
                    <a href="https://www.dealsdray.com/blog/" target="_blank" rel="noreferrer">Blog</a>
                </section>
                <section className="about1">
                    <h4>Connect with us</h4>
                    <a href="https://www.facebook.com/DealsDray" target="_blank" rel="noreferrer" className="fb">F</a>
                    <a href="https://in.linkedin.com/company/dealsdray" target="_blank" rel="noreferrer" className="link">in</a>
                    <a href="https://x.com/dealsdray" target="_blank" rel="noreferrer" className="twit">twitter</a>
                    <a href="https://www.youtube.com/@dealsdray?si=lLZc33gvRZZ8CTui" target="_blank" rel="noreferrer" className="utube">Youtube</a>
                    <a href="https://www.instagram.com/dealsdray/" target="_blank" rel="noreferrer" className="insta">insta</a>
                </section>
            </footer>
        </div>
    )
}

export default FooterOne;