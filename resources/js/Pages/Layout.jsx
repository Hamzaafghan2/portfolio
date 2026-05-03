

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';


export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollTop, setScrollTop] = useState(false);
    const [about, setAbout] = useState(null);
    const [contact, setContact] = useState(null);
    const { translations, locale } = usePage().props;
    const [langOpen, setLangOpen] = useState(false);
    

    useEffect(() => {
        axios.get('/api/about').then(res => setAbout(res.data));
        axios.get('/api/contact').then(res => setContact(res.data));
    }, []);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    useEffect(() => {
        const handleScroll = () => setScrollTop(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
    const rtlLanguages = ['fa', 'ps'];
    if (rtlLanguages.includes(locale)) {
        document.documentElement.dir = 'rtl';
        document.documentElement.classList.add('rtl');
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.classList.remove('rtl');
    }
}, [locale]);

    const toggleDark = () => setDarkMode(!darkMode);
    const isHomePage = window.location.pathname === '/';



    // const navItems = [
    //     { key: 'home', label: translations?.home || 'Home' },
    //     { key: 'about', label: translations?.about || 'About' },
    //     { key: 'services', label: translations?.services || 'Services' },
    //     { key: 'skills', label: translations?.skills || 'Skills' },
    //     { key: 'projects', label: translations?.projects || 'Projects' },
    //     { key: 'news', label: translations?.news || 'News' },
    //     { key: 'testimonials', label: translations?.testimonials || 'Testimonials' },
    //     { key: 'experience', label: translations?.experience || 'Experience' },
    //     { key: 'contact', label: translations?.contact || 'Contact' },
    // ];

    const navItems = [
    { key: 'home', path: '/', label: translations?.home || 'Home' },
    { key: 'about', path: '/about', label: translations?.about || 'About' },
    { key: 'services', path: '/services', label: translations?.services || 'Services' },
    { key: 'skills', path: '/skills', label: translations?.skills || 'Skills' },
    { key: 'projects', path: '/projects', label: translations?.projects || 'Projects' },
    { key: 'news', path: '/news', label: translations?.news || 'News' },
    { key: 'testimonials', path: '/testimonials', label: translations?.testimonials || 'Testimonials' },
    { key: 'experience', path: '/experience', label: translations?.experience || 'Experience' },
    { key: 'contact', path: '/contact', label: translations?.contact || 'Contact' },
];

    return (
        <>
            <Head title="Mujeeburahman Hamza | Portfolio" />
            <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>

                <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                        <a href="/" className="flex items-center">
                            {about?.logo ? (
                                <img
                                    src={about.logo}
                                    alt="Logo"
                                    className="h-auto max-h-12 object-contain"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                                    <span className="text-white text-lg font-bold tracking-wide">
                                        MH
                                    </span>
                                </div>
                            )}
                        </a>


                       <div className="hidden md:flex items-center gap-6">
    {navItems.map((item) => (
        <a key={item.key} href={item.path}
            className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-sm transition">
            {item.label}
        </a>
    ))}

    {/* Language Switcher */}

                <div className="relative border-r border-gray-300 dark:border-gray-700 pr-4 mr-2">
                <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    🌐
                    <span>
                        {locale === "en"
                            ? "EN"
                            : locale === "fa"
                                ? "دری"
                                : locale === "ps"
                                    ? "پښتو"
                                    : "Language"}
                    </span>
                    <span className={`transition ${langOpen ? "rotate-180" : ""}`}>⌄</span>
                </button>

                {langOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">

                        <a
                            href="/language/en"
                            className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition ${locale === "en" ? "bg-indigo-600 text-white" : "text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            🇬🇧 English
                        </a>

                        <a
                            href="/language/fa"
                            className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition ${locale === "fa" ? "bg-indigo-600 text-white" : "text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            🇦🇫 دری
                        </a>

                        <a
                            href="/language/ps"
                            className={`block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition ${locale === "ps" ? "bg-indigo-600 text-white" : "text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            🇦🇫 پښتو
                        </a>

                    </div>
                )}
           </div>
   

    <button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-xl">
        {darkMode ? '☀️' : '🌙'}
    </button>
</div>

                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-2xl">
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>


                    {menuOpen && (
    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
                <a key={item.key} href={item.path} onClick={() => setMenuOpen(false)}
                    className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition py-2">
                    {item.label}
                </a>
            ))}

           <div className="flex gap-2 py-2">
                <a href="/language/en" onClick={(e) => { e.preventDefault(); window.location.href = '/language/en'; setMenuOpen(false); }}
                    className="px-3 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800">🇬🇧 EN</a>
                <a href="/language/fa" onClick={(e) => { e.preventDefault(); window.location.href = '/language/fa'; setMenuOpen(false); }}
                    className="px-3 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800">🇦🇫 دری</a>
                <a href="/language/ps" onClick={(e) => { e.preventDefault(); window.location.href = '/language/ps'; setMenuOpen(false); }}
                    className="px-3 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800">🇦🇫 پښتو</a>
            </div> 
                
        </div>
    </div>
)}
                </nav>

                <main className="pt-16">{children}</main>

                <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <div className="grid md:grid-cols-4 gap-10">
                            <div>
                                {/* <h3 className="text-2xl font-bold text-white mb-4">
                                {about?.name?.split(' ').pop() || 'DEV'}<span className="text-indigo-500">.</span>
                            </h3> */}

                                {/* Logo */}
                                <a href="/" className="block">
                                    {about?.logo ? (
                                        <img
                                            src={about.logo}
                                            alt="Logo"
                                            className="h-auto max-h-12 object-contain"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                                            <span className="text-white text-lg font-bold">
                                                MH
                                            </span>
                                        </div>
                                    )}
                                </a>

                                {/* Name */}
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        {about?.name || "My Portfolio"}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-2">Full Stack Developer</p>
                                </div>



                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="/#home" className="hover:text-indigo-400 transition">{translations?.home || 'Home'}</a></li>
                                    <li><a href="/#about" className="hover:text-indigo-400 transition">{translations?.about || 'About'}</a></li>
                                    <li><a href="/#services" className="hover:text-indigo-400 transition">{translations?.services || 'Services'}</a></li>
                                    <li><a href="/#projects" className="hover:text-indigo-400 transition">{translations?.projects || 'Projects'}</a></li>
                                    <li><a href="/#news" className="hover:text-indigo-400 transition">{translations?.news || 'News'}</a></li>
                                    <li><a href="/#testimonials" className="hover:text-indigo-400 transition">{translations?.testimonials || 'Testimonials'}</a></li>
                                    <li><a href="/#contact" className="hover:text-indigo-400 transition">{translations?.contact || 'Contact'}</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">{translations?.services || 'Services'}</h4>
                                <ul className="space-y-3 text-sm text-gray-400">
                                    <li>Website Development</li>
                                    <li>Laravel Backend</li>
                                    <li>React Frontend</li>
                                    <li>API Integration</li>
                                    <li>Database Design</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">{translations?.contact || 'Contact Info'}</h4>
                                {contact && (
                                    <ul className="space-y-4 text-sm text-gray-400">
                                        <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-indigo-500" /><span>{contact.location}</span></li>
                                        <li className="flex items-center gap-3"><FaEnvelope className="text-indigo-500" /><span>{contact.email}</span></li>
                                        <li className="flex items-center gap-3"><FaPhoneAlt className="text-indigo-500" /><span>{contact.phone}</span></li>
                                    </ul>
                                )}
                                <div className="flex gap-4 mt-5">
                                    {contact?.github_url && <a href={contact.github_url} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"><FaGithub /></a>}
                                    {contact?.linkedin_url && <a href={contact.linkedin_url} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"><FaLinkedin /></a>}
                                    {contact?.twitter_url && <a href={contact.twitter_url} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"><FaXTwitter /></a>}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                            <p>© {new Date().getFullYear()} {about?.name || 'Developer'}. All rights reserved.</p>
                            <p>Designed & Developed with ❤️</p>
                        </div>
                    </div>
                </footer>
            </div>
        {scrollTop && (
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition z-50 animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        )}

                </>
        
    );
}