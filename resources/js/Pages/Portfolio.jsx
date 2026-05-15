import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "./Layout";
import { usePage } from '@inertiajs/react';
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CountUp from 'react-countup';

export default function Portfolio() {
    const [about, setAbout] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [news, setNews] = useState([]);
    const [contact, setContact] = useState(null);
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);
    
    useEffect(() => {
        axios.get('/api/about').then(res => setAbout(res.data));
        axios.get('/api/skills').then(res => setSkills(res.data));
        axios.get('/api/projects').then(res => setProjects(res.data));
        axios.get('/api/experiences').then(res => setExperiences(res.data));
        axios.get('/api/news').then(res => setNews(res.data));
        axios.get('/api/contact').then(res => setContact(res.data));
        axios.get('/api/services').then(res => setServices(res.data));
        axios.get('/api/testimonials').then(res => setTestimonials(res.data));
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        const formData = new FormData(e.target);
        axios.post('/api/messages', {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        })
        .then(() => {
            setSuccessMessage(translations?.message_sent || 'Message sent successfully!');
            e.target.reset();
            setSending(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch(() => {
            setSending(false);
            alert('Error sending message.');
        });
    };

    const { translations } = usePage().props;

    return (
        <Layout>
            {/* HERO */}
            <section id="home" className="relative min-h-screen flex items-center bg-[#0b1120] px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#020617]" />
                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
                    <div>
                        <div className="text-green-400 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            {translations?.available || 'Available for Projects'}
                        </div>
                        <h1 className="text-5xl font-bold text-white">
                            {translations?.hello || "Hi, I'm"}{" "}
                            <span className="text-cyan-400">{about?.name || 'Developer'}</span>
                        </h1>
                        <h2 className="text-2xl text-gray-300 mt-3">{translations?.full_stack || about?.title || 'Full Stack Developer'}</h2>
                        <p className="text-gray-400 mt-6 max-w-xl">{about?.description}</p>
                        <div className="mt-8 flex gap-4">
                            <a href="#projects" className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition">
                                {translations?.view_work || 'View My Work'}
                            </a>
                            <a href="#contact" className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition">
                                {translations?.get_in_touch || 'Get In Touch'}
                            </a>
                        </div>
                        <div className="mt-4">
                            <a href="/resume.pdf" download className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {translations?.download_resume || 'Download Resume'}
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-gray-400">{translations?.projects || 'Projects'} Completed</p>
                            <h3 className="text-4xl text-cyan-400 font-bold">
                                <CountUp end={about?.projects_done || 0} duration={2.5} suffix="+" />
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-gray-400 text-sm">{translations?.clients || 'Clients'}</p>
                                <h3 className="text-2xl text-white font-bold">{about?.happy_clients || '0'}+</h3>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-gray-400 text-sm">{translations?.experience || 'Experience'}</p>
                                <h3 className="text-2xl text-white font-bold">{about?.years_experience || '0'}+ Yr</h3>
                            </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-gray-400">{translations?.technologies || 'Technologies'}</p>
                            <h3 className="text-2xl text-white font-bold">{about?.technologies_count || '0'}</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 overflow-hidden">
                <div className="max-w-7xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                        {translations?.about || 'About Me'}
                    </h2>
                    {about ? (
                        <div className="grid md:grid-cols-2 gap-14 items-center">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition"></div>
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                                    {about.image ? (
                                        <img src={about.image} alt="About" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                                            {about.name?.split(' ').map(n => n[0]).join('') || 'DEV'}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-5xl font-bold mt-4 mb-6 text-gray-900 dark:text-white leading-tight">{about.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">{about.description}</p>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        ['years_experience', translations?.years_exp || 'Years Experience'],
                                        ['projects_done', translations?.projects_done || 'Projects Done'],
                                        ['happy_clients', translations?.happy_clients || 'Happy Clients'],
                                        ['technologies_count', translations?.tech_count || 'Technologies']
                                    ].map(([key, label]) => (
                                        <div key={key} className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 hover:-translate-y-1 transition">
                                            <h4 className="text-4xl font-bold text-indigo-600 mb-2">
                                                <CountUp end={about[key]} duration={2} suffix="+" />
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10">
                                    <a href="#contact" className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-lg transition">
                                        {translations?.lets_work || "Let's Work Together"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : <div className="text-center text-gray-500 py-10">{translations?.loading || 'Loading...'}</div>}
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="py-20 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                        {translations?.what_i_do || 'What I Do'}
                    </h2>
                    {services.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <motion.div key={service.id} whileHover={{ y: -8 }} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-100 dark:border-gray-700">
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6">
                                        <span className="text-3xl">{service.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : <div className="text-center text-gray-500 py-10">{translations?.loading || 'Loading...'}</div>}
                </div>
            </section>

            {/* SKILLS */}
            <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-6xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                        {translations?.skills || 'My Skills'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {skills.length > 0 ? skills.map(skill => (
                            <motion.div key={skill.id} whileHover={{ y: -5 }} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-gray-700 text-center">
                                <span className="text-4xl mb-3 block">{skill.icon}</span>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full" style={{width:`${skill.percentage}%`}}></div>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">{skill.percentage}%</span>
                            </motion.div>
                        )) : <div className="col-span-full text-center text-gray-500 py-10">{translations?.loading || 'Loading...'}</div>}
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                        {translations?.projects || 'My Projects'}
                    </h2>
                    {projects.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-3 gap-8">
                                {projects.map(project => (
                                    <motion.div key={project.id} whileHover={{ y: -8 }} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                                        <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                            {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <span className="text-white text-4xl">🚀</span>}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-xl mb-2">
                                                <a href={`/projects/${project.id}`} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">{project.title}</a>
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                                            <div className="flex gap-2 flex-wrap mb-4">
                                                {project.technologies?.map(tech => <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">{tech}</span>)}
                                            </div>
                                            <div className="flex gap-3">
                                                <a href={`/projects/${project.id}`} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm">
                                                    {translations?.view_details || 'View Details'} →
                                                </a>
                                                {project.url && <a href={project.url} target="_blank" className="text-indigo-600 font-medium hover:underline text-sm">{translations?.live_demo || 'Live Demo'} →</a>}
                                                {project.github_url && <a href={project.github_url} target="_blank" className="text-gray-600 font-medium hover:underline text-sm">GitHub →</a>}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <a href="/projects" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition inline-block">
                                    {translations?.view_all_projects || 'View All Projects'} →
                                </a>
                            </div>
                        </>
                    ) : (<div className="text-center text-gray-500 py-10">{translations?.loading || 'Loading...'}</div>)}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-5xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                        {translations?.testimonials || 'What Clients Say'}
                    </h2>
                    {testimonials.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {testimonials.map((t) => (
                                <motion.div key={t.id} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, j) => <span key={j}>⭐</span>)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        {t.image ? (
                                            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300" />
                                        ) : (
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">{t.name[0]}</div>
                                        )}
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                                            <p className="text-sm text-gray-500">{t.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : <div className="text-center text-gray-500 py-10">{translations?.loading || 'Loading...'}</div>}
                </div>
            </section>

            {/* NEWS */}
            <section id="news" className="py-20 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                        {translations?.news || 'Latest News'}
                    </h2>
                    {news.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-3 gap-8">
                                {news.map(item => (
                                    <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                                        <div className="h-40 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                            {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : <span className="text-white text-3xl">📰</span>}
                                        </div>
                                        <div className="p-6">
                                            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">{item.category}</span>
                                            <h3 className="font-bold text-lg mt-3 mb-2">
                                                <a href={`/news/${item.slug}`} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">{item.title}</a>
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.excerpt}</p>
                                            <span className="text-xs text-gray-400">{new Date(item.published_at).toLocaleDateString()}</span>
                                            <div className="mt-4">
                                                <a
                                                    href={`/news/${item.slug}`}
                                                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                                >
                                                    <span>Read More</span>
                                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <a href="/news" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition inline-block">
                                    {translations?.view_all_news || 'View All News'} →
                                </a>
                            </div>
                        </>
                    ) : <div className="text-center text-gray-500 py-10">{translations?.loading || 'Loading...'}</div>}
                </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="py-24 px-4 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {translations?.experience || 'Work Experience'}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {experiences.map((exp, index) => (
                            <motion.div key={exp.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg mb-6">💼</div>
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">{exp.duration}</span>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">{exp.title}</h3>
                                <p className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">{exp.company}</p>
                                <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-24 px-4 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto" data-aos="fade-up">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
                            {translations?.get_in_touch || "Let's Build Something Great"}
                        </h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="relative">
                            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-10 shadow-2xl">
                                <h3 className="text-3xl font-bold mb-6">{translations?.get_in_touch || 'Get In Touch'}</h3>
                                <div className="space-y-5">
                                    {contact ? (
                                        <>
                                            <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaEnvelope /></div><div><h4 className="font-semibold">{translations?.email || 'Email'}</h4><p className="text-white/80 text-sm">{contact.email}</p></div></div>
                                            <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaPhoneAlt /></div><div><h4 className="font-semibold">{translations?.phone || 'Phone'}</h4><p className="text-white/80 text-sm">{contact.phone}</p></div></div>
                                            <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaMapMarkerAlt /></div><div><h4 className="font-semibold">{translations?.location || 'Location'}</h4><p className="text-white/80 text-sm">{contact.location}</p></div></div>
                                        </>
                                    ) : <p>{translations?.loading || 'Loading...'}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-10 shadow-xl">
                            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{translations?.send_message || 'Send Message'}</h3>
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <input type="text" name="name" placeholder={translations?.your_name || 'Your Name'} required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none" />
                                <input type="email" name="email" placeholder={translations?.your_email || 'Your Email'} required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none" />
                                <textarea name="message" rows="6" placeholder={translations?.your_message || 'Your Message'} required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none"></textarea>
                                <button type="submit" className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition shadow-lg">
                                    {sending ? (translations?.sending || 'Sending...') : (translations?.send_message || 'Send Message')}
                                </button>
                                {successMessage && <div className="text-green-600 text-center font-medium">{successMessage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}