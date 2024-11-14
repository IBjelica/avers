'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AversFinancial() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
        
        body {
          font-family: 'roboto', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* Hero Section with Navigation */}
      <section className="h-screen bg-cover bg-center flex flex-col justify-between relative" style={{backgroundImage: "url('/assets/hero-background.jpg')"}}>
        <div className="container mx-auto grid grid-flow-row content-center justify-items-center text-white text-center">
          <Image src="/assets/logo-white.svg" alt="Avers Logo" width={150} height={60} className="mb-8" />
          <h1 className="text-7xl font-bold mb-8 leading-tight">WELCOME TO<br />PROGRESS</h1>
        </div>
        
        {/* Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 py-6">
          <div className="container mx-auto">
            <ul className="flex justify-center space-x-8 text-white text-sm font-light">
              {['HOME', 'OUR VALUES', 'SERVICES', 'ABOUT US', 'CONTACT US', 'BLOG'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </section>

      {/* Empowering Your Financial Success Section */}
      <section className="py-24 bg-blue-800 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-5xl font-bold leading-tight">EMPOWERING<br />YOUR<br />FINANCIAL<br />SUCCESS</h2>
            </div>
            <div className="md:w-1/2">
              <p className="text-lg font-light leading-relaxed">
                At AVERS Financial Consultancy and Accounting, our mission is to create value every step of the way. We believe financial efficiency equals financial freedom, and we&apos;re here to guide you towards that reality.
              </p>
              <p className="text-lg font-light leading-relaxed mt-4">
                Our comprehensive approach to cost reduction, risk management, and strategic financial planning ensures that your business not only survives but thrives in today&apos;s competitive landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-blue-900">OUR SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "FINANCIAL CONSULTING", image: "/service1.jpg" },
              { title: "ACCOUNTING & BOOKKEEPING", image: "/service2.jpg" },
              { title: "TAX SERVICES", image: "/service3.jpg" },
            ].map((service) => (
              <div key={service.title} className="relative h-[600px] rounded-2xl overflow-hidden shadow-lg">
                <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-8">
                  <h3 className="text-white text-2xl font-bold">{service.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-blue-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">WHAT OUR CLIENTS SAY ABOUT US</h2>
          <div className="flex overflow-x-auto space-x-12 pb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white text-black p-8 rounded-2xl flex-shrink-0 w-96 shadow-lg">
                <p className="mb-6 text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="font-bold text-blue-900">Hannah Schmitt</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12 items-center">
            <Button variant="ghost" className="text-white mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-white mx-2" />
            ))}
            <Button variant="ghost" className="text-white ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-blue-900">ABOUT US</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <h3 className="text-4xl font-bold mb-8 text-blue-900 leading-tight">YOUR GUIDE TO<br />FINANCIAL EXCELLENCE</h3>
              <p className="mb-6 text-gray-600 leading-relaxed">
                With a dynamic team of 25 years of financial experts and a commitment to excellence, we&apos;ve helped over 500 businesses navigate their financial journey and 2500 or more clients achieve financial freedom.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our approach combines deep market insights, cutting-edge technology, and a wealth of experience. From startups to established enterprises, we&apos;re committed to client success.
              </p>
            </div>
            <div className="relative h-[600px]">
              <Image src="/founder.jpg" alt="Founder and CEO" layout="fill" objectFit="cover" className="rounded-2xl" />
              <div className="absolute bottom-0 left-0 bg-white p-6 rounded-tr-2xl">
                <p className="font-bold text-blue-900 text-lg">Founder and CEO</p>
                <p className="text-gray-600">Samira Bielka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6 leading-tight">YOUR TRUST,<br />OUR COMMITMENT</h2>
          <p className="text-2xl font-light max-w-3xl mx-auto">UNVEILING OPPORTUNITY, NAVIGATING PROSPERITY, AND ENSURING PEACE OF MIND.</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-cover bg-center" style={{backgroundImage: "url('/contact-bg.jpg')"}}>
        <div className="container mx-auto">
          <div className="bg-white p-12 rounded-2xl max-w-2xl mx-auto shadow-xl">
            <h2 className="text-5xl font-bold mb-8 text-blue-900">LET&apos;s TALK</h2>
            <p className="mb-8 text-gray-600 leading-relaxed">Ready to take the next step? Let&apos;s discuss how we can help you achieve your financial goals. Reach out to us today!</p>
            <form className="space-y-6">
              <Input placeholder="Name" className="border-gray-300 py-3" />
              <Input type="email" placeholder="Email" className="border-gray-300 py-3" />
              <Textarea placeholder="Message" className="border-gray-300 py-3" rows={6} />
              <Button className="w-full bg-blue-900 text-white hover:bg-blue-800 py-3 text-lg">Submit</Button>
            </form>
            <div className="mt-12 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-blue-900">ADDRESS</h3>
                <p className="text-gray-600">45 Rockefeller Plaza,<br />New York, NY 10111</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-blue-900">PHONE NUMBER</h3>
                <p className="text-gray-600">+1 234 567 8901</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Avers Financial. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}