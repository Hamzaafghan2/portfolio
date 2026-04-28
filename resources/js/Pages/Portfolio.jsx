
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "./Layout";
import { usePage } from '@inertiajs/react';
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LoadingScreen from '../Components/LoadingScreen';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);
        useEffect(() => {
         setTimeout(() => setLoading(false), 1500);
        }, []);
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
        <>  <LoadingScreen isLoading={loading} />
        {!loading && (
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
                            {/* <h3 className="text-4xl text-cyan-400 font-bold">{about?.projects_done || '0'}+</h3> */}
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
                                            {/* <h4 className="text-4xl font-bold text-indigo-600 mb-2">{about[key]}+</h4> */}
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
                     {/* View All Button — ADD IT HERE 👇 */}
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
             )}
        </>
    );
}

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Layout from "./Layout";
// import { usePage } from '@inertiajs/react';


// import {
//   FaGithub,
//   FaLinkedin,
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaPhoneAlt
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// export default function Portfolio() {
//     const [about, setAbout] = useState(null);
//     const [skills, setSkills] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [experiences, setExperiences] = useState([]);
//     const [services, setServices] = useState([]);
//     const [testimonials, setTestimonials] = useState([]);
//     const [news, setNews] = useState([]);
//     const [contact, setContact] = useState(null);
//     const [sending, setSending] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [hero, setHero] = useState(null);

//     useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

//     useEffect(() => {
//         axios.get('/api/about').then(res => setAbout(res.data));
//         axios.get('/api/skills').then(res => setSkills(res.data));
//         axios.get('/api/projects').then(res => setProjects(res.data));
//         axios.get('/api/experiences').then(res => setExperiences(res.data));
//         axios.get('/api/news').then(res => setNews(res.data));
//         axios.get('/api/contact').then(res => setContact(res.data));
//         axios.get('/api/hero').then(res => setHero(res.data));
//         axios.get('/api/services').then(res => setServices(res.data));
//         axios.get('/api/testimonials').then(res => setTestimonials(res.data));
//     }, []);

//     const handleContactSubmit = (e) => {
//         e.preventDefault();
//         setSending(true);
//         const formData = new FormData(e.target);
//         axios.post('/api/messages', {
//             name: formData.get('name'),
//             email: formData.get('email'),
//             message: formData.get('message'),
//         })
//         .then(() => {
//             setSuccessMessage('Message sent successfully!');
//             e.target.reset();
//             setSending(false);
//             setTimeout(() => setSuccessMessage(''), 3000);
//         })
//         .catch(() => {
//             setSending(false);
//             alert('Error sending message.');
//         });
//     };
//         const { translations, locale } = usePage().props;

//     return (
//         <Layout>
//             {/* HERO */}
//             <section id="home" className="relative min-h-screen flex items-center bg-[#0b1120] px-4 overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#020617]" />
//                 <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
//                     <div>
//                         <div className="text-green-400 mb-4 flex items-center gap-2">
//                             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//                             {hero?.status}
//                         </div>
//                         <h1 className="text-5xl font-bold text-white">
//                             Hi, I'm{" "}<span className="text-cyan-400">{hero?.name}</span>
//                         </h1>
//                         <h2 className="text-2xl text-gray-300 mt-3">{hero?.title}</h2>
//                         <p className="text-gray-400 mt-6 max-w-xl">{hero?.description}</p>
//                         <div className="mt-8 flex gap-4">
//                             <a href="#projects" className="bg-white text-black px-6 py-3 rounded-xl">View Projects</a>
//                             <a href="#contact" className="border border-white/20 text-white px-6 py-3 rounded-xl">Contact</a>
//                         </div>
//                     </div>

//                     <div className="space-y-6">
//                         <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
//                             <p className="text-gray-400">Projects Completed</p>
//                             <h3 className="text-4xl text-cyan-400 font-bold">{hero?.projects_completed}+</h3>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//                                 <p className="text-gray-400 text-sm">Clients</p>
//                                 <h3 className="text-2xl text-white font-bold">{hero?.clients}+</h3>
//                             </div>
//                             <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//                                 <p className="text-gray-400 text-sm">Experience</p>
//                                 <h3 className="text-2xl text-white font-bold">{hero?.experience_years}+ Yr</h3>
//                             </div>
//                         </div>
//                         <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//                             <p className="text-gray-400">Technologies</p>
//                             <h3 className="text-2xl text-white font-bold">{hero?.technologies}</h3>
//                         </div>
//                     </div>
//                     <div className="mt-4">
//     <a href="/resume.pdf" download className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition text-sm">
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//         Download Resume
//     </a>
// </div>
//                 </div>
//             </section>



//             {/* ABOUT */}
//             <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 overflow-hidden">
//                 <div className="max-w-7xl mx-auto" data-aos="fade-up">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">About Me</h2>
//                     {about ? (
//                         <div className="grid md:grid-cols-2 gap-14 items-center">
//                             <div className="relative group">
//                                 <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition"></div>
//                                 <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
//                                     {about.image && <img src={about.image} alt="About" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />}
//                                     <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
//                                     <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-sm font-semibold">Web Developer</div>
//                                     <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20">
//                                         <h4 className="text-white text-xl font-bold mb-2">Building Digital Experiences</h4>
//                                         <p className="text-gray-200 text-sm">Modern websites, responsive UI, and backend solutions with React & Laravel.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div>
//                                 <span className="text-indigo-600 font-semibold uppercase tracking-widest text-sm">Tech & IT Solutions</span>
//                                 <h3 className="text-5xl font-bold mt-4 mb-6 text-gray-900 dark:text-white leading-tight">{about.title}</h3>
//                                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">{about.description}</p>
//                                 <div className="grid grid-cols-2 gap-6">
//                                     {[['years_experience','Years Experience'],['projects_done','Projects Done'],['happy_clients','Happy Clients'],['technologies_count','Technologies']].map(([key,label]) => (
//                                         <div key={key} className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 hover:-translate-y-1 transition">
//                                             <h4 className="text-4xl font-bold text-indigo-600 mb-2">{about[key]}+</h4>
//                                             <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-10">
//                                     <a href="#contact" className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-lg transition">Let's Work Together</a>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : <div className="text-center text-gray-500 py-10">Loading...</div>}
//                 </div>
//             </section>

//                         {/* SERVICES */}
// <section id="services" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
//     <div className="max-w-6xl mx-auto" data-aos="fade-up">
//         <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">What I Do</h2>
//         {services.length > 0 ? (
//             <div className="grid md:grid-cols-3 gap-8">
//                 {services.map((service) => (
//                     <motion.div key={service.id} whileHover={{ y: -8 }} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-100 dark:border-gray-700">
//                         <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6">
//                             <span className="text-3xl">{service.icon}</span>
//                         </div>
//                         <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{service.title}</h3>
//                         <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{service.description}</p>
//                     </motion.div>
//                 ))}
//             </div>
//                     ) : <div className="text-center text-gray-500 py-10">Loading services...</div>}
//                 </div>
//                 </section>

//                         {/* TESTIMONIALS */}
// <section id="testimonials" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
//     <div className="max-w-5xl mx-auto" data-aos="fade-up">
//         <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">What Clients Say</h2>
//         {testimonials.length > 0 ? (
//             <div className="grid md:grid-cols-2 gap-8">
//                 {testimonials.map((t) => (
//                     <motion.div key={t.id} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
//                         <div className="flex gap-1 mb-4">
//                             {[...Array(t.rating)].map((_, j) => <span key={j}>⭐</span>)}
//                         </div>
//                         <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                       
//                          <div className="flex items-center gap-4">
//                 {t.image ? (
//                     <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300" />
//                 ) : (
//                     <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                         {t.name[0]}
//                     </div>
//                 )}
//                 <div>
//                     <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
//                     <p className="text-sm text-gray-500">{t.role}</p>
//                 </div>
//             </div>
//                                 </motion.div>
//                 ))}
//             </div>
//                 ) : <div className="text-center text-gray-500 py-10">Loading testimonials...</div>}
//             </div>
//         </section>



//             {/* SKILLS */}
//             <section id="skills" className="py-20 px-4">
//                 <div className="max-w-6xl mx-auto" data-aos="fade-up">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">My Skills</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                         {skills.map(skill => (
//                             <motion.div key={skill.id} whileHover={{ y: -5 }} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-gray-700 text-center">
//                                 <span className="text-4xl mb-3 block">{skill.icon}</span>
//                                 <h4 className="font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
//                                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full" style={{width:`${skill.percentage}%`}}></div></div>
//                                 <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">{skill.percentage}%</span>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* PROJECTS */}
//             <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
//                 <div className="max-w-6xl mx-auto" data-aos="fade-up">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">My Projects</h2>
//                     <div className="grid md:grid-cols-3 gap-8">
//                         {projects.map(project => (
//                             <motion.div key={project.id} whileHover={{ y: -8 }} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
//                                 <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//                                     {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <span className="text-white text-4xl">🚀</span>}
//                                 </div>
//                                 <div className="p-6">
//                                     <h3 className="font-bold text-xl mb-2">
//                                         <a href={`/projects/${project.id}`} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">{project.title}</a>
//                                     </h3>
//                                     <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
//                                     <div className="flex gap-2 flex-wrap mb-4">
//                                         {project.technologies?.map(tech => <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">{tech}</span>)}
//                                     </div>
//                                     <div className="flex gap-3">
//                                         <a href={`/projects/${project.id}`} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm">View Details →</a>
//                                         {project.url && <a href={project.url} target="_blank" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm">Live Demo →</a>}
//                                         {project.github_url && <a href={project.github_url} target="_blank" className="text-gray-600 dark:text-gray-400 font-medium hover:underline text-sm">GitHub →</a>}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* NEWS */}
//             <section id="news" className="py-20 px-4">
//                 <div className="max-w-6xl mx-auto" data-aos="fade-up">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Latest News</h2>
//                     {news.length > 0 ? (
//                         <>
//                             <div className="grid md:grid-cols-3 gap-8">
//                                 {news.map(item => (
//                                     <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
//                                         <div className="h-40 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
//                                             {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : <span className="text-white text-3xl">📰</span>}
//                                         </div>
//                                         <div className="p-6">
//                                             <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">{item.category}</span>
//                                             <h3 className="font-bold text-lg mt-3 mb-2">
//                                                 <a href={`/news/${item.slug}`} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">{item.title}</a>
//                                             </h3>
//                                             <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.excerpt}</p>
//                                             <span className="text-xs text-gray-400">{new Date(item.published_at).toLocaleDateString()}</span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="text-center mt-10">
//                                 <a href="/news" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition inline-block">View All News →</a>
//                             </div>
//                         </>
//                     ) : <div className="text-center text-gray-500 py-10">Loading news...</div>}
//                 </div>
//             </section>

//             {/* EXPERIENCE */}
//             <section id="experience" className="py-24 px-4 bg-white dark:bg-gray-950 relative overflow-hidden">
//                 <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>
//                 <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/10 blur-3xl rounded-full"></div>
//                 <div className="max-w-6xl mx-auto relative z-10">
//                     <div className="text-center mb-20" data-aos="fade-up">
//                         <span className="text-indigo-600 font-semibold tracking-widest uppercase text-sm">My Career Path</span>
//                         <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
//                         <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Real projects, professional growth, and valuable experience that shaped my skills.</p>
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-8">
//                         {experiences.map((exp, index) => (
//                             <motion.div key={exp.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 className="group relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all">
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg mb-6">💼</div>
//                                 <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">{exp.duration}</span>
//                                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">{exp.title}</h3>
//                                 <p className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">{exp.company}</p>
//                                 <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
//                                 <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-500/40 transition-all"></div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* CONTACT */}
//             <section id="contact" className="py-24 px-4 bg-white dark:bg-gray-900 overflow-hidden">
//                 <div className="max-w-7xl mx-auto" data-aos="fade-up">
//                     <div className="text-center mb-16">
//                         <span className="text-indigo-600 font-semibold uppercase tracking-[4px] text-sm">Contact Us</span>
//                         <h2 className="text-5xl font-bold mt-4 text-gray-900 dark:text-white">Let's Build Something Great</h2>
//                         <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">Have a project idea? Send me a message.</p>
//                     </div>
//                     <div className="grid lg:grid-cols-2 gap-12 items-start">
//                         <div className="relative">
//                             <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 blur-2xl opacity-20 rounded-3xl"></div>
//                             <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-10 shadow-2xl">
//                                 <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
//                                 <p className="text-white/80 leading-relaxed mb-8">I create professional websites, Laravel systems, React applications, and full-stack solutions.</p>
//                                 <div className="space-y-5">
//                                     {contact ? (
//                                         <>
//                                             <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaEnvelope /></div><div><h4 className="font-semibold">Email</h4><p className="text-white/80 text-sm">{contact.email}</p></div></div>
//                                             <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaPhoneAlt /></div><div><h4 className="font-semibold">Phone</h4><p className="text-white/80 text-sm">{contact.phone}</p></div></div>
//                                             <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaMapMarkerAlt /></div><div><h4 className="font-semibold">Location</h4><p className="text-white/80 text-sm">{contact.location}</p></div></div>
//                                         </>
//                                     ) : <p>Loading...</p>}
//                                 </div>
//                                 <div className="flex gap-4 mt-10">
//                                     {contact?.github_url && <a href={contact.github_url} target="_blank" className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"><FaGithub /></a>}
//                                     {contact?.linkedin_url && <a href={contact.linkedin_url} target="_blank" className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"><FaLinkedin /></a>}
//                                     {contact?.twitter_url && <a href={contact.twitter_url} target="_blank" className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"><FaXTwitter /></a>}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-10 shadow-xl">
//                             <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Send Message</h3>
//                             <form onSubmit={handleContactSubmit} className="space-y-6">
//                                 <input type="text" name="name" placeholder="Your Name" required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none" />
//                                 <input type="email" name="email" placeholder="Your Email" required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none" />
//                                 <textarea name="message" rows="6" placeholder="Write your message..." required className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none"></textarea>
//                                 <button type="submit" className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition shadow-lg">{sending ? "Sending..." : "Send Message"}</button>
//                                 {successMessage && <div className="text-green-600 text-center font-medium">{successMessage}</div>}
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </Layout>
//     );
// }

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Link as ScrollLink } from "react-scroll";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import {
//   FaGithub,
//   FaLinkedin,
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaPhoneAlt
// } from "react-icons/fa";

// import { FaXTwitter } from "react-icons/fa6";

// export default function Portfolio() {
//     const [darkMode, setDarkMode] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [scrollTop, setScrollTop] = useState(false);
//     const [about, setAbout] = useState(null);
//     const [skills, setSkills] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [experiences, setExperiences] = useState([]);
//     const [news, setNews] = useState([]);
//     const [contact, setContact] = useState(null);
//     const [sending, setSending] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');

//     useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

//     useEffect(() => {
//         axios.get('/api/about').then(res => setAbout(res.data));
//         axios.get('/api/skills').then(res => setSkills(res.data));
//         axios.get('/api/projects').then(res => setProjects(res.data));
//         axios.get('/api/experiences').then(res => setExperiences(res.data));
//         axios.get('/api/news').then(res => setNews(res.data));
//         axios.get('/api/contact').then(res => setContact(res.data));
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => setScrollTop(window.scrollY > 300);
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const toggleDark = () => {
//         setDarkMode(!darkMode);
//         document.documentElement.classList.toggle('dark');
//     };

//     const handleContactSubmit = (e) => {
//         e.preventDefault();
//         setSending(true);
//         const formData = new FormData(e.target);
//         axios.post('/api/messages', {
//             name: formData.get('name'),
//             email: formData.get('email'),
//             message: formData.get('message'),
//         })
//         .then(() => {
//             setSuccessMessage('Message sent successfully!');
//             e.target.reset();
//             setSending(false);
//             setTimeout(() => setSuccessMessage(''), 3000);
//         })
//         .catch(() => {
//             setSending(false);
//             alert('Error sending message.');
//         });
//     };

//     const fadeInUp = {
//         hidden: { opacity: 0, y: 40 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//     };

//     const [hero, setHero] = useState(null);

// useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/hero")
//         .then(res => res.json())
//         .then(data => setHero(data));
// }, []);



//     return (
//         <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
            
//             {/* NAVBAR
//             <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//                     <a href="#" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MH</a>
//                     <div className="hidden md:flex items-center space-x-8">
//                         {['Home', 'About', 'Skills', 'Projects', 'News', 'Experience', 'Contact'].map((item) => (
//                             <ScrollLink key={item} to={item.toLowerCase()} smooth={true} duration={500} offset={-70}
//                                 className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">
//                                 {item}
//                             </ScrollLink>
//                         ))}
//                         <button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-xl">
//                             {darkMode ? '☀️' : '🌙'}
//                         </button>
//                     </div>
//                 </div>
//             </nav> */}

//         {/* NAVBAR */}
// <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
//         {/* Logo & Name - Dynamic */}
//         <a href="#" className="flex items-center gap-2">
//             {about?.logo ? (
//                 <img src={about.logo} alt="Logo" className="h-8 md:h-10 object-contain" />
//             ) : (
//                 <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                     {about?.name?.split(' ').map(n => n[0]).join('') || 'MH'}
//                 </span>
//             )}
//             {/* Optional: Show name next to logo */}
//             {about?.logo && about?.name && (
//                 <span className="hidden md:block text-lg font-bold text-gray-900 dark:text-white">
//                     {about.name}
//                 </span>
//             )}
//         </a>

//         {/* Navigation Links */}
//         <div className="hidden md:flex items-center space-x-8">
//             {['Home', 'About', 'Skills', 'Projects', 'News', 'Experience', 'Contact'].map((item) => (
//                 <ScrollLink 
//                     key={item} 
//                     to={item.toLowerCase()} 
//                     smooth={true} 
//                     duration={500} 
//                     offset={-70}
//                     className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
//                 >
//                     {item}
//                 </ScrollLink>
//             ))}
            
//             {/* Dark Mode Toggle */}
//             <button 
//                 onClick={toggleDark} 
//                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-xl"
//                 title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//             >
//                 {darkMode ? '☀️' : '🌙'}
//             </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <button 
//             onClick={() => setMenuOpen(!menuOpen)} 
//             className="md:hidden p-2 text-2xl text-gray-700 dark:text-gray-300"
//         >
//             {menuOpen ? '✕' : '☰'}
//         </button>
//     </div>

//     {/* Mobile Menu */}
//     {menuOpen && (
//         <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
//             <div className="flex flex-col space-y-4">
//                 {['Home', 'About', 'Skills', 'Projects', 'News', 'Experience', 'Contact'].map((item) => (
//                     <ScrollLink 
//                         key={item} 
//                         to={item.toLowerCase()} 
//                         smooth={true} 
//                         duration={500} 
//                         offset={-70}
//                         onClick={() => setMenuOpen(false)}
//                         className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition py-2"
//                     >
//                         {item}
//                     </ScrollLink>
//                 ))}
//                 <button 
//                     onClick={() => { toggleDark(); setMenuOpen(false); }} 
//                     className="flex items-center gap-2 text-gray-700 dark:text-gray-300 py-2"
//                 >
//                     <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
//                     <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
//                 </button>
//             </div>
//         </div>
//     )}
// </nav>

//             {/* <section id="home" className="min-h-screen flex items-center justify-center px-4 hero-bg">
//     <div className="text-center max-w-4xl relative z-10">
//         <p className="text-white/80 font-medium mb-4">👋 Hello, I'm</p>
//         <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
//             Mujeeburahman Hamza
//         </h1>
//         <p className="text-2xl md:text-3xl text-gray-200 mb-8">Full Stack Developer</p>
//         {/* buttons */}
//     {/* </div>
// </section> */} 

// <section
//   id="home"
//   className="relative min-h-screen flex items-center bg-[#0b1120] px-4 overflow-hidden"
// >

//   <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#020617]" />

//   <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

//     {/* LEFT */}
//     <div>
//       <div className="text-green-400 mb-4 flex items-center gap-2">
//         <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//         {hero?.status}
//       </div>

//       <h1 className="text-5xl font-bold text-white">
//         Hi, I'm{" "}
//         <span className="text-cyan-400">
//           {hero?.name}
//         </span>
//       </h1>

//       <h2 className="text-2xl text-gray-300 mt-3">
//         {hero?.title}
//       </h2>

//       <p className="text-gray-400 mt-6 max-w-xl">
//         {hero?.description}
//       </p>

//       <div className="mt-8 flex gap-4">
//         <a href="#projects" className="bg-white text-black px-6 py-3 rounded-xl">
//           View Projects
//         </a>

//         <a href="#contact" className="border border-white/20 text-white px-6 py-3 rounded-xl">
//           Contact
//         </a>
//       </div>
//     </div>

//     {/* RIGHT STATS */}
//     <div className="space-y-6">

//       <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
//         <p className="text-gray-400">Projects Completed</p>
//         <h3 className="text-4xl text-cyan-400 font-bold">
//           {hero?.projects_completed}+
//         </h3>
//       </div>

//       <div className="grid grid-cols-2 gap-4">

//         <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//           <p className="text-gray-400 text-sm">Clients</p>
//           <h3 className="text-2xl text-white font-bold">
//             {hero?.clients}+
//           </h3>
//         </div>

//         <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//           <p className="text-gray-400 text-sm">Experience</p>
//           <h3 className="text-2xl text-white font-bold">
//             {hero?.experience_years}+ Yr
//           </h3>
//         </div>

//       </div>

//       <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//         <p className="text-gray-400">Technologies</p>
//         <h3 className="text-2xl text-white font-bold">
//           {hero?.technologies}
//         </h3>
//       </div>

//     </div>

//   </div>
// </section>

          

//             {/* ABOUT */}
// <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800 overflow-hidden">
//     <div className="max-w-7xl mx-auto" data-aos="fade-up">
//         <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
//             About Me
//         </h2>

//         {about ? (
//             <div className="grid md:grid-cols-2 gap-14 items-center">

//                 {/* LEFT IMAGE DESIGN */}
//                 <div className="relative group">
//                     <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>

//                     <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
//                         {about.image && (
//                             <img
//                                 src={about.image}
//                                 alt="About"
//                                 className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
//                             />
//                         )}

//                         {/* Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>

//                         {/* Floating badge */}
//                         <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-sm font-semibold">
//                             Web Developer
//                         </div>

//                         {/* Bottom Card */}
//                         <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20">
//                             <h4 className="text-white text-xl font-bold mb-2">
//                                 Building Digital Experiences
//                             </h4>
//                             <p className="text-gray-200 text-sm">
//                                 Modern websites, responsive UI, and backend solutions with React & Laravel.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT CONTENT */}
//                 <div>
//                     <span className="text-indigo-600 font-semibold uppercase tracking-widest text-sm">
//                         Tech & IT Solutions
//                     </span>

//                     <h3 className="text-5xl font-bold mt-4 mb-6 text-gray-900 dark:text-white leading-tight">
//                         {about.title}
//                     </h3>

//                     <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
//                         {about.description}
//                     </p>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-6">
//                         {[
//                             ['years_experience', 'Years Experience'],
//                             ['projects_done', 'Projects Done'],
//                             ['happy_clients', 'Happy Clients'],
//                             ['technologies_count', 'Technologies'],
//                         ].map(([key, label]) => (
//                             <div
//                                 key={key}
//                                 className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 hover:-translate-y-1 transition"
//                             >
//                                 <h4 className="text-4xl font-bold text-indigo-600 mb-2">
//                                     {about[key]}+
//                                 </h4>
//                                 <p className="text-gray-600 dark:text-gray-300 text-sm">
//                                     {label}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Button */}
//                     <div className="mt-10">
//                         <a
//                             href="#contact"
//                             className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-lg transition"
//                         >
//                             Let's Work Together
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         ) : (
//             <div className="text-center text-gray-500 py-10">Loading...</div>
//         )}
//     </div>
// </section>

//             {/* SKILLS */}
//             <section id="skills" className="py-20 px-4">
//                 <div className="max-w-6xl mx-auto" data-aos="fade-up">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">My Skills</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                         {skills.map(skill => (
//                             <motion.div key={skill.id} whileHover={{ y: -5 }} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-gray-700 text-center">
//                                 <span className="text-4xl mb-3 block">{skill.icon}</span>
//                                 <h4 className="font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
//                                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                                     <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
//                                 </div>
//                                 <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">{skill.percentage}%</span>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* PROJECTS */}
//             <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
//                 <div className="max-w-6xl mx-auto" data-aos="fade-up">
//                     <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">My Projects</h2>
//                     <div className="grid md:grid-cols-3 gap-8">
//                         {projects.map(project => (
//                             <motion.div key={project.id} whileHover={{ y: -8 }} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
//                                 <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//                                     {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <span className="text-white text-4xl">🚀</span>}
//                                 </div>
                              

//                               <div className="p-6">
//     <h3 className="font-bold text-xl mb-2">
//         <a href={`/projects/${project.id}`} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
//             {project.title}
//         </a>
//     </h3>
//     <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
//     <div className="flex gap-2 flex-wrap mb-4">
//         {project.technologies?.map(tech => (
//             <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
//                 {tech}
//             </span>
//         ))}
//     </div>
//     <div className="flex gap-3">
//         <a href={`/projects/${project.id}`} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm">
//             View Details →
//         </a>
//         {project.url && (
//             <a href={project.url} target="_blank" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm">
//                 Live Demo →
//             </a>
//         )}
//         {project.github_url && (
//             <a href={project.github_url} target="_blank" className="text-gray-600 dark:text-gray-400 font-medium hover:underline text-sm">
//                 GitHub →
//             </a>
//         )}
//     </div>
// </div>
//             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>


//             {/* NEWS - DYNAMIC */}
// <section id="news" className="py-20 px-4">
//     <div className="max-w-6xl mx-auto" data-aos="fade-up">
//         <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Latest News</h2>
//         {news.length > 0 ? (
//             <>
//                 <div className="grid md:grid-cols-3 gap-8">
//                     {news.map((item) => (
//                         <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
//                             <div className="h-40 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
//                                 {item.image ? (
//                                     <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                                 ) : (
//                                     <span className="text-white text-3xl">📰</span>
//                                 )}
//                             </div>
//                             <div className="p-6">
//                                 <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
//                                     {item.category}
//                                 </span>
//                                 <h3 className="font-bold text-lg mt-3 mb-2">
//                                     <a href={`/news/${item.slug}`} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
//                                         {item.title}
//                                     </a>
//                                 </h3>
//                                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.excerpt}</p>
//                                 <span className="text-xs text-gray-400">{new Date(item.published_at).toLocaleDateString()}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
                
//                 {/* View All Button */}
//                 <div className="text-center mt-10">
//                     <a href="/news" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition inline-block">
//                         View All News →
//                     </a>
//                 </div>
//             </>
//         ) : (
//             <div className="text-center text-gray-500 dark:text-gray-400 py-10">Loading news...</div>
//         )}
//     </div>
// </section>


//             {/* EXPERIENCE */}
// <section
//   id="experience"
//   className="py-24 px-4 bg-white dark:bg-gray-950 relative overflow-hidden"
// >
//   {/* Background Glow */}
//   <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full"></div>
//   <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/10 blur-3xl rounded-full"></div>

//   <div className="max-w-6xl mx-auto relative z-10">
    
//     {/* Heading */}
//     <div className="text-center mb-20" data-aos="fade-up">
//       <span className="text-indigo-600 font-semibold tracking-widest uppercase text-sm">
//         My Career Path
//       </span>

//       <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
//         Work Experience
//       </h2>

//       <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
//         Real projects, professional growth, and valuable experience that shaped my skills.
//       </p>
//     </div>

//     {/* Cards Grid */}
//     <div className="grid md:grid-cols-2 gap-8">
//       {experiences.map((exp, index) => (
//         <motion.div
//           key={exp.id}
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           className="group relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
//         >
//           {/* Top Icon */}
//           <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg mb-6">
//             💼
//           </div>

//           {/* Duration */}
//           <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">
//             {exp.duration}
//           </span>

//           {/* Title */}
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">
//             {exp.title}
//           </h3>

//           {/* Company */}
//           <p className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">
//             {exp.company}
//           </p>

//           {/* Description */}
//           <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
//             {exp.description}
//           </p>

//           {/* Hover Border Glow */}
//           <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-500/40 transition-all duration-300"></div>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>

//             {/* CONTACT */}

//             <section
//     id="contact"
//     className="py-24 px-4 bg-white dark:bg-gray-900 overflow-hidden"
// >
//     <div className="max-w-7xl mx-auto" data-aos="fade-up">

//         {/* Heading */}
//         <div className="text-center mb-16">
//             <span className="text-indigo-600 font-semibold uppercase tracking-[4px] text-sm">
//                 Contact Us
//             </span>

//             <h2 className="text-5xl font-bold mt-4 text-gray-900 dark:text-white">
//                 Let’s Build Something Great
//             </h2>

//             <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
//                 Have a project idea, business plan, or need a modern website?
//                 Send me a message and let’s talk.
//             </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">

//             {/* LEFT SIDE INFO PANEL */}
//             <div className="relative">

//                 <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 blur-2xl opacity-20 rounded-3xl"></div>

//                 <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-10 shadow-2xl">

//                     <h3 className="text-3xl font-bold mb-6">
//                         Get In Touch
//                     </h3>

//                     <p className="text-white/80 leading-relaxed mb-8">
//                         I create professional websites, Laravel systems,
//                         React applications, and full-stack solutions for
//                         businesses and personal brands.
//                     </p>

//                     {/* Contact Info */}
//                     <div className="space-y-5">

//                         {contact ? (
//                             <>
//                     <div className="flex items-start gap-4">
//                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
//                         <FaEnvelope />
//                         </div>
//                             <div>
//                             <h4 className="font-semibold">Email</h4>
//                             <p className="text-white/80 text-sm">
//                                 {contact.email}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
//                         <FaPhoneAlt />
//                     </div>
//                     <div>
//                         <h4 className="font-semibold">Phone</h4>
//                         <p className="text-white/80 text-sm">
//                             {contact.phone}
//                         </p>
//                     </div>
//                 </div>

//                     <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
//                             <FaMapMarkerAlt />
//                         </div>
//                         <div>
//                             <h4 className="font-semibold">Location</h4>
//                             <p className="text-white/80 text-sm">
//                                 {contact.location}
//                             </p>
//                         </div>
//                     </div>

//                             </>
//                         ) : (
//                             <p>Loading...</p>
//                         )}
//                     </div>

//                     {/* Social Icons */}
//                     <div className="flex gap-4 mt-10">
//                         {contact?.github_url && (
//                             <a
//                                 href={contact.github_url}
//                                 target="_blank"
//                                 className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"
//                             >
//                                 <FaGithub />
//                             </a>
//                         )}

//                         {contact?.linkedin_url && (
//                             <a
//                                 href={contact.linkedin_url}
//                                 target="_blank"
//                                 className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"
//                             >
//                                 <FaLinkedin />
//                             </a>
//                         )}

//                         {contact?.twitter_url && (
//                             <a
//                                 href={contact.twitter_url}
//                                 target="_blank"
//                                 className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"
//                             >
//                                 <FaXTwitter />
//                             </a>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* RIGHT SIDE FORM */}
//             <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-10 shadow-xl">

//                 <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
//                     Send Message
//                 </h3>

//                 <form
//                     onSubmit={handleContactSubmit}
//                     className="space-y-6"
//                 >
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Your Name"
//                         required
//                         className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none"
//                     />

//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Your Email"
//                         required
//                         className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none"
//                     />

//                     <textarea
//                         name="message"
//                         rows="6"
//                         placeholder="Write your message..."
//                         required
//                         className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none"
//                     ></textarea>

//                     <button
//                         type="submit"
//                         className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition shadow-lg"
//                     >
//                         {sending ? "Sending..." : "Send Message"}
//                     </button>

//                     {successMessage && (
//                         <div className="text-green-600 text-center font-medium">
//                             {successMessage}
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     </div>
// </section>

//             {/* FOOTER
//             <footer className="py-8 bg-gray-900 text-white text-center">
//                 <p>&copy; 2024 Mujeeburahman Hamza. All rights reserved.</p>
//             </footer> */}

//                     {/* FOOTER */}
// <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
//     <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="grid md:grid-cols-4 gap-10">

//             {/* Brand */}
//             <div>
//                 <h3 className="text-2xl font-bold text-white mb-4">
//                     HAMZA<span className="text-indigo-500">.</span>
//                 </h3>
//                 <p className="text-sm leading-7 text-gray-400">
//                     Full Stack Developer focused on building modern, scalable,
//                     and user-friendly web applications using Laravel, React,
//                     JavaScript, and MySQL.
//                 </p>
//             </div>

//             {/* Quick Links */}
//             <div>
//                 <h4 className="text-lg font-semibold text-white mb-4">
//                     Quick Links
//                 </h4>
//                 <ul className="space-y-3 text-sm">
//                     <li><a href="#home" className="hover:text-indigo-400 transition">Home</a></li>
//                     <li><a href="#about" className="hover:text-indigo-400 transition">About</a></li>
//                     <li><a href="#projects" className="hover:text-indigo-400 transition">Projects</a></li>
//                     <li><a href="#services" className="hover:text-indigo-400 transition">Services</a></li>
//                     <li><a href="#contact" className="hover:text-indigo-400 transition">Contact</a></li>
//                 </ul>
//             </div>

//             {/* Services */}
//             <div>
//                 <h4 className="text-lg font-semibold text-white mb-4">
//                     Services
//                 </h4>
//                 <ul className="space-y-3 text-sm text-gray-400">
//                     <li>Website Development</li>
//                     <li>Laravel Backend</li>
//                     <li>React Frontend</li>
//                     <li>API Integration</li>
//                     <li>Database Design</li>
//                 </ul>
//             </div>

//             {/* Dynamic Contact */}
//             <div>
//                 <h4 className="text-lg font-semibold text-white mb-4">
//                     Contact Info
//                 </h4>

//                 {contact ? (
//                     <>
//                         <ul className="space-y-4 text-sm text-gray-400">

//     <li className="flex items-center gap-3">
//         <FaMapMarkerAlt className="text-indigo-500 text-lg" />
//         <span>{contact.location}</span>
//     </li>

//     <li className="flex items-center gap-3">
//         <FaEnvelope className="text-indigo-500 text-lg" />
//         <span>{contact.email}</span>
//     </li>

//     <li className="flex items-center gap-3">
//         <FaPhoneAlt className="text-indigo-500 text-lg" />
//         <span>{contact.phone}</span>
//     </li>

// </ul>

//         {/* Dynamic Social Links */}
//         <div className="flex gap-4 mt-5">
//             {contact.github_url && (
//                 <a
//                     href={contact.github_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"
//                 >
//                     <FaGithub />
//                 </a>
//             )}

//             {contact.linkedin_url && (
//                 <a
//                     href={contact.linkedin_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"
//                 >
//                     <FaLinkedin />
//                 </a>
//             )}

//             {contact.twitter_url && (
//                 <a
//                     href={contact.twitter_url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition"
//                 >
//                     <FaXTwitter />
//                 </a>
//             )}
//         </div>
//                     </>
//                 ) : (
//                     <p className="text-gray-500">Loading...</p>
//                 )}
//             </div>

//         </div>

//         {/* Bottom */}
//         <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
//             <p>
//                 © {new Date().getFullYear()} Mujeeburahman Hamza. All rights reserved.
//             </p>

//             <p>
//                 Designed & Developed with ❤️ by Hamza
//             </p>
//         </div>
//     </div>
// </footer>


//             {scrollTop && (
//                 <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                     className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition text-xl z-50">
//                     ↑
//                 </button>
//             )}
//         </div>
//     );
// }
