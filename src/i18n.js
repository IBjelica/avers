import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Get initial language from URL or localStorage, fallback to 'en'
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    // Check URL first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['en', 'sr'].includes(langParam)) {
      localStorage.setItem('language', langParam);
      return langParam;
    }
    
    // Check localStorage
    const storedLang = localStorage.getItem('language');
    if (storedLang && ['en', 'sr'].includes(storedLang)) {
      return storedLang;
    }
  }
  return 'en';
};

const resources = {
  en: {
    translation: {
      menu: {
        home: 'HOME',
        ourvalues: 'OUR VALUES',
        services: 'SERVICES',
        aboutus: 'ABOUT US',
        contactus: 'CONTACT US'
      },
      hero: {
        title: 'Welcome to Progress',
        subtitle: 'Your Trusted Partner in Financial Growth'
      },
      values: {
        title: 'EMPOWERING YOUR FINANCIAL SUCCESS',
        mission: 'At AVERS Financial Consultancy and Accounting, our mission is crystal clear: we\'re here to enhance financial efficiency, ensure unwavering compliance, and ignite financial growth for our valued clients.',
        commitment: 'Our commitment extends to cost reduction, risk management, and the cultivation of innovation through our personalised, trustworthy solutions. Focusing on education and empowerment, we tailor our services to match your distinctive needs. Your success is our paramount objective, and we pledge steadfast integrity in every facet of our work.',
        join: 'Join us on the path toward financial prosperity and security.'
      },
      services: {
        title: 'OUR SERVICES',
        financial: 'FINANCIAL CONSULTING',
        accounting: 'ACCOUNTING AND BOOKKEEPING',
        backoffice: 'BACK OFFICE'
      },
      testimonials: {
        title: 'WHAT OUR CLIENTS SAY ABOUT US',
        name: 'Hannah Schmitt',
        position: 'CEO at TechCorp',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.'
      },
      about: {
        title: 'ABOUT US',
        description: 'YOUR GUIDE TO FINANCIAL EXCELLENCE',
        founder: 'With a dynamic blend of 25 years of financial wisdom and a personal mission to drive business success, Samira isn\'t just the founder and CEO of Avers — she\'s a <b>transformative force in financial consulting.</b>',
        founderDescription: 'Her approach combines deep market insight, personalised strategies and a wealth of knowledge, making Avers synonymous with an unparalleled commitment to client success.',
        founderDescription2: 'With a <b>foundation built on trust, innovation and an unwavering dedication to achieving financial excellence,</b> Samira and her team at Avers are not just advisors, but partners in your journey to excellence.',
        founderDescription3: 'Their wealth of experience and passion for finance shines through in every endeavour, ensuring that your business is not only prepared for the future, but also ready to thrive in it.',
        founderName: 'Founder and CEO',
        founderPosition: 'Samira Bjelica'
      },
      trust: {
        description: 'UNVEILING OPPORTUNITY, NAVIGATING PROSPERITY, AND ENSURING PEACE OF MIND.',
        title: 'YOUR TRUST, OUR COMMITMENT'
      },
      contact: {
        title: 'LET\'S TALK',
        description: 'Have some big idea or brand to develop and need help? Then reach out we\'d love to hear about your project and provide help',
        address: {
          title: 'ADDRESS',
          description: 'dr Dragoslava Popovića 14, lokal 12<br/>Belgrade, Serbia'
        },
        phone: {
          title: 'PHONE NUMBER',
          description: '+1 234 567 8901'
        },
        form: {
          name: 'Name',
          email: 'Email',
          message: 'Message',
          submitting: 'Sending...',
          submit: 'Submit'
        }
      },
      footer: {
        copyright: 'Copyright | Information',
        info: 'Designed and developed by NTSH exclusively for Avers.'
      }
    }
  },
  sr: {
    translation: {
      menu: {
        home: 'POČETNA',
        ourvalues: 'NAŠE VREDNOSTI',
        services: 'USLUGE',
        aboutus: 'O NAMA',
        contactus: 'KONTAKT'
      },
      hero: {
        title: 'Dobrodošli u Progres',
        subtitle: 'Vaš pouzdan partner u finansijskom rastu'
      },
      values: {
        title: 'OSNAŽIVANJE VAŠEG FINANSIJSKOG USPEHA',
        mission: 'U AVERS Finansijskom konsaltingu i računovodstvu, naša misija je kristalno jasna: tu smo da poboljšamo finansijsku efikasnost, osiguramo besprekornu usklađenost i podstaknemo finansijski rast naših cenjenata.',
        commitment: '',
        join: 'Uvek na potezu, da vam pruzimo najbolje usluge, da vam pomognemo da ostanete u finansijskom rastu i da dobijete najbolje rezultate.'
      },
      services: {
        title: 'NAŠE USLUGE',
        financial: 'FINANSIJSKI KONSALTING',
        accounting: 'RAČUNOVODSTVO I KNJIGOVODSTVO',
        backoffice: 'BACK OFFICE'
      },
      testimonials: {
        title: 'ŠTA NAŠI KLIJENTI KAŽU O NAMA',
        name: 'Hannah Schmitt',
        position: 'CEO u TechCorp',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.'
      },
      about: {
        title: 'O NAMA',
        description: 'VAŠ VODIČ KA FINANSIJSKOJ IZVRSNOSTI',
        founder: 'Sa dinamičnom kombinacijom od 25 godina finansijske mudrosti i ličnom misijom da pokrene poslovni uspeh, Samira nije samo osnivač i CEO Aversa — ona je <b>transformativna sila u finansijskom konsaltingu.</b>',
        founderDescription: 'Njen pristup kombinuje duboko razumevanje tržišta, personalizovane strategije i bogatstvo znanja, čineći Avers sinonimom za nenadmašnu posvećenost uspehu klijenata.',
        founderDescription2: 'Sa temeljem izgrađenim na poverenju, inovacijama i nepokolebljivoj posvećenosti postizanju finansijske izvrsnosti, Samira i njen tim u Aversu nisu samo savetnici, već partneri na vašem putu ka izvrsnosti.',
        founderDescription3: 'Njihovo bogato iskustvo i strast prema finansijama sijaju kroz svaki poduhvat, osiguravajući da vaše poslovanje nije samo pripremljeno za budućnost, već i spremno da u njoj napreduje.',
        founderName: 'Osnivač i CEO',
        founderPosition: 'Samira Bjelica'
      },
      trust: {
        description: 'OTKRIVANJE PRILIKA, NAVIGACIJA PROSPERITETA I OSIGURANJE MIRA UMA.',
        title: 'VAŠE POVERENJE, NAŠA POSVEĆENOST'
      },
      contact: {
        title: 'RAZGOVARAJMO',
        description: 'Imate veliku ideju ili brend za razvoj i potrebna vam je pomoć? Javite nam se, voleli bismo da čujemo o vašem projektu i pružimo pomoć',
        address: {
          title: 'ADRESA',
          description: 'dr Dragoslava Popovića 14, lokal 12<br/>Beograd, Srbija'
        },
        phone: {
          title: 'BROJ TELEFONA',
          description: '+1 234 567 8901'
        },
        form: {
          name: 'Ime',
          email: 'Email',
          message: 'Poruka',
          submitting: 'Slanje...',
          submit: 'Pošalji'
        }
      },
      footer: {
        copyright: 'Autorska prava | Informacije',
        info: 'Dizajnirao i razvio NTSH ekskluzivno za Avers.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(), // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;