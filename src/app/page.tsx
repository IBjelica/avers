'use client'

import Image from "next/legacy/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import styles from './layout.module.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${inter.className}`}>
      {/* Hero Section */}
      <section id="home" className="h-[calc(100vh-80px)] bg-cover bg-left-top relative" style={{backgroundImage: "url('/assets/images/hero-bg.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
        <div className={`${styles.container} mt-20 mx-auto flex flex-col h-full justify-start row-gap-[15%] text-white text-center pt-20 relative z-10`}>
          <Image src="/assets/icons/logo-white.svg" alt="Avers Logo" width={237} height={102} className="mb-8 mx-auto" />
          <h1 className={`font-bold mt-[40%] md:mt-[25%] ml:mt-[92px] mb-8 leading-[0.987] uppercase w-full md:w-[85vw] max-w-[1344px] text-[min(12vw,157px)] mx-auto`}>
            Welcome to<br />Progress
          </h1>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 py-6 z-50 transition-colors duration-300" style={{
        backgroundColor: isSticky ? '#53758F' : 'rgba(83, 117, 143, 0.85)'
      }}>
        <div className="container w-[88%] min-w-[320px] mx-auto relative">
          <ul className="flex justify-between mx-auto text-white text-[clamp(11px,_1.125vw,_24px)] font-light">
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
                  className="whitespace-nowrap hover:text-white transition-colors duration-200 py-1 block"
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
        <div className={`${styles.container} mx-auto`}>
          <div className="flex flex-col md:flex-row items-start justify-evenly">
            <div className="md:w-[53%] mb-8 md:mb-0">
              <h2 
                className="text-[clamp(50px,_6vw,_116px)] font-bold leading-none"
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
              <p className="text-[clamp(15px,_1.125vw,_20px)] font-light leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                At AVERS Financial Consultancy and Accounting, our mission is crystal clear: we&apos;re here to enhance financial efficiency, ensure unwavering compliance, and ignite financial growth for our valued clients. 
              </p>
              <p className="text-[clamp(15px,_1.125vw,_20px)] font-light leading-normal mt-[30px] text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Our commitment extends to cost reduction, risk management, and the cultivation of innovation through our personalised, trustworthy solutions. Focusing on education and empowerment, we tailor our services to match your distinctive needs. Your success is our paramount objective, and we pledge steadfast integrity in every facet of our work. 
              </p>
              <p className="text-[clamp(15px,_1.125vw,_20px)] font-light leading-normal mt-[30px] text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Join us on the path toward financial prosperity and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-100">
        <div className={`${styles.container} mx-auto`}>
          <h2
            className="text-5xl font-bold mb-16"
            style={{
              color: '#0E1A28',
              paddingBottom: '18px',
              borderBottom: '1px solid #0E1A28',
              overflow: 'hidden',
            }}
          >OUR SERVICES</h2>
          <div className="flex justify-between gap-[clamp(20px,_2vw,_97px)] flex-col ml:flex-row">
            {[
              { title: "FINANCIAL CONSULTING", image: "/assets/images/service1.png" },
              { title: "ACCOUNTING AND BOOKKEEPING", image: "/assets/images/service2.png" },
              { title: "BACK\nOFFICE", image: "/assets/images/service3.png" },
            ].map((service) => (
              <div key={service.title} className="relative w-full h-[300px] ml:w-[30%] ml:h-[600px] rounded-2xl overflow-hidden shadow-lg">
                <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
                <div 
                  className="absolute inset-0 flex items-center justify-center p-8"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(60,101,133,.45) 16%, rgba(186,129,97,.45) 64%, rgba(225,147,180,.45) 100%)',
                  }}
                >
                  <div className="w-[300px] max-w-full bg-white rounded-2xl text-center px-[clamp(1rem,_2vw,_3rem)] py-6">
                    <h3 className="text-[#53758F] text-[clamp(14px,_1.4vw,_20px)] leading-5 whitespace-nowrap ml:whitespace-pre-line" style={{ fontFamily: 'var(--font-alaska)' }}>{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about-us" className="py-28 text-white overflow-hidden" style={{ backgroundColor: '#53758F' }}>
        <div className="w-full mx-auto px-4">
          <h2 className="text-5xl font-bold mb-[86px] text-center">WHAT OUR CLIENTS SAY ABOUT US</h2>
          <div className="relative -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                skipSnaps: false,
                containScroll: "trimSnaps",
                dragFree: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-[clamp(50px,_10vw,_113px)]" style={{fontFamily: 'var(--font-alaska)'}}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i} className="max-w-[658px] pl-[clamp(20px,_5vw,_113px)] basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2 xl:basis-[35%] transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-2xl h-full shadow-lg mx-2 transition-all duration-300 hover:shadow-xl" style={{color: '#0E1A28'}}>
                      <p className="font-bold text-[clamp(26px,_1.75vw,_32px)] leading-[1.155]">Hannah Schmitt</p>
                      <p className="text-[clamp(12px,_0.9vw,_16px)] leading-none">hjajha</p>
                      <p className="text-[clamp(16px,_1.25vw,_26px)] mt-6 leading-[1.155]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center w-1/5 mx-auto mt-[85px]">
                <CarouselPrevious variant="ghost" className="relative w-[clamp(20px,_2vw,_40px)] border-none" />
                <CarouselDots className="mx-4" />
                <CarouselNext variant="ghost" className="relative w-[clamp(20px,_2vw,_40px)] border-none" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-[clamp(0px,_2vw,_154px)]">
        <div className={`${styles.container} mx-auto`}>
          <h2 className={`text-[50px] leading-none text-[#0E1A28] font-bold mb-[127px] pb-[18px] border-b-[1px] border-[#0E1A28]`}>ABOUT US</h2>
          <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-5 gap-x-6 md:grid-rows-3 [&>*]:min-w-0">
            <h3 className={`max-w-[658px] text-[clamp(80px,_5.625vw,_94px)] leading-[.9] col-span-full md:col-span-8 row-span-1 font-['glitten-standard']`}>YOUR GUIDE TO FINANCIAL EXCELLENCE</h3>
            <div className="row-start-2 row-span-2 col-start-2 col-span-8 md:col-span-6 pt-[clamp(32px,_10vw,_128px)]">
              <p className="w-full md:w-[clamp(150px,_25vw,_429px)] max-w-full mb-6 text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                With a dynamic blend of 25 years of financial wisdom and a personal mission to drive business success, Samira isn&apos;t just the founder and CEO of Avers — she&apos;s a <span className="font-semibold">transformative force in financial consulting.</span> 
              </p>
              <p className="w-full md:w-[clamp(150px,_25vw,_429px)] max-w-full mb-6 text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Her approach combines deep market insight, personalised strategies and a wealth of knowledge, making Avers synonymous with an unparalleled commitment to client success.
              </p>
            </div>
            <div className="row-start-2 row-span-2 col-start-10 col-span-8 md:col-span-6 pt-[clamp(74px,_20vw,_296px)]">
              <p className="w-full md:w-[clamp(150px,_25vw,_434px)] mb-6 text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                With a <span className="font-semibold">foundation built on trust, innovation and an unwavering dedication to achieving financial excellence,</span> Samira and her team at Avers are not just advisors, but partners in your journey to excellence. 
              </p>
              <p className="w-full md:w-[clamp(150px,_25vw,_434px)] text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: 'var(--font-alaska)'}}>
                Their wealth of experience and passion for finance shines through in every endeavour, ensuring that your business is not only prepared for the future, but also ready to thrive in it.
              </p>
            </div>
            <div className="relative flex flex-row-reverse md:flex-col row-start-4 row-span-2 md:row-start-1 md:row-span-3 col-start-2 col-end-auto md:col-start-15 md:col-span-5 h-full md:max-w-[407px] ">
              <div className="relative grow-[.8] md:grow max-h-[696px] rounded-[27px] overflow-hidden">
                <Image src="/assets/images/founder.png" alt="Founder and CEO" layout="fill" objectFit="cover" />
              </div>
              <div className="flex flex-col justify-end relative bottom-0 left-0 bg-white p-6 text-center whitespace-nowrap">
                <p className="text-[clamp(14px,_1.7vw,_24px)] leading-5" style={{fontFamily: 'var(--font-alaska)'}}>Founder and CEO</p>
                <p className={`font-['glitten-standard'] text-[#0E1A28] text-[clamp(26px,_3vw,_50px)]`}>Samira Bjelica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="pt-12 pb-24 ml:py-24 text-[#0E1A28]">
        <div className={`${styles.container} mx-auto text-center`}>
          <p className="text-[clamp(18px,_1.4vw,_24px)] font-light leading-[1.8] mx-auto mb-[35px]" style={{fontFamily: 'var(--font-alaska)'}}>UNVEILING OPPORTUNITY, NAVIGATING PROSPERITY, AND ENSURING PEACE OF MIND.</p>
          <h2
            className="text-[clamp(98px,_6.5vw,_116px)] font-bold mt-9 mb-6 leading-[.8]"
            style={{
              backgroundImage: "url('/assets/images/gradient.png')",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            YOUR TRUST,<br />OUR COMMITMENT
          </h2>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-us" className="py-24 bg-cover bg-center" style={{backgroundImage: "url('/assets/images/contact-bg.png')"}}>
        <div className={`${styles.container} mx-auto`}>
          <div className="flex justify-between bg-white w-full mx-auto py-[97px] px-[clamp(14px,_2.5vw,_86px)] rounded-[27px] shadow-xl flex-col ml:flex-row ml:max-w-[1621px]">
            <div className="max-w-full ml:max-w-[clamp(300px,_30vw,_538px)]">
              <div className="mb-[76px]">
                <h2 className="text-[50px] font-bold leading-none mb-5">LET&apos;s TALK</h2>
                <p className="text-xl mb-8" style={{fontFamily: 'var(--font-alaska)'}}>Have some big idea or brand to develop and need help? Then reach out we&apos;d love to hear about your project and provide help</p>
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
            <div className="w-full ml:w-1/2 ml:max-w-[772px] mt-[53px] ml:mb-0" style={{fontFamily: 'var(--font-alaska)'}}>
              <form 
                onSubmit={handleSubmit} 
                className="space-y-[28px]"
              >
                <div className="space-y-[28px]">
                  <div className="space-y-[28px]">
                    <label className="block text-xl">Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full h-12 mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-[28px]">
                    <label className="block text-xl">Email</label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-12 mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-[28px]">
                    <label className="block text-xl">Message</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[150px] mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                {submitStatus.message && (
                  <div className={`text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-black hover:bg-black/90 text-white text-lg font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-4">
        <div className={`${styles.container} flex items-center justify-between max-w-[940px] w-full text-[13px] leading-5 mx-auto text-center ${inter.className}`}>
          <p>Copyright | Information</p>
          <p>Designed and developed by <a href="https://ntsh.studio">NTSH</a> exclusively for Avers.</p>
        </div>
      </footer>
    </div>
  )
}