import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import LoadingScreen from '../Components/LoadingScreen';

export default function AllNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/news/all')
            .then(res => setNews(res.data))
            .catch(err => console.error(err));
    }, []);
       useEffect(() => {
      setTimeout(() => setLoading(false), 1500);
  }, []);

    return (
         <>
        <LoadingScreen isLoading={loading} />
        {!loading && (
        <Layout>
            <div className="bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <a href="/" className="text-indigo-300 hover:text-white mb-4 inline-block transition">← Back to Home</a>
                        <h1 className="text-4xl md:text-5xl font-bold">Latest News & Articles</h1>
                        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">Stay updated with my latest projects, announcements, and tech articles.</p>
                    </div>
                </div>

                {/* News Grid */}
                <div className="max-w-6xl mx-auto px-4 py-12">
                    {news.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-8">
                            {news.map(item => (
                                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                                    <a href={`/news/${item.slug}`}>
                                        <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                            ) : (
                                                <span className="text-white text-4xl">📰</span>
                                            )}
                                        </div>
                                    </a>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                            <span className="text-xs text-gray-400">{new Date(item.published_at).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">
                                            <a href={`/news/${item.slug}`} className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                                                {item.title}
                                            </a>
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{item.excerpt}</p>

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
                    ) : (
                        <div className="text-center py-20">
                            <span className="text-6xl mb-4 block">📰</span>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No news articles yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
        )}
        </>
    );
}