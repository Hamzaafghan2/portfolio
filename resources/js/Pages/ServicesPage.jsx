import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const { translations } = usePage().props;

    useEffect(() => {
        axios.get('/api/services').then(res => setServices(res.data));
    }, []);

    return (
        <Layout>
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <a href="/" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">← {translations?.home || 'Home'}</a>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations?.services || 'Services'}</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">{translations?.services_desc || 'What I can do for you.'}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                {services.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border border-gray-100 dark:border-gray-700 group"
                            >
                                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition">
                                    <span className="text-3xl">{service.icon}</span>
                                </div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
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