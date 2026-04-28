import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

export default function ProjectDetail() {
    const [project, setProject] = useState(null);
    const [otherProjects, setOtherProjects] = useState([]);
    const id = window.location.pathname.split('/').pop();

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(res => {
                setProject(res.data);
                axios.get('/api/projects')
                    .then(r => {
                        const filtered = r.data
                            .filter(item => item.id !== res.data.id)
                            .slice(0, 3);
                        setOtherProjects(filtered);
                    });
            })
            .catch(() => window.location.href = '/');
    }, []);

    if (!project) return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">🚀</div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Loading project...</p>
                </div>
            </div>
        </Layout>
    );

    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
                {project.image && (
                    <div className="absolute inset-0 opacity-20">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32">
                    <a href="/#projects" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">
                        ← Back to Projects
                    </a>
                    <div className="flex items-center gap-3 mb-4">
                        {project.featured && (
                            <span className="px-4 py-1.5 bg-yellow-500/30 backdrop-blur-sm rounded-full text-sm">
                                ⭐ Featured Project
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{project.title}</h1>
                    <p className="text-lg text-gray-300">{project.description}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {project.image && (
                            <img src={project.image} alt={project.title} 
                                className="w-full rounded-2xl shadow-lg object-cover max-h-96" />
                        )}

                        {project.technologies && project.technologies.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🛠️ Technologies Used</h2>
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} 
                                            className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📋 About This Project</h2>
                            <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed">
                                {project.description}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[200px] px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-center hover:bg-indigo-700 transition hover:scale-105">
                                    🌐 View Live Demo
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[200px] px-8 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-xl font-bold text-center hover:bg-gray-900 dark:hover:bg-gray-600 transition hover:scale-105">
                                    🐙 View Source Code
                                </a>
                            )}
                        </div>

                        {/* Share Buttons — INSIDE RETURN ✅ */}
                        <div className="flex gap-2 mt-4">
                            <button 
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this project: ${project.title}`, '_blank')}
                                className="px-4 py-2 bg-blue-400 text-white rounded-lg text-sm hover:bg-blue-500"
                            >
                                𝕏 Share
                            </button>
                            <button 
                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                            >
                                📘 Share
                            </button>
                            <button 
                                onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700"
                            >
                                📋 Copy Link
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">📊 Project Info</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Status</span>
                                    <span className="font-medium text-green-600 dark:text-green-400">✅ Completed</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Featured</span>
                                    <span className={`font-medium ${project.featured ? 'text-yellow-600' : 'text-gray-400'}`}>
                                        {project.featured ? '⭐ Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Project ID</span>
                                    <span className="font-medium text-gray-900 dark:text-white">#{project.id}</span>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                                {project.url && (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                                        className="block w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm text-center hover:bg-indigo-700 transition">
                                        🌐 Live Website
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                        className="block w-full py-2.5 bg-gray-700 text-white rounded-lg text-sm text-center hover:bg-gray-800 transition">
                                        🐙 Source Code
                                    </a>
                                )}
                                <a href="/#contact" 
                                    className="block w-full py-2.5 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm text-center hover:bg-indigo-600 hover:text-white transition">
                                    💬 Interested? Contact Me
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Projects */}
                {otherProjects.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">🚀 More Projects</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {otherProjects.map(item => (
                                <a key={item.id} href={`/projects/${item.id}`} 
                                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                                    <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                                        ) : (
                                            <span className="text-white text-3xl">🚀</span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                            {item.description}
                                        </p>
                                        {item.featured && <span className="text-xs text-yellow-600 mt-2 block">⭐ Featured</span>}
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

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Layout from './Layout';

// export default function ProjectDetail() {
//     const [project, setProject] = useState(null);
//     const [otherProjects, setOtherProjects] = useState([]);
//     const id = window.location.pathname.split('/').pop();

//     useEffect(() => {
//         // Fetch single project
//         axios.get(`/api/projects/${id}`)
//             .then(res => {
//                 setProject(res.data);
//                 // Fetch other projects for "More Projects" section
//                 axios.get('/api/projects')
//                     .then(r => {
//                         const filtered = r.data
//                             .filter(item => item.id !== res.data.id)
//                             .slice(0, 3);
//                         setOtherProjects(filtered);
//                     });
//             })
//             .catch(() => window.location.href = '/');
//     }, []);

//     if (!project) return (
//         <Layout>
//             <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//                 <div className="text-center">
//                     <div className="animate-spin text-4xl mb-4">🚀</div>
//                     <p className="text-gray-500 dark:text-gray-400 text-lg">Loading project...</p>
//                 </div>
//             </div>
//         </Layout>

        
//     );

//     return (
//         <Layout>
//             {/* Hero Section */}
//             <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
//                 {project.image && (
//                     <div className="absolute inset-0 opacity-20">
//                         <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
//                     </div>
//                 )}
//                 <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32">
//                     <a href="/#projects" className="text-indigo-300 hover:text-white mb-6 inline-flex items-center gap-2 transition">
//                         ← Back to Projects
//                     </a>
//                     <div className="flex items-center gap-3 mb-4">
//                         {project.featured && (
//                             <span className="px-4 py-1.5 bg-yellow-500/30 backdrop-blur-sm rounded-full text-sm">
//                                 ⭐ Featured Project
//                             </span>
//                         )}
//                     </div>
//                     <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{project.title}</h1>
//                     <p className="text-lg text-gray-300">{project.description}</p>
//                 </div>
//             </div>

//             {/* Content Section */}
//             <div className="max-w-5xl mx-auto px-4 py-12">
//                 <div className="grid lg:grid-cols-3 gap-8">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 space-y-8">
//                         {/* Project Image */}
//                         {project.image && (
//                             <img src={project.image} alt={project.title} 
//                                 className="w-full rounded-2xl shadow-lg object-cover max-h-96" />
//                         )}

//                         {/* Technologies Used */}
//                         {project.technologies && project.technologies.length > 0 && (
//                             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
//                                 <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🛠️ Technologies Used</h2>
//                                 <div className="flex flex-wrap gap-3">
//                                     {project.technologies.map((tech, index) => (
//                                         <span key={index} 
//                                             className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium">
//                                             {tech}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Project Description */}
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
//                             <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📋 About This Project</h2>
//                             <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed">
//                                 {project.description}
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex flex-wrap gap-4">
//                             {project.url && (
//                                 <a href={project.url} target="_blank" rel="noopener noreferrer"
//                                     className="flex-1 min-w-[200px] px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-center hover:bg-indigo-700 transition hover:scale-105">
//                                     🌐 View Live Demo
//                                 </a>
//                             )}
//                             {project.github_url && (
//                                 <a href={project.github_url} target="_blank" rel="noopener noreferrer"
//                                     className="flex-1 min-w-[200px] px-8 py-4 bg-gray-800 dark:bg-gray-700 text-white rounded-xl font-bold text-center hover:bg-gray-900 dark:hover:bg-gray-600 transition hover:scale-105">
//                                     🐙 View Source Code
//                                 </a>
//                             )}
//                         </div>
//                     </div>

//                     {/* Sidebar */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
//                             <h3 className="font-bold text-lg text-gray-900 dark:text-white">📊 Project Info</h3>
                            
//                             <div className="space-y-3 text-sm">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-500 dark:text-gray-400">Status</span>
//                                     <span className="font-medium text-green-600 dark:text-green-400">✅ Completed</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-500 dark:text-gray-400">Featured</span>
//                                     <span className={`font-medium ${project.featured ? 'text-yellow-600' : 'text-gray-400'}`}>
//                                         {project.featured ? '⭐ Yes' : 'No'}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-500 dark:text-gray-400">Project ID</span>
//                                     <span className="font-medium text-gray-900 dark:text-white">#{project.id}</span>
//                                 </div>
//                             </div>

//                             {/* Quick Links */}
//                             <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
//                                 {project.url && (
//                                     <a href={project.url} target="_blank" rel="noopener noreferrer"
//                                         className="block w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm text-center hover:bg-indigo-700 transition">
//                                         🌐 Live Website
//                                     </a>
//                                 )}
//                                 {project.github_url && (
//                                     <a href={project.github_url} target="_blank" rel="noopener noreferrer"
//                                         className="block w-full py-2.5 bg-gray-700 text-white rounded-lg text-sm text-center hover:bg-gray-800 transition">
//                                         🐙 Source Code
//                                     </a>
//                                 )}
//                                 <a href="/#contact" 
//                                     className="block w-full py-2.5 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm text-center hover:bg-indigo-600 hover:text-white transition">
//                                     💬 Interested? Contact Me
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* More Projects */}
//                 {otherProjects.length > 0 && (
//                     <div className="mt-16">
//                         <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">🚀 More Projects</h2>
//                         <div className="grid md:grid-cols-3 gap-6">
//                             {otherProjects.map(item => (
//                                 <a key={item.id} href={`/projects/${item.id}`} 
//                                     className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
//                                     <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//                                         {item.image ? (
//                                             <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
//                                         ) : (
//                                             <span className="text-white text-3xl">🚀</span>
//                                         )}
//                                     </div>
//                                     <div className="p-4">
//                                         <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">
//                                             {item.title}
//                                         </h3>
//                                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
//                                             {item.description}
//                                         </p>
//                                         {item.featured && <span className="text-xs text-yellow-600 mt-2 block">⭐ Featured</span>}
//                                     </div>
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );

//     <div className="flex gap-2 mt-4">
//     <button 
//         onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this project: ${project.title}`, '_blank')}
//         className="px-4 py-2 bg-blue-400 text-white rounded-lg text-sm hover:bg-blue-500"
//     >
//         𝕏 Share
//     </button>
//     <button 
//         onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
//     >
//         📘 Share
//     </button>
//     <button 
//         onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }}
//         className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700"
//     >
//         📋 Copy Link
//     </button>
// </div>
    
    
// }
