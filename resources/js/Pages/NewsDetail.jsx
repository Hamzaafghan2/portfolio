import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

export default function NewsDetail() {
    const [news, setNews] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const slug = window.location.pathname.split('/').pop();

    useEffect(() => {
        axios.get(`/api/news/${slug}`)
            .then(res => {
                setNews(res.data);
                axios.get('/api/news/all')
                    .then(r => {
                        const filtered = r.data
                            .filter(item => item.category === res.data.category && item.id !== res.data.id)
                            .slice(0, 3);
                        setRelatedNews(filtered);
                    });
            })
            .catch(() => window.location.href = '/');
    }, []);

    if (!news) return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">⚡</div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Loading article...</p>
                </div>
            </div>
        </Layout>
    );

    return (
        <Layout>
            {/* Hero Header */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
                {news.image && (
                    <div className="absolute inset-0 opacity-30">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32">
                    <a href="/news" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">
                        ← All News
                    </a>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">{news.category}</span>
                        <span className={`px-4 py-1.5 rounded-full text-sm ${news.published ? 'bg-green-500/30' : 'bg-yellow-500/30'}`}>
                            {news.published ? 'Published' : 'Draft'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{news.title}</h1>
                    <p className="text-lg text-gray-300 mb-4">{news.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>📅 {new Date(news.published_at || news.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>✍️ By Mujeeburahman Hamza</span>
                    </div>
                </div>

                
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {news.image && <img src={news.image} alt={news.title} className="w-full rounded-2xl shadow-lg mb-8" />}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
                            <div className="prose prose-lg max-w-none dark:prose-invert leading-relaxed whitespace-pre-line">
                                {news.content}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Article Info</h3>
                            <div className="space-y-3 text-sm">
                                {[
                                    ['Author', 'Mujeeburahman Hamza'],
                                    ['Category', news.category],
                                    ['Published', new Date(news.published_at || news.created_at).toLocaleDateString()],
                                    ['Status', news.published ? 'Published' : 'Draft'],
                                    ['ID', `#${news.id}`],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex justify-between">
                                        <span className="text-gray-500">{label}</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm font-medium text-gray-500 mb-3">Share</p>
                                <div className="flex gap-2">
                                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${news.title}`, '_blank')}
                                        className="flex-1 py-2 bg-blue-400 text-white rounded-lg text-sm hover:bg-blue-500">𝕏</button>
                                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">📘</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                {relatedNews.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedNews.map(item => (
                                <a key={item.id} href={`/news/${item.slug}`} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                                    <div className="h-40 bg-gradient-to-br from-blue-500 to-cyan-600">
                                        {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" /> : <span className="text-white text-3xl flex items-center justify-center h-full">📰</span>}
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs text-indigo-600 font-medium">{item.category}</span>
                                        <h3 className="font-bold mt-1 group-hover:text-indigo-600 transition">{item.title}</h3>
                                        <span className="text-xs text-gray-400 mt-2 block">{new Date(item.published_at).toLocaleDateString()}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
