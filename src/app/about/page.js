"use client";
import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function About() {
  return (
    <>
      <Navbar/>
      <div className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-pink-600 text-white py-24 px-6 text-center">
          <h1 className="text-6xl font-extrabold tracking-tight">
            About <span className="text-white">DevWear</span>
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
            Where <span className="font-semibold">style meets technology</span>.
            DevWear is not just clothing — it’s a culture for developers who want to wear their passion.
          </p>
        </section>

        {/* Our Story */}
        <section className="bg-gray-100 max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              DevWear started with a simple idea: developers spend countless hours solving problems,
              creating solutions, and building the future — so why shouldn’t their style reflect that?
              <br /> <br />
              We wanted to create clothes that speak the same language as the people who code.
              Every hoodie, t-shirt, and accessory is crafted with comfort, premium quality, and
              design that reflects the coding lifestyle.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/hero-model.png"
              alt="Developers working together"
              width={550}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To empower developers worldwide with clothing that represents their identity.
              Our goal is to merge <span className="text-pink-600 font-semibold">comfort</span>,
              <span className="text-pink-600 font-semibold"> style</span>, and
              <span className="text-pink-600 font-semibold"> tech culture</span> into every piece we produce.
              <br /> <br />
              When you wear DevWear, you’re not just wearing clothes — you’re joining a community of innovators.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-100 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center">Our Values</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="p-8 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-pink-600">Innovation</h3>
              <p className="mt-4 text-gray-600">
                We constantly evolve our designs to reflect the fast-paced world of tech & creativity.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-pink-600">Community</h3>
              <p className="mt-4 text-gray-600">
                Our brand thrives on the developer community — a shared love for coding and problem-solving.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-pink-600">Quality</h3>
              <p className="mt-4 text-gray-600">
                We promise top-notch fabrics, long-lasting prints, and designs that inspire.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center">Our Journey</h2>
            <div className="mt-12 space-y-12">
              <div className="flex items-start gap-6">
                <div className="bg-pink-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">2019</div>
                <p className="text-gray-700 text-lg">Idea sparked during a hackathon: DevWear was born.</p>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-pink-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">2020</div>
                <p className="text-gray-700 text-lg">First collection launched — hoodies & tees sold out in days.</p>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-pink-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">2022</div>
                <p className="text-gray-700 text-lg">Expanded globally, shipping to 20+ countries.</p>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-pink-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">2025</div>
                <p className="text-gray-700 text-lg">Continuing to innovate with developer-inspired fashion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-100 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center">Meet Our Team</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <Image
                src="/hero-model.png"
                alt="Team member"
                width={150}
                height={150}
                className="mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold">Alex Carter</h3>
              <p className="text-gray-500">Founder & CEO</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <Image
                src="/hero-model.png"
                alt="Team member"
                width={150}
                height={150}
                className="mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold">Sophia Lee</h3>
              <p className="text-gray-500">Creative Director</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <Image
                src="/hero-model.png"
                alt="Team member"
                width={150}
                height={150}
                className="mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold">David Kim</h3>
              <p className="text-gray-500">Head of Marketing</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-pink-600 text-white text-center py-20">
          <h2 className="text-4xl font-bold">Join the DevWear Movement</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Be part of a growing community of developers who code with style.
            Discover exclusive drops, discounts, and events for coders worldwide.
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-pink-600 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
            Shop Now
          </button>
        </section>

      </div>
      <Footer/>
    </>
  );
}
