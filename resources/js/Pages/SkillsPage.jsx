import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const { translations } = usePage().props;

    useEffect(() => {
        axios.get('/api/skills').then(res => setSkills(res.data));
    }, []);

    return (
        <Layout>
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <a href="/" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">← {translations?.home || 'Home'}</a>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations?.skills || 'My Skills'}</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">{translations?.skills_desc || 'Technologies and tools I work with.'}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                {skills.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {skills.map((skill, i) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-gray-700 text-center"
                            >
                                <span className="text-4xl mb-3 block">{skill.icon}</span>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3">{skill.name}</h4>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full"
                                    ></motion.div>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">{skill.percentage}%</span>
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