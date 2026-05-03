import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function ContactPage() {
    const [contact, setContact] = useState(null);
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { translations } = usePage().props;

    useEffect(() => {
        axios.get('/api/contact').then(res => setContact(res.data));
    }, []);

    const handleSubmit = (e) => {
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

    return (
        <Layout>
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <a href="/" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">← {translations?.home || 'Home'}</a>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations?.contact || 'Get In Touch'}</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">{translations?.contact_desc || 'Have a project in mind? Let us talk.'}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-10 shadow-2xl">
                        <h3 className="text-3xl font-bold mb-8">{translations?.get_in_touch || 'Get In Touch'}</h3>
                        {contact && (
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaEnvelope /></div>
                                    <div><h4 className="font-semibold">{translations?.email || 'Email'}</h4><p className="text-white/80">{contact.email}</p></div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaPhoneAlt /></div>
                                    <div><h4 className="font-semibold">{translations?.phone || 'Phone'}</h4><p className="text-white/80">{contact.phone}</p></div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl"><FaMapMarkerAlt /></div>
                                    <div><h4 className="font-semibold">{translations?.location || 'Location'}</h4><p className="text-white/80">{contact.location}</p></div>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-4 mt-8">
                            {contact?.github_url && <a href={contact.github_url} target="_blank" className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"><FaGithub /></a>}
                            {contact?.linkedin_url && <a href={contact.linkedin_url} target="_blank" className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"><FaLinkedin /></a>}
                            {contact?.twitter_url && <a href={contact.twitter_url} target="_blank" className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:scale-110 transition"><FaXTwitter /></a>}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{translations?.send_message || 'Send Message'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input type="text" name="name" placeholder={translations?.your_name || 'Your Name'} required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none" />
                            <input type="email" name="email" placeholder={translations?.your_email || 'Your Email'} required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none" />
                            <textarea name="message" rows="5" placeholder={translations?.your_message || 'Your Message'} required
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none"></textarea>
                            <button type="submit" className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition shadow-lg">
                                {sending ? (translations?.sending || 'Sending...') : (translations?.send_message || 'Send Message')}
                            </button>
                            {successMessage && <div className="text-green-600 text-center font-medium mt-2">{successMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}