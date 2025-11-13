"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-pink-600 text-white py-20 px-6 text-center">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Contact <span className="text-white">Us</span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Got a question, feedback, or collaboration idea?
            We’d love to hear from you. Reach out and our team will get back to you soon.
          </p>
        </section>

        {/* Contact Info */}
        <section className="bg-gray-100 max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center">
            <Mail className="mx-auto text-pink-600" size={40} />
            <h3 className="mt-4 text-xl font-semibold">Email Us</h3>
            <p className="text-gray-600 mt-2">support@devwear.com</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center">
            <Phone className="mx-auto text-pink-600" size={40} />
            <h3 className="mt-4 text-xl font-semibold">Call Us</h3>
            <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition text-center">
            <MapPin className="mx-auto text-pink-600" size={40} />
            <h3 className="mt-4 text-xl font-semibold">Visit Us</h3>
            <p className="text-gray-600 mt-2">123 Dev Street, Silicon Valley, CA</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center">Send Us a Message</h2>
            <p className="mt-4 text-lg text-gray-600 text-center">
              Fill out the form below and we’ll get back to you within 24 hours.
            </p>

            <form className="mt-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows="6"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-pink-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center">Find Us Here</h2>
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509373!2d144.95373531531835!3d-37.81627974202164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1fdf!2sSilicon%20Valley!5e0!3m2!1sen!2sus!4v1614123456789"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
                className="w-full h-[400px] border-0"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}
