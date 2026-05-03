import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState([]);
    const { translations } = usePage().props;

    useEffect(() => {
        axios.get('/api/experiences').then(res => setExperiences(res.data));
    }, []);

    return (
        <Layout>
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <a href="/" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">← {translations?.home || 'Home'}</a>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations?.experience || 'Work Experience'}</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">{translations?.experience_desc || 'My professional journey.'}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                {experiences.length > 0 ? (
                    <div className="space-y-8">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-8 border-l-2 border-indigo-600 pb-8 last:pb-0"
                            >
                                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-indigo-600 rounded-full ring-4 ring-white dark:ring-gray-900"></div>
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 mb-3">{exp.duration}</span>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg mt-1">{exp.company}</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">{translations?.loading || 'Loading...'}</div>
                )}
            </div>
        </Layout>
    );
}