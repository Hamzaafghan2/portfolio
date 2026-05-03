import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const { translations } = usePage().props;

    useEffect(() => {
        axios.get('/api/testimonials').then(res => setTestimonials(res.data));
    }, []);

    return (
        <Layout>
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <a href="/" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">← {translations?.home || 'Home'}</a>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations?.testimonials || 'What Clients Say'}</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">{translations?.testimonials_desc || 'Feedback from people I have worked with.'}</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-16">
                {testimonials.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-400 text-lg">⭐</span>)}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    {t.image ? (
                                        <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-300" />
                                    ) : (
                                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">{t.name[0]}</div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{t.name}</h4>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
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