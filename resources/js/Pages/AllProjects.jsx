import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';
import LoadingScreen from '../Components/LoadingScreen';

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { translations } = usePage().props;

  useEffect(() => {
    axios.get('/api/projects/all')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);
    useEffect(() => {
      setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
       <>  <LoadingScreen isLoading={loading} />
              {!loading && (
    <Layout>
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <a href="/#projects" className="text-indigo-300 hover:text-white mb-4 inline-block transition">
            ← {translations?.back_to_home || 'Back to Home'}
          </a>
          <h1 className="text-4xl md:text-5xl font-bold">
            {translations?.all_projects || 'All Projects'}
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            {translations?.projects_desc || 'Explore all my projects and works.'}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map(project => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-gray-100 dark:border-gray-700"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-4xl">🚀</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">
                    <a href={`/projects/${project.id}`} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.technologies?.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={`/projects/${project.id}`} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm">
                      {translations?.view_details || 'View Details'} →
                    </a>
                    {project.url && (
                      <a href={project.url} target="_blank" className="text-indigo-600 font-medium hover:underline text-sm">
                        {translations?.live_demo || 'Live Demo'} →
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" className="text-gray-600 font-medium hover:underline text-sm">
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🚀</span>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{translations?.no_projects || 'No projects found.'}</p>
          </div>
        )}
      </div>
    </Layout>
    )}
        </>
  );
}