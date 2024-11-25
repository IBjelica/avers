'use client'

import Image from "next/legacy/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import localFont from 'next/font/local'
import { useEffect, useState, useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel"
import { Inter } from 'next/font/google'

const glitten = localFont({
  src: './fonts/glitten.otf',
  variable: '--font-glitten',
});

const alaska = localFont({
  src: './fonts/alaska.otf',
  variable: '--font-alaska',
});

const inter = Inter({ subsets: ['latin'] })

const MENU_ITEMS = ['HOME', 'OUR VALUES', 'SERVICES', 'ABOUT US', 'CONTACT US'] as const;
type MenuItem = typeof MENU_ITEMS[number];

export default function AversFinancial() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<MenuItem>('HOME');
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const menuItemRefs = useRef<Map<MenuItem, HTMLLIElement>>(new Map());
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 0);
      }
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const menuItem = MENU_ITEMS.find(
            item => item.toLowerCase().replace(' ', '-') === sectionId
          );
          if (menuItem) {
            setActiveSection(menuItem);
            if (!hoveredItem) {
              updateUnderlinePosition(menuItem);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
      rootMargin: '-68px 0px 0px 0px' // Account for nav height
    });

    // Observe all sections
    MENU_ITEMS.forEach(item => {
      const section = document.querySelector(`#${item.toLowerCase().replace(' ', '-')}`);
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [hoveredItem]);

  const updateUnderlinePosition = (item: MenuItem) => {
    const currentItem = menuItemRefs.current.get(item);
    if (!currentItem || !underlineRef.current) return;

    const { width, left } = currentItem.getBoundingClientRect();
    const containerLeft = currentItem.parentElement?.getBoundingClientRect().left || 0;
    const position = left - containerLeft;

    underlineRef.current.style.width = `${width}px`;
    underlineRef.current.style.transform = `translateX(${position}px)`;
  };

  const handleMouseEnter = (item: MenuItem) => {
    setHoveredItem(item);
    updateUnderlinePosition(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    updateUnderlinePosition(activeSection);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${glitten.variable} ${alaska.variable}`}>
      {/* Hero Section */}
      <section id="home" className="h-screen bg-cover bg-left-top relative" style={{backgroundImage: "url('/assets/images/hero-bg.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
        <div className="container mx-auto flex flex-col h-full justify-start row-gap-[15%] text-white text-center pt-20 relative z-10">
          <Image src="/assets/icons/logo-white.svg" alt="Avers Logo" width={237} height={102} className="mb-8 mx-auto" />
          <h1 className={`${glitten.variable} font-bold mb-8 leading-tight uppercase w-[70vw] max-w-[1344px] text-[min(10vw,195px)] mx-auto`}>
            Welcome to<br />Progress
          </h1>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 -mt-[76px] py-6 z-50 transition-colors duration-300" style={{
        fontFamily: 'var(--font-alaska)',
        backgroundColor: isSticky ? '#53758F' : 'rgba(83, 117, 143, 0.85)'
      }}>
        <div className="container mx-auto relative">
          <ul className="flex justify-center space-x-8 text-white text-sm font-light">
            {MENU_ITEMS.map((item) => (
              <li 
                key={item} 
                className="relative"
                ref={(el) => {
                  if (el) menuItemRefs.current.set(item, el);
                }}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
              >
                <a 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="hover:text-white transition-colors duration-200 py-1 block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div 
            ref={underlineRef}
            className="absolute bottom-0 h-0.5 bg-white transition-all duration-300"
            style={{
              left: '0px',
              width: '0px',
              transform: 'translateX(0px)'
            }}
          />
        </div>
      </nav>

      {/* Empowering Your Financial Success Section */}
      <section id="our-values" className="py-24 text-white" style={{ backgroundColor: '#53758F' }}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-evenly">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 
                className="text-[min(7vw,116px)] font-bold leading-none"
                style={{
                  backgroundImage: "url('/assets/images/gradient.png')",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "150%",
                  backgroundPosition: "top center",
                }}
              >EMPOWERING<br />YOUR<br />FINANCIAL<br />SUCCESS</h2>
            </div>
            <div className="mt-4 md:w-[40%]">
              <p className="text-xl font-light leading-[30px] text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                At AVERS Financial Consultancy and Accounting, our mission is crystal clear: we're here to enhance financial efficiency, ensure unwavering compliance, and ignite financial growth for our valued clients. 
              </p>
              <p className="text-xl font-light leading-[30px] mt-4 text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Our commitment extends to cost reduction, risk management, and the cultivation of innovation through our personalised, trustworthy solutions. Focusing on education and empowerment, we tailor our services to match your distinctive needs. Your success is our paramount objective, and we pledge steadfast integrity in every facet of our work. 
              </p>
              <p className="text-xl font-light leading-[30px] mt-4 text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Join us on the path toward financial prosperity and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-100">
        <div className="container mx-auto">
          <h2
            className="text-5xl font-bold mb-16"
            style={{
              color: '#0E1A28',
              paddingBottom: '18px',
              borderBottom: '1px solid #0E1A28',
              lineHeight: '.58',
              overflow: 'hidden',
            }}
          >OUR SERVICES</h2>
          <div className="flex justify-between">
            {[
              { title: "FINANCIAL CONSULTING", image: "/assets/images/service1.png" },
              { title: "ACCOUNTING AND BOOKKEEPING", image: "/assets/images/service2.png" },
              { title: "BACK\nOFFICE", image: "/assets/images/service3.png" },
            ].map((service) => (
              <div key={service.title} className="relative w-[30%] h-[600px] rounded-2xl overflow-hidden shadow-lg">
                <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
                <div 
                  className="absolute inset-0 flex items-center justify-center p-8"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(60,101,133,.45) 16%, rgba(186,129,97,.45) 64%, rgba(225,147,180,.45) 100%)',
                  }}
                >
                  <div className="w-[300px] bg-white rounded-2xl text-center px-12 py-6">
                    <h3 className="text-[#53758F] text-xl leading-6 whitespace-pre-line" style={{ fontFamily: 'var(--font-alaska)' }}>{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about-us" className="py-28 text-white overflow-hidden" style={{ backgroundColor: '#53758F' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-[86px] text-center">WHAT OUR CLIENTS SAY ABOUT US</h2>
          <div className="relative -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                skipSnaps: false,
                containScroll: "trimSnaps",
                dragFree: false,
                draggable: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4" style={{fontFamily: 'var(--font-alaska)'}}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i} className="max-w-[658px] pl-4 basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2 xl:basis-[45%] transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-2xl h-full shadow-lg mx-2 transition-all duration-300 hover:shadow-xl" style={{color: '#0E1A28'}}>
                      <p className="font-bold text-[32px] leading-none">Hannah Schmitt</p>
                      <p className="text-[16px] leading-none">Founder of ABC Company</p>
                      <p className="text-[26px] mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center mt-[85px] space-x-20">
                <CarouselPrevious variant="ghost" className="relative border-none" />
                <CarouselDots className="mx-4" />
                <CarouselNext variant="ghost" className="relative border-none" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-[154px]">
        <div className="container mx-auto">
          <h2 className={`${glitten.variable} text-[50px] leading-10 text-[#0E1A28] font-bold mb-[127px] pb-[18px] border-b-[1px] border-[#0E1A28]`}>ABOUT US</h2>
          <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-3 [&>*]:min-w-0">
            <h3 className={`max-w-[658px] text-[94px] leading-[86px] col-span-8 row-span-1 font-['glitten-standard']`}>YOUR GUIDE TO FINANCIAL EXCELLENCE</h3>
            <div className="row-start-2 row-span-2 col-start-2 col-span-6 pt-32">
              <p className="max-w-[429px] mb-6 text-[#0E1A28] text-xl leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                With a dynamic blend of 25 years of financial wisdom and a personal mission to drive business success, Samira isn't just the founder and CEO of Avers — she's a <span className="font-semibold">transformative force in financial consulting.</span> 
              </p>
              <p className="max-w-[429px] mb-6 text-[#0E1A28] text-xl leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Her approach combines deep market insight, personalised strategies and a wealth of knowledge, making Avers synonymous with an unparalleled commitment to client success.
              </p>
            </div>
            <div className="row-start-2 row-span-2 col-start-8 col-span-6 pt-64">
              <p className="max-w-[435px] mb-6 text-[#0E1A28] text-xl leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                With a <span className="font-semibold">foundation built on trust, innovation and an unwavering dedication to achieving financial excellence,</span> Samira and her team at Avers are not just advisors, but partners in your journey to excellence. 
              </p>
              <p className="max-w-[435px] text-[#0E1A28] text-xl leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Their wealth of experience and passion for finance shines through in every endeavour, ensuring that your business is not only prepared for the future, but also ready to thrive in it.
              </p>
            </div>
            <div className="relative flex flex-col row-start-1 row-span-3 col-start-15 col-span-5 h-full max-w-[407px]">
              <div className="relative grow rounded-[27px] overflow-hidden">
                <Image src="/assets/images/founder.png" alt="Founder and CEO" layout="fill" objectFit="cover" />
              </div>
              <div className="relative bottom-0 left-0 bg-white p-6 text-center">
                <p className="font-bold text-2xl leading-5" style={{fontFamily: 'var(--font-alaska)'}}>Founder and CEO</p>
                <p className={` ${glitten.variable} text-[#0E1A28] text-[50px]`}>Samira Bjelica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 text-[#0E1A28]">
        <div className="container mx-auto text-center">
          <p className="text-2xl font-light leading-[53px] mx-auto mb-[35px]" style={{fontFamily: 'var(--font-alaska)'}}>UNVEILING OPPORTUNITY, NAVIGATING PROSPERITY, AND ENSURING PEACE OF MIND.</p>
          <h2
            className="text-[116px] font-bold mt-9 mb-6 leading-[94px]"
            style={{
              backgroundImage: "url('/assets/images/gradient.png')",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundSize: "75%",
              backgroundPosition: "54% center",
              backgroundRepeat: "no-repeat",
            }}
          >
            YOUR TRUST,<br />OUR COMMITMENT
          </h2>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-us" className="py-24 bg-cover bg-center" style={{backgroundImage: "url('/assets/images/contact-bg.png')"}}>
        <div className="container mx-auto">
          <div className="flex justify-between bg-white w-[92%] max-w-[1621px] mx-auto py-[97px] px-[86px] rounded-[27px] shadow-xl">
            <div className="max-w-[538px]">
              <div className="mb-[76px]">
                <h2 className="text-[50px] font-bold leading-none mb-5">LET&apos;s TALK</h2>
                <p className="text-xl mb-8" style={{fontFamily: 'var(--font-alaska)'}}>Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help</p>
              </div>
              <div className="mb-[53px]">
                <h3 className="text-[50px] font-bold leading-none mb-5">ADDRESS</h3>
                <p className="" style={{fontFamily: 'var(--font-alaska)'}}>dr. Dragoslava Popovića 14<br />Belgrade, Serbia</p>
              </div>
              <div>
                <h3 className="text-[50px] font-bold leading-none mb-5">PHONE NUMBER</h3>
                <p className="" style={{fontFamily: 'var(--font-alaska)'}}>+1 234 567 8901</p>
              </div>
            </div>
            <div className="w-1/2 max-w-[772px]" style={{fontFamily: 'var(--font-alaska)'}}>
              <form className="space-y-6">
                <div className="space-y-4 w-full">
                  <div>
                    <label className="block text-xl">Name</label>
                    <Input 
                      type="text"
                      className="w-full h-12 bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-[28px]">
                    <label className="block text-xl">Email</label>
                    <Input 
                      type="email"
                      className="w-full h-12 mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-[28px]">
                    <label className="block text-xl">Message</label>
                    <Textarea 
                      className="w-full min-h-[150px] mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <Button className="w-full h-12 bg-black hover:bg-black/90 text-white text-lg font-medium">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-4">
        <div className={`flex items-center justify-between max-w-[940px] w-full text-[13px] leading-5 container mx-auto text-center ${inter.className}`}>
          <p>Copyright | Information</p>
          <p>Designed and developed by <a href="https://ntsh.studio">NTSH</a> exclusively for Avers.</p>
        </div>
      </footer>
    </div>
  )
}