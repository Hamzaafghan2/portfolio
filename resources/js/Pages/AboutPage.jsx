import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';

export default function AboutPage() {
    const [about, setAbout] = useState(null);
    const { translations } = usePage().props;

    useEffect(() => {
        axios.get('/api/about').then(res => setAbout(res.data));
    }, []);

    return (
        <Layout>
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <a href="/" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">← {translations?.home || 'Home'}</a>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations?.about || 'About Me'}</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">{translations?.about_desc || 'Learn more about my journey and passion.'}</p>
                </div>
            </div>

            {/* Content */}
            {about ? (
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
                                {about.image ? (
                                    <img src={about.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-7xl font-bold">
                                        {about.name?.split(' ').map(n => n[0]).join('') || '?'}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{about.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">{about.description}</p>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    ['years_experience', translations?.years_exp || 'Years Experience'],
                                    ['projects_done', translations?.projects_done || 'Projects Done'],
                                    ['happy_clients', translations?.happy_clients || 'Happy Clients'],
                                    ['technologies_count', translations?.tech_count || 'Technologies']
                                ].map(([key, label]) => (
                                    <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition">
                                        <span className="text-4xl font-bold text-indigo-600 block">{about[key]}+</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">{label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg">
                                    {translations?.get_in_touch || 'Get In Touch'} →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500 text-lg">{translations?.loading || 'Loading...'}</div>
            )}
        </Layout>
    );
}