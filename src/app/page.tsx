'use client'

import Image from "next/legacy/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState, useRef } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel"
import { Inter } from 'next/font/google'
import styles from './layout.module.css'
import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import parse from 'html-react-parser';
import { fontGuide } from '@/lib/fonts';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const MENU_ITEMS = ['menu.ourvalues', 'menu.services', 'menu.aboutus', 'menu.contactus'] as const;
type MenuItem = typeof MENU_ITEMS[number];

function AversFinancialContent() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<MenuItem>('menu.ourvalues');
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const menuItemRefs = useRef<Map<MenuItem, HTMLLIElement>>(new Map());
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleLoad = () => {
      setPageLoaded(true);
      // Set initial underline position
      updateUnderlinePosition(activeSection);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!pageLoaded) return;

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
          // Match the section ID directly with the menu item
          const menuItem = MENU_ITEMS.find(
            item => item.replace('menu.', '') === sectionId
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
      threshold: 0.25,
      rootMargin: '-68px 0px 0px 0px' // Account for nav height
    });

    // Observe all sections
    MENU_ITEMS.forEach(item => {
      const sectionId = item.replace('menu.', '');
      const section = document.querySelector(`#${sectionId}`);
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
  }, [pageLoaded, hoveredItem]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section as MenuItem);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call it initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]); // Only depend on setActiveSection

  useEffect(() => {
    // Sync language with URL on mount
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['en', 'sr'].includes(langParam) && langParam !== i18n.language) {
      i18n.changeLanguage(langParam);
      localStorage.setItem('language', langParam);
    }
  }, []);

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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    
    // Update URL without refresh
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div suppressHydrationWarning className={`min-h-screen flex flex-col font-sans ${inter.className}`}>
      {/* Hero Section */}
      <section id="home" className="h-[calc(100vh-80px)] max-h-screen bg-cover bg-left-top bg-no-repeat relative" style={{backgroundImage: "url('/assets/images/hero-bg.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
        <div className={`${styles.container} mt-20 mx-auto flex flex-col h-full justify-start row-gap-[15%] text-white text-center pt-20 relative z-10`}>
          <Image src="/assets/icons/logo-white.svg" alt="Avers Logo" width={237} height={102} className="mb-8 mx-auto" />
          <h1 className={`font-medium mt-[40%] md:mt-[25%] ml:mt-[92px] mb-8 leading-[0.987] uppercase w-full md:w-[85vw] max-w-[1344px] text-[min(12vw,157px)] mx-auto`}>
            {t('hero.title')}
          </h1>
        </div>
      </section>

      {/* Language Switcher */}
      <div className="fixed top-4 right-8 z-50">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 rounded bg-white/90 hover:bg-white text-[#53758F] font-medium transition-colors duration-200"
        >
          {i18n.language === 'en' ? 'SR' : 'EN'}
        </button>
      </div>

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
                  href={`#${item.replace('menu.', '')}`}
                  className="whitespace-nowrap hover:text-white transition-colors duration-200 py-1 block"
                >
                  {t(item)}
                </a>
              </li>
            ))}
          </ul>
          <div 
            ref={underlineRef}
            className="absolute bottom-0 h-0.5 bg-white transition-all duration-300"
            style={{
              left: '0px',
              width: '100px',
              transform: 'translateX(0px)'
            }}
          />
        </div>
      </nav>

      {/* Our Values Section */}
      <section id="ourvalues" className="py-24 text-white" style={{ backgroundColor: '#53758F' }}>
        <div className={`${styles.container} mx-auto`}>
          <div className="flex flex-col md:flex-row items-start justify-evenly">
            <div className="md:w-[53%] mb-8 md:mb-0">
              <h2 
                className="text-[clamp(50px,_6vw,_116px)] font-bold leading-none max-xs:break-words"
                style={{
                  backgroundImage: "url('/assets/images/gradient.png')",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "150%",
                  backgroundPosition: "top center",
                }}
              >{t('values.title')}</h2>
            </div>
            <div className="mt-4 md:w-[40%]">
              <p className="text-[clamp(15px,_1.125vw,_20px)] font-light leading-normal text-justify" style={{ fontFamily: fontGuide.body.secondary }}>
                {t('values.mission')}
              </p>
              <p className="text-[clamp(15px,_1.125vw,_20px)] font-light leading-normal mt-[30px] text-justify" style={{ fontFamily: fontGuide.body.secondary }}>
                {t('values.commitment')}
              </p>
              <p className="text-[clamp(15px,_1.125vw,_20px)] font-light leading-normal mt-[30px] text-justify" style={{ fontFamily: fontGuide.body.secondary }}>
                {t('values.join')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-100">
        <div className={`${styles.container} mx-auto`}>
          <h2
            className="font-['glitten-standard'] text-5xl font-bold mb-16"
            style={{
              color: '#0E1A28',
              paddingBottom: '18px',
              borderBottom: '1px solid #0E1A28',
              overflow: 'hidden',
            }}
          >{t('services.title')}</h2>
          <div className="flex justify-between gap-[clamp(20px,_2vw,_97px)] flex-col ml:flex-row">
            {[
              { key: 'financial', image: "/assets/images/service1.png" },
              { key: 'accounting', image: "/assets/images/service2.png" },
              { key: 'backoffice', image: "/assets/images/service3.png" },
            ].map((service) => (
              <div key={service.key} className="relative w-full h-[300px] ml:w-[30%] ml:h-[600px] rounded-2xl overflow-hidden shadow-lg">
                <Image src={service.image} alt={t(`services.${service.key}`)} layout="fill" objectFit="cover" />
                <div 
                  className="absolute inset-0 flex items-center justify-center p-8"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(60,101,133,.45) 16%, rgba(186,129,97,.45) 64%, rgba(225,147,180,.45) 100%)',
                  }}
                >
                  <div className="w-[300px] max-w-full bg-white rounded-2xl text-center px-[clamp(1rem,_2vw,_3rem)] py-6">
                    <h3 className="text-[#53758F] text-[clamp(14px,_1.4vw,_20px)] leading-6 whitespace-nowrap ml:whitespace-pre-line" style={{ fontFamily: fontGuide.headings.h3.en }}>{t(`services.${service.key}`)}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 text-white overflow-hidden" style={{ backgroundColor: '#53758F' }}>
        <div className="w-full mx-auto px-4">
          <h2 className="font-['glitten-standard'] text-5xl font-bold mb-[86px] text-center">{t('testimonials.title')}</h2>
          <div className="relative -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                watchDrag: true,
                containScroll: false,
                dragFree: true,
                startIndex: 1
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-[clamp(50px,_10vw,_113px)]" style={{fontFamily: fontGuide.body.primary}}>
                {[1, 2, 3].map((i) => (
                  <CarouselItem key={i} className="max-w-[658px] max-md:max-w-[90vw] pl-[clamp(20px,_5vw,_113px)] basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2 xl:basis-[35%] transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-2xl h-full shadow-lg mx-2 transition-all duration-300 hover:shadow-xl select-none" style={{color: '#0E1A28'}}>
                      <p className="font-bold text-[clamp(26px,_1.75vw,_32px)] leading-[1.155]" style={{fontFamily: fontGuide.headings.h3[i18n.language as 'en' | 'sr']}}>
                        {t(`testimonials.testimonial${i}.name`)}
                      </p>
                      <p className="text-[#53758F] text-[clamp(15px,_1.125vw,_20px)] leading-[1.155] mt-2" style={{fontFamily: fontGuide.body.primary}}>
                        {t(`testimonials.testimonial${i}.position`)}
                      </p>
                      <p className="text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal mt-6" style={{fontFamily: fontGuide.body.secondary}}>
                        {t(`testimonials.testimonial${i}.description`)}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots />
            </Carousel>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="aboutus" className="py-[clamp(50px,_2vw,_154px)] scroll-mt-12">
        <div className={`${styles.container} mx-auto`}>
          <h2 className={`font-['glitten-standard'] text-[50px] leading-none text-[#0E1A28] font-bold mb-[127px] pb-[18px] border-b-[1px] border-[#0E1A28]`}>{t('about.title')}</h2>
          <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-5 max-xs:grid-cols-[repeat(14,minmax(0,1fr))] max-xs:grid-rows-7 gap-x-6 md:grid-rows-3 [&>*]:min-w-0">
            <h3 className={`w-[clamp(300px,_90vw,_658px)] text-[clamp(53px,_5.625vw,_94px)] leading-[.9] col-span-full md:col-span-8 row-span-1`}>{t('about.description')}</h3>
            <div className="row-start-2 row-span-2 col-start-2 col-span-8 max-xs:-col-end-2 max-xs:self-center md:col-span-6 pt-[clamp(32px,_10vw,_128px)]">
              <p className="w-full md:w-[clamp(150px,_25vw,_429px)] max-w-full mb-6 text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: fontGuide.body.secondary}}>
                {parse(t('about.founder'))}
              </p>
              <p className="w-full md:w-[clamp(150px,_25vw,_429px)] max-w-full mb-6 text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: fontGuide.body.secondary}}>
                {parse(t('about.founderDescription'))}
              </p>
            </div>
            <div className="row-start-2 row-span-2 col-start-10 col-span-8 max-xs:row-start-4 max-xs:col-start-2 max-xs:-col-end-2 md:col-span-6 md:pt-[clamp(74px,_20vw,_296px)]">
              <p className="w-full md:w-[clamp(150px,_25vw,_434px)] mb-6 text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: fontGuide.body.secondary}}>
                {parse(t('about.founderDescription2'))}
              </p>
              <p className="w-full md:w-[clamp(150px,_25vw,_434px)] text-[#0E1A28] text-[clamp(15px,_1.125vw,_20px)] leading-normal text-justify" style={{fontFamily: fontGuide.body.secondary}}>
                {parse(t('about.founderDescription3'))}
              </p>
            </div>
            <div className="relative flex flex-row max-xs:flex-col-reverse max-xs:self-center md:flex-col row-start-4 row-span-2 max-xs:row-start-6 md:row-start-1 md:row-span-3 col-start-2 col-end-auto md:col-start-15 md:col-span-5 self-end h-[80%] xl:h-full max-md:h-[500px] max-md:w-[80vw] md:max-w-[407px]">
              <div className="relative grow-[.9] md:grow-[.8] max-h-[696px] max-md:min-w-48 rounded-[27px] overflow-hidden bg-[#53758F]">
                <Image 
                  src="/assets/images/founder@2x.png"
                  alt="Founder and CEO"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  priority
                  style={{ objectPosition: 'center 10%' }}
                /> 
              </div>
              <div className="flex flex-col justify-end relative bottom-0 left-0 bg-white p-6 text-center whitespace-nowrap">
                <p className="text-[clamp(14px,_1.7vw,_24px)] leading-5" style={{fontFamily: fontGuide.body.secondary}}>{parse(t('about.founderName'))}</p>
                <p className={`font-['glitten-standard'] text-[#0E1A28] text-[clamp(26px,_3vw,_50px)]`}>{parse(t('about.founderPosition'))}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="pt-12 pb-24 ml:py-24 text-[#0E1A28]">
        <div className={`${styles.container} mx-auto text-center`}>
          <p className="text-[clamp(18px,_1.4vw,_24px)] font-light leading-[1.8] mx-auto mb-[35px]" style={{fontFamily: fontGuide.body.secondary}}>{parse(t('trust.description'))}</p>
          <h2
            className="text-[clamp(85px,_6.5vw,_116px)] font-bold mt-9 mb-6 leading-none max-xs:break-words"
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
            {parse(t('trust.title'))}
          </h2>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contactus" className="py-24 bg-cover bg-center" style={{backgroundImage: "url('/assets/images/contact-bg.png')"}}>
        <div className={`${styles.container} mx-auto`}>
          <div className="flex justify-between bg-white w-full mx-auto py-[97px] px-[clamp(14px,_2.5vw,_86px)] rounded-[27px] shadow-xl flex-col ml:flex-row ml:max-w-[1621px]">
            <div className="max-w-full ml:max-w-[clamp(300px,_30vw,_538px)]">
              <div className="mb-[76px]">
                <h2 className={`text-[50px] leading-none text-[#0E1A28] font-bold pb-[18px]`}>{t('contact.title')}</h2>
                <p className="text-xl mb-8" style={{ fontFamily: fontGuide.body.secondary }}>{parse(t('contact.description'))}</p>
              </div>
              <div className="mb-[53px]">
                <h3 className="text-[50px] font-bold leading-none mb-5">{parse(t('contact.address.title'))}</h3>
                <p className="" style={{fontFamily: fontGuide.body.secondary}}>{parse(t('contact.address.description'))}</p>
              </div>
              <div>
                <h3 className="text-[50px] font-bold leading-none mb-5">{parse(t('contact.phone.title'))}</h3>
                <p className="" style={{fontFamily: fontGuide.body.secondary}}>{parse(t('contact.phone.description'))}</p>
              </div>
            </div>
            <div className="w-full ml:w-1/2 ml:max-w-[772px] mt-[53px] ml:mb-0" style={{fontFamily: fontGuide.body.secondary}}>
              <form 
                onSubmit={handleSubmit} 
                className="space-y-[28px]"
              >
                <div className="space-y-[28px]">
                  <div className="space-y-[28px]">
                    <label className="block text-xl">{parse(t('contact.form.name'))}</label>
                    <label className="sr-only" htmlFor="name-input">
                      {parse(t('contact.form.name'))}
                    </label>
                    <Input 
                      id="name-input"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full h-12 mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-[28px]">
                    <label className="block text-xl">{parse(t('contact.form.email'))}</label>
                    <label className="sr-only" htmlFor="email-input">
                      {parse(t('contact.form.email'))}
                    </label>
                    <Input 
                      id="email-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-12 mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-[28px]">
                    <label className="block text-xl">{parse(t('contact.form.message'))}</label>
                    <label className="sr-only" htmlFor="message-input">
                      {parse(t('contact.form.message'))}
                    </label>
                    <Textarea 
                      id="message-input"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[150px] mt-[15px] bg-[#F7F7F7] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      aria-required="true"
                    />
                  </div>
                </div>
                {submitStatus.message && (
                  <div className={`text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {parse(submitStatus.message)}
                  </div>
                )}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-black hover:bg-black/90 text-white text-lg font-medium disabled:opacity-50"
                >
                  {isSubmitting ? parse(t('contact.form.submitting')) : parse(t('contact.form.submit'))}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-4">
        <div className={`${styles.container} flex items-center justify-between max-w-[940px] w-full text-[13px] leading-5 mx-auto text-center ${inter.className}`}>
          <p>{parse(t('footer.copyright'))}</p>
          <p>
            {parse((t('footer.info') as string).replace(
              'NTSH',
              '<a href="https://ntsh.studio/" target="_blank" rel="noopener noreferrer" class="hover:text-gray-300 transition-colors">NTSH</a>'
            ))}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function AversFinancial() {
  return (
    <I18nextProvider i18n={i18n}>
      <AversFinancialContent />
    </I18nextProvider>
  );
}