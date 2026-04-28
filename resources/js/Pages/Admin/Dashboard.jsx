import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Head } from '@inertiajs/react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('about');
    const [about, setAbout] = useState(null);
    const [contact, setContact] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [messages, setMessages] = useState([]);
    const [editing, setEditing] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [newsList, setNewsList] = useState([]);


    useEffect(() => { fetchAll(); }, []);

    const fetchAll = () => {
        axios.get('/api/about').then(res => setAbout(res.data));
        axios.get('/api/contact').then(res => setContact(res.data));
        axios.get('/api/skills').then(res => setSkills(res.data));
        axios.get('/api/projects').then(res => setProjects(res.data));
        axios.get('/api/services').then(res => setServices(res.data));
        axios.get('/api/testimonials').then(res => setTestimonials(res.data));
        axios.get('/api/admin/news').then(res => setNewsList(res.data));
        axios.get('/api/experiences').then(res => setExperiences(res.data));
        axios.get('/api/messages').then(res => setMessages(res.data));
    };

    const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 3000); };

    // About
     const saveAbout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios.post('/api/about', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
        fetchAll();
        showSuccess('About updated!');
    })
    .catch(err => {
        alert('Error: ' + (err.response?.data?.message || err.message));
    });
};

    const handleReply = (e, messageId) => {
    e.preventDefault();
    const replyMessage = e.target.querySelector(`input[name="reply_${messageId}"]`).value;
    
    axios.post(`/api/messages/${messageId}/reply`, {
        reply_message: replyMessage
    })
    .then(() => {
        fetchAll();
        showSuccess('Reply sent successfully!');
        e.target.reset();
    })
    .catch(err => {
        alert('Error: ' + (err.response?.data?.message || 'Failed to send'));
    });
};

    // Contact
    const saveContact = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        axios.put('/api/contact', data)
            .then(() => { fetchAll(); showSuccess('Contact updated!'); })
            .catch(err => alert('Error: ' + err.response?.data?.message));
    };

    // Skills
    const saveSkill = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            icon: formData.get('icon'),
            percentage: parseInt(formData.get('percentage')),
            order: parseInt(formData.get('order')),
        };
        
        if (editing) {
            axios.put(`/api/skills/${editing.id}`, data)
                .then(() => { fetchAll(); setEditing(null); showSuccess('Skill updated!'); })
                .catch(err => alert('Error: ' + (err.response?.data?.message || err.message)));
        } else {
            axios.post('/api/skills', data)
                .then(() => { fetchAll(); e.target.reset(); showSuccess('Skill added!'); })
                .catch(err => alert('Error: ' + err.response?.data?.message));
        }
    };

    const editSkill = (skill) => setEditing(skill);

    const deleteSkill = (id) => {
        if (confirm('Delete this skill?')) {
            axios.delete(`/api/skills/${id}`).then(() => fetchAll());
        }
    };

    // Projects
   const saveProject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('_method', editing ? 'PUT' : 'POST');
    formData.set('technologies', formData.get('technologies')?.split(',').map(t => t.trim()).filter(Boolean) || []);
    formData.set('featured', formData.get('featured') === 'on');

    const url = editing ? `/api/projects/${editing.id}` : '/api/projects';
    
    console.log('URL:', url, 'Editing:', editing?.id); // ADD THIS

    axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => {
        console.log('Response:', res.data); // ADD THIS
        fetchAll();
        setEditing(null);
        showSuccess(editing ? 'Project updated!' : 'Project added!');
    })
    .catch(err => {
        console.error('Error:', err.response); // ADD THIS
        alert('Error: ' + (err.response?.data?.message || err.message));
    });
};

        const editProject = (p) => { 
    setEditing(p); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
};

    const deleteProject = (id) => { 
        if (confirm('Delete this project?')) {
            axios.delete(`/api/projects/${id}`).then(() => fetchAll());
        }
    };
           ////SERVEces 
       const saveService = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.order = parseInt(data.order);
        if (editing) {
            axios.put(`/api/services/${editing.id}`, data).then(() => { fetchAll(); setEditing(null); showSuccess('Service updated!'); });
        } else {
            axios.post('/api/services', data).then(() => { fetchAll(); e.target.reset(); showSuccess('Service added!'); });
        }
    };

    const deleteService = (id) => { if (confirm('Delete?')) axios.delete(`/api/services/${id}`).then(() => fetchAll()); };

    const saveTestimonial = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('_method', editing ? 'PUT' : 'POST');
    formData.set('rating', parseInt(formData.get('rating')));
    formData.set('order', parseInt(formData.get('order')));

    const url = editing ? `/api/testimonials/${editing.id}` : '/api/testimonials';

    axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
        fetchAll();
        setEditing(null);
        showSuccess(editing ? 'Testimonial updated!' : 'Testimonial added!');
    })
    .catch(err => alert('Error: ' + (err.response?.data?.message || err.message)));
};

    const deleteTestimonial = (id) => { if (confirm('Delete?')) axios.delete(`/api/testimonials/${id}`).then(() => fetchAll()); };
   //news  
    const saveNews = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('_method', editing ? 'PUT' : 'POST');
    formData.set('published', formData.get('published') === 'on');

    const url = editing ? `/api/news/${editing.id}` : '/api/news';

    axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
        fetchAll();
        setEditing(null);
        showSuccess(editing ? 'News updated!' : 'News added!');
    })
    .catch(err => alert('Error: ' + (err.response?.data?.message || err.message)));
};

    const editNews = (item) => { 
    setEditing(item); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
};

    const deleteNews = (id) => {
        if (confirm('Delete?')) {
            axios.delete(`/api/news/${id}`).then(() => fetchAll());
        }
    };

    // Experiences
    const saveExperience = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            title: formData.get('title'),
            company: formData.get('company'),
            duration: formData.get('duration'),
            description: formData.get('description'),
            order: parseInt(formData.get('order')),
        };
        
        if (editing) {
            axios.put(`/api/experiences/${editing.id}`, data)
                .then(() => { fetchAll(); setEditing(null); showSuccess('Experience updated!'); });
        } else {
            axios.post('/api/experiences', data)
                .then(() => { fetchAll(); e.target.reset(); showSuccess('Experience added!'); });
        }
    };

    const editExperience = (exp) => { setEditing(exp); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const deleteExperience = (id) => { if (confirm('Delete?')) axios.delete(`/api/experiences/${id}`).then(() => fetchAll()); };

    // Messages
    const markRead = (id) => axios.put(`/api/messages/${id}/read`).then(() => fetchAll());
    const deleteMessage = (id) => { if (confirm('Delete?')) axios.delete(`/api/messages/${id}`).then(() => fetchAll()); };

    const unreadCount = messages.filter(m => !m.read).length;

    const tabs = [
        { id: 'about', label: 'About', icon: '👤' },
        { id: 'contact', label: 'Contact', icon: '📞' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
        { id: 'services', label: 'Services', icon: '🛠️' },
        { id: 'testimonials', label: 'Testimonials', icon: '💬' },
        { id: 'news', label: 'News', icon: '📰' },
        { id: 'experiences', label: 'Experience', icon: '💼' },
        { id: 'messages', label: `Messages (${unreadCount})`, icon: '📬' },
    ];

    return (
        <>
        <Head title="Mujeeburahman Hamza | Portfolio" />
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">⚙️ Admin Panel</h1>
                    <div className="flex gap-3">
                        <a href="/" target="_blank" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">🌐 View Site</a>
                        <Link href="/logout" method="post" className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">🚪 Logout</Link>
                    </div>
                </div>
            </header>

            {successMsg && <div className="max-w-7xl mx-auto px-4 mt-4"><div className="bg-green-500 text-white px-4 py-3 rounded-lg">✅ {successMsg}</div></div>}

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-2 mb-6 flex-wrap">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditing(null); }}
                            className={`px-4 py-2 rounded-lg font-medium text-sm ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

               
          {/* ABOUT */}
{activeTab === 'about' && about && (
    <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">✏️ Edit About</h2>
        <form onSubmit={saveAbout} className="space-y-4 max-w-3xl">
            
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="name" defaultValue={about.name || ''} placeholder="Your full name" 
                    className="w-full px-4 py-2 rounded-lg border" />
            </div>

            {/* Title */}
            <input name="title" defaultValue={about.title} required 
                className="w-full px-4 py-2 rounded-lg border" placeholder="Title (e.g., Full Stack Developer)" />
            
            {/* Description */}
            <textarea name="description" rows="4" defaultValue={about.description} required 
                className="w-full px-4 py-2 rounded-lg border" />
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {['years_experience','projects_done','happy_clients','technologies_count'].map(f => (
                    <div key={f}>
                        <label className="block text-xs font-medium text-gray-500 capitalize mb-1">{f.replace('_',' ')}</label>
                        <input name={f} type="number" defaultValue={about[f]} required 
                            className="w-full px-4 py-2 rounded-lg border" />
                    </div>
                ))}
            </div>

            {/* Profile Image */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                {about.image && (
                    <div className="mb-2">
                        <img src={about.image} alt="Profile" className="w-24 h-24 rounded-full object-cover border" />
                    </div>
                )}
                <input type="file" name="image" accept="image/*" className="w-full px-4 py-2 rounded-lg border bg-white" />
            </div>

            {/* Logo */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo (Navbar)</label>
                {about.logo && (
                    <div className="mb-2">
                        <img src={about.logo} alt="Logo" className="h-10 object-contain border rounded p-1" />
                    </div>
                )}
                <input type="file" name="logo" accept="image/*" className="w-full px-4 py-2 rounded-lg border bg-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favicon (Browser Tab Icon)</label>
                {about.favicon && <img src={about.favicon} alt="Favicon" className="w-8 h-8 mb-2" />}
                <input type="file" name="favicon" accept="image/*" className="w-full px-4 py-2 rounded-lg border bg-white" />
            </div>

            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">💾 Save</button>
        </form>
    </div>
)}

                {/* CONTACT */}
                {activeTab === 'contact' && contact && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-6">📞 Edit Contact</h2>
                        <form onSubmit={saveContact} className="space-y-4 max-w-3xl">
                            <div className="grid grid-cols-2 gap-4">
                                <input name="email" type="email" defaultValue={contact.email} required className="px-4 py-2 rounded-lg border" />
                                <input name="phone" defaultValue={contact.phone} required className="px-4 py-2 rounded-lg border" />
                            </div>
                            <input name="location" defaultValue={contact.location} className="w-full px-4 py-2 rounded-lg border" />
                            <div className="grid grid-cols-3 gap-4">
                                <input name="github_url" defaultValue={contact.github_url} className="px-4 py-2 rounded-lg border" />
                                <input name="linkedin_url" defaultValue={contact.linkedin_url} className="px-4 py-2 rounded-lg border" />
                                <input name="twitter_url" defaultValue={contact.twitter_url} className="px-4 py-2 rounded-lg border" />
                            </div>
                            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">💾 Save</button>
                        </form>
                    </div>
                )}

                {/* SKILLS */}
                {activeTab === 'skills' && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-6">{editing ? '✏️ Edit' : '➕ Add'} Skill</h2>
                        <form onSubmit={saveSkill} className="space-y-4 max-w-3xl mb-8">
                            <div className="grid grid-cols-4 gap-4">
                                <input name="name" placeholder="Name" defaultValue={editing?.name || ''} required className="px-4 py-2 rounded-lg border" />
                                <input name="icon" placeholder="Icon emoji" defaultValue={editing?.icon || ''} className="px-4 py-2 rounded-lg border" />
                                <input name="percentage" type="number" placeholder="%" defaultValue={editing?.percentage || ''} min="0" max="100" required className="px-4 py-2 rounded-lg border" />
                                <input name="order" type="number" placeholder="Order" defaultValue={editing?.order || skills.length + 1} className="px-4 py-2 rounded-lg border" />
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? '💾 Update' : '➕ Add'}</button>
                                {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
                            </div>
                        </form>
                        {skills.map(skill => (
                            <div key={skill.id} className="flex justify-between p-4 bg-gray-50 rounded-lg mb-2">
                                <div><span className="text-2xl">{skill.icon}</span> <span className="font-medium">{skill.name}</span> - {skill.percentage}%</div>
                                <div className="flex gap-2">
                                    <button onClick={() => editSkill(skill)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">✏️</button>
                                    <button onClick={() => deleteSkill(skill.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

          {/* PROJECTS */}
{activeTab === 'projects' && (
    <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">{editing ? '✏️ Edit' : '➕ Add'} Project</h2>
        <form onSubmit={saveProject} className="space-y-4 max-w-3xl mb-8">
            <input name="title" placeholder="Title" defaultValue={editing?.title || ''} required className="w-full px-4 py-2 rounded-lg border" />
            <textarea name="description" rows="3" placeholder="Description" defaultValue={editing?.description || ''} className="w-full px-4 py-2 rounded-lg border" />
            
            <div className="grid grid-cols-2 gap-4">
                <input name="url" placeholder="Live URL" defaultValue={editing?.url || ''} className="px-4 py-2 rounded-lg border" />
                <input name="github_url" placeholder="GitHub URL" defaultValue={editing?.github_url || ''} className="px-4 py-2 rounded-lg border" />
            </div>
            
            <input name="technologies" placeholder="Tech (comma: Laravel, React)" defaultValue={editing?.technologies?.join(', ') || ''} className="w-full px-4 py-2 rounded-lg border" />
            
            <label className="flex items-center gap-2">
              <input type="checkbox" name="featured" defaultChecked={editing?.featured} /> ⭐ Featured</label>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                {editing?.image && (
                    <div className="mb-2">
                        <img src={editing.image} alt="Current" className="w-32 h-20 object-cover rounded border" />
                    </div>
                )}
                <input type="file" name="image" accept="image/*" className="w-full px-4 py-2 rounded-lg border bg-white" />
            </div>

            <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? '💾 Update' : '➕ Add'}</button>
                {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
            </div>
        </form>

        {projects.map(p => (
            <div key={p.id} className="flex justify-between p-4 bg-gray-50 rounded-lg mb-2">
                <div>{p.title} {p.featured && '⭐'}</div>
                <div className="flex gap-2">
                    <button onClick={() => editProject(p)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">✏️</button>
                            <button onClick={() => deleteProject(p.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        )}

                 {activeTab === 'services' && (
    <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">{editing ? '✏️ Edit' : '➕ Add'} Service</h2>
        <form onSubmit={saveService} className="space-y-4 max-w-3xl mb-8">
            <div className="grid grid-cols-3 gap-4">
                <input name="icon" placeholder="Icon emoji" defaultValue={editing?.icon || ''} className="px-4 py-2 rounded-lg border" />
                <input name="title" placeholder="Title" defaultValue={editing?.title || ''} required className="px-4 py-2 rounded-lg border" />
                <input name="order" type="number" placeholder="Order" defaultValue={editing?.order || services.length + 1} className="px-4 py-2 rounded-lg border" />
            </div>
            <textarea name="description" rows="3" placeholder="Description" defaultValue={editing?.description || ''} className="w-full px-4 py-2 rounded-lg border" />
            <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? '💾 Update' : '➕ Add'}</button>
                {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
            </div>
        </form>
        {services.map(s => (
            <div key={s.id} className="flex justify-between p-4 bg-gray-50 rounded-lg mb-2">
                <div><span className="text-2xl">{s.icon}</span> <span className="font-medium">{s.title}</span></div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(s)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">✏️</button>
                            <button onClick={() => deleteService(s.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        )}


        {/* testimoials */}
           {activeTab === 'testimonials' && (
    <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">{editing ? '✏️ Edit Testimonial' : '➕ Add Testimonial'}</h2>
        <form onSubmit={saveTestimonial} className="space-y-4 max-w-3xl mb-8">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input name="name" placeholder="e.g. Ahmad Rashid" defaultValue={editing?.name || ''} required 
                    className="w-full px-4 py-2 rounded-lg border" />
            </div>

            {/* Role */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title / Role *</label>
                <input name="role" placeholder="e.g. CEO, TechStartup" defaultValue={editing?.role || ''} required 
                    className="w-full px-4 py-2 rounded-lg border" />
            </div>

            {/* Rating */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5) *</label>
                <input name="rating" type="number" placeholder="5" defaultValue={editing?.rating || 5} min="1" max="5" required 
                    className="w-full px-4 py-2 rounded-lg border" />
            </div>

            {/* Testimonial Text */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text *</label>
                <textarea name="text" rows="4" placeholder="What did the client say about you?" defaultValue={editing?.text || ''} required 
                    className="w-full px-4 py-2 rounded-lg border"></textarea>
            </div>

            {/* Order */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input name="order" type="number" placeholder="1" defaultValue={editing?.order || testimonials.length + 1} 
                    className="w-full px-4 py-2 rounded-lg border" />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Photo (optional)</label>
                {editing?.image && (
                    <div className="mb-2">
                        <img src={editing.image} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                    </div>
                )}
                <input type="file" name="image" accept="image/*" className="w-full px-4 py-2 rounded-lg border bg-white" />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    {editing ? '💾 Update Testimonial' : '➕ Add Testimonial'}
                </button>
                {editing && (
                    <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">
                        Cancel
                    </button>
                )}
            </div>
        </form>

        {/* Testimonials List */}
        {testimonials.length > 0 ? (
            testimonials.map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center gap-3">
                        {t.image ? (
                            <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {t.name[0]}
                            </div>
                        )}
                        <div>
                            <span className="font-medium">{t.name}</span>
                            <span className="text-gray-500 text-sm ml-2">{t.role}</span>
                            <span className="ml-2">{'⭐'.repeat(t.rating)}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setEditing(t)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">✏️</button>
                        <button onClick={() => deleteTestimonial(t.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">🗑️</button>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-500 text-center py-4">No testimonials yet.</p>
            )}
        </div>
    )}

                    {/* NEWS TAB */}

        {activeTab === 'news' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6">{editing ? '✏️ Edit News' : '➕ Add News'}</h2>
            

        <form onSubmit={saveNews} className="space-y-4 max-w-3xl mb-8">
    <input name="title" placeholder="Title" defaultValue={editing?.title || ''} required className="w-full px-4 py-2 rounded-lg border" />
    <input name="category" placeholder="Category" defaultValue={editing?.category || 'General'} className="w-full px-4 py-2 rounded-lg border" />
    <textarea name="excerpt" rows="2" placeholder="Excerpt" defaultValue={editing?.excerpt || ''} className="w-full px-4 py-2 rounded-lg border" />
    <textarea name="content" rows="5" placeholder="Content" defaultValue={editing?.content || ''} required className="w-full px-4 py-2 rounded-lg border" />
    
    {/* Image Upload */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">News Image</label>
        {editing?.image && (
            <div className="mb-2">
                <img src={editing.image} alt="Current" className="w-32 h-20 object-cover rounded border" />
            </div>
        )}
        <input type="file" name="image" accept="image/*" className="w-full px-4 py-2 rounded-lg border bg-white" />
    </div>

    <label className="flex items-center gap-2"><input type="checkbox" name="published" defaultChecked={editing?.published !== false} /> Published</label>
    <div className="flex gap-3">
        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? '💾 Update' : '➕ Add'}</button>
        {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
    </div>
</form>
        {newsList.map(item => (
            <div key={item.id} className="flex justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
                <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs ml-2 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">{item.category}</span>
                    {!item.published && <span className="text-xs ml-2 bg-red-100 px-2 py-0.5 rounded">Draft</span>}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => editNews(item)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">✏️</button>
                    <button onClick={() => deleteNews(item.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">🗑️</button>
                </div>
            </div>
        ))}
    </div>
)} 

                {/* EXPERIENCES */}
                {activeTab === 'experiences' && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-6">{editing ? '✏️ Edit' : '➕ Add'} Experience</h2>
                        <form onSubmit={saveExperience} className="space-y-4 max-w-3xl mb-8">
                            <div className="grid grid-cols-3 gap-4">
                                <input name="title" placeholder="Job Title" defaultValue={editing?.title || ''} required className="px-4 py-2 rounded-lg border" />
                                <input name="company" placeholder="Company" defaultValue={editing?.company || ''} required className="px-4 py-2 rounded-lg border" />
                                <input name="duration" placeholder="Duration" defaultValue={editing?.duration || ''} required className="px-4 py-2 rounded-lg border" />
                            </div>
                            <textarea name="description" rows="3" placeholder="Description" defaultValue={editing?.description || ''} className="w-full px-4 py-2 rounded-lg border" />
                            <div className="flex gap-3">
                                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? '💾 Update' : '➕ Add'}</button>
                                {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
                            </div>
                        </form>
                        {experiences.map(exp => (
                            <div key={exp.id} className="flex justify-between p-4 bg-gray-50 rounded-lg mb-2">
                                <div>{exp.title} at {exp.company}</div>
                                <div className="flex gap-2">
                                    <button onClick={() => editExperience(exp)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">✏️</button>
                                    <button onClick={() => deleteExperience(exp.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {/* MESSAGES TAB */}
{activeTab === 'messages' && (
    <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-gray-900">📬 Messages ({unreadCount} unread)</h2>
        {messages.length > 0 ? (
            <div className="space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`p-4 rounded-lg border ${msg.read ? 'bg-gray-50' : 'bg-indigo-50 border-indigo-300'}`}>
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">
                                    {msg.name} 
                                    {!msg.read && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded ml-2">NEW</span>}
                                </h3>
                                <p className="text-sm text-gray-500">{msg.email}</p>
                                <p className="mt-2 text-gray-700">{msg.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
                                
                                {/* Reply Form */}
                                <div className="mt-4 border-t pt-4">
                                    <form onSubmit={(e) => handleReply(e, msg.id)} className="flex gap-2">
                                        <input 
                                            type="text" 
                                            name={`reply_${msg.id}`}
                                            placeholder="Type your reply..." 
                                            required
                                            className="flex-1 px-4 py-2 rounded-lg border text-sm"
                                        />
                                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                                            ✉️ Send Reply
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                {!msg.read && (
                                    <button onClick={() => markRead(msg.id)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                                        ✓ Read
                                    </button>
                                )}
                                <button onClick={() => deleteMessage(msg.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 text-center py-8">No messages yet.</p>
        )}
    </div>
)}


            </div>
        </div>
        </>
    );
}

// import { useState, useEffect } from 'react';
// import { Link } from '@inertiajs/react';
// import axios from 'axios';

// export default function AdminDashboard() {
//     const [activeTab, setActiveTab] = useState('about');
//     const [about, setAbout] = useState(null);
//     const [skills, setSkills] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [experiences, setExperiences] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [editing, setEditing] = useState(null);
//     const [successMsg, setSuccessMsg] = useState('');

//     useEffect(() => {
//         fetchAll();
//     }, []);

//     const fetchAll = () => {
//         axios.get('/api/about').then(res => setAbout(res.data));
//         axios.get('/api/skills').then(res => setSkills(res.data));
//         axios.get('/api/projects').then(res => setProjects(res.data));
//         axios.get('/api/experiences').then(res => setExperiences(res.data));
//         axios.get('/api/messages').then(res => setMessages(res.data));
//     };

//     const showSuccess = (msg) => {
//         setSuccessMsg(msg);
//         setTimeout(() => setSuccessMsg(''), 3000);
//     };

//     // Save About
//     const saveAbout = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         axios.put('/api/about', Object.fromEntries(formData))
//             .then(() => { fetchAll(); showSuccess('About updated!'); });
//     };

//     // Save Skill
//     const saveSkill = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const data = Object.fromEntries(formData);
//         data.percentage = parseInt(data.percentage);
        
//         if (editing) {
//             axios.put(`/api/skills/${editing.id}`, data)
//                 .then(() => { fetchAll(); setEditing(null); showSuccess('Skill updated!'); });
//         } else {
//             axios.post('/api/skills', data)
//                 .then(() => { fetchAll(); e.target.reset(); showSuccess('Skill added!'); });
//         }
//     };

//     // Delete Skill
//     const deleteSkill = (id) => {
//         if (confirm('Delete this skill?')) {
//             axios.delete(`/api/skills/${id}`).then(() => fetchAll());
//         }
//     };

//     // Save Project
//     const saveProject = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const data = Object.fromEntries(formData);
//         data.featured = formData.get('featured') === 'on';
//         data.technologies = formData.get('technologies').split(',').map(t => t.trim());
        
//         if (editing) {
//             axios.put(`/api/projects/${editing.id}`, data)
//                 .then(() => { fetchAll(); setEditing(null); showSuccess('Project updated!'); });
//         } else {
//             axios.post('/api/projects', data)
//                 .then(() => { fetchAll(); e.target.reset(); showSuccess('Project added!'); });
//         }
//     };

//     const deleteProject = (id) => {
//         if (confirm('Delete this project?')) {
//             axios.delete(`/api/projects/${id}`).then(() => fetchAll());
//         }
//     };

//     // Save Experience
//     const saveExperience = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const data = Object.fromEntries(formData);
        
//         if (editing) {
//             axios.put(`/api/experiences/${editing.id}`, data)
//                 .then(() => { fetchAll(); setEditing(null); showSuccess('Experience updated!'); });
//         } else {
//             axios.post('/api/experiences', data)
//                 .then(() => { fetchAll(); e.target.reset(); showSuccess('Experience added!'); });
//         }
//     };

//     const deleteExperience = (id) => {
//         if (confirm('Delete this experience?')) {
//             axios.delete(`/api/experiences/${id}`).then(() => fetchAll());
//         }
//     };

//     // Message Actions
//     const markRead = (id) => {
//         axios.put(`/api/messages/${id}/read`).then(() => fetchAll());
//     };

//     const deleteMessage = (id) => {
//         if (confirm('Delete message?')) {
//             axios.delete(`/api/messages/${id}`).then(() => fetchAll());
//         }
//     };

//     const tabs = [
//         { id: 'about', label: 'About', icon: '👤' },
//         { id: 'skills', label: 'Skills', icon: '⚡' },
//         { id: 'projects', label: 'Projects', icon: '🚀' },
//         { id: 'experiences', label: 'Experience', icon: '💼' },
//         { id: 'messages', label: `Messages (${messages.filter(m => !m.read).length})`, icon: '📬' },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Header */}
//             <header className="bg-white shadow-sm">
//                 <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
//                     <div className="flex gap-3">
//                         <a href="/" target="_blank" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">View Site</a>
//                         <Link href="/logout" method="post" className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">Logout</Link>
//                     </div>
//                 </div>
//             </header>

//             {/* Success Message */}
//             {successMsg && (
//                 <div className="max-w-7xl mx-auto px-4 mt-4">
//                     <div className="bg-green-500 text-white px-4 py-3 rounded-lg">{successMsg}</div>
//                 </div>
//             )}

//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 {/* Tabs */}
//                 <div className="flex gap-2 mb-8 flex-wrap">
//                     {tabs.map(tab => (
//                         <button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditing(null); }}
//                             className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>
//                             {tab.icon} {tab.label}
//                         </button>
//                     ))}
//                 </div>

//                 {/* ABOUT TAB */}
//                 {activeTab === 'about' && about && (
//                     <div className="bg-white rounded-xl p-6 shadow-lg">
//                         <h2 className="text-xl font-bold mb-6 text-gray-900">Edit About</h2>
//                         <form onSubmit={saveAbout} className="space-y-4 max-w-2xl">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                                 <input name="title" defaultValue={about.title} className="w-full px-4 py-2 rounded-lg border" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                                 <textarea name="description" rows="4" defaultValue={about.description} className="w-full px-4 py-2 rounded-lg border" />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
//                                     <input name="years_experience" type="number" defaultValue={about.years_experience} className="w-full px-4 py-2 rounded-lg border" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Projects Done</label>
//                                     <input name="projects_done" type="number" defaultValue={about.projects_done} className="w-full px-4 py-2 rounded-lg border" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Happy Clients</label>
//                                     <input name="happy_clients" type="number" defaultValue={about.happy_clients} className="w-full px-4 py-2 rounded-lg border" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
//                                     <input name="technologies_count" type="number" defaultValue={about.technologies_count} className="w-full px-4 py-2 rounded-lg border" />
//                                 </div>
//                             </div>
//                             <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Changes</button>
//                         </form>
//                     </div>
//                 )}

//                 {/* SKILLS TAB */}
//                 {activeTab === 'skills' && (
//                     <div className="bg-white rounded-xl p-6 shadow-lg">
//                         <h2 className="text-xl font-bold mb-6 text-gray-900">
//                             {editing ? 'Edit Skill' : 'Add New Skill'}
//                         </h2>
//                         <form onSubmit={saveSkill} className="space-y-4 max-w-2xl mb-8" key={editing?.id}>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <input name="name" placeholder="Skill Name" defaultValue={editing?.name} required className="px-4 py-2 rounded-lg border" />
//                                 <input name="icon" placeholder="Icon (emoji)" defaultValue={editing?.icon} className="px-4 py-2 rounded-lg border" />
//                                 <input name="percentage" type="number" placeholder="Percentage" defaultValue={editing?.percentage} min="0" max="100" required className="px-4 py-2 rounded-lg border" />
//                             </div>
//                             <div className="flex gap-3">
//                                 <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? 'Update' : 'Add'} Skill</button>
//                                 {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
//                             </div>
//                         </form>

//                         <div className="space-y-3">
//                             {skills.map(skill => (
//                                 <div key={skill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                                     <div className="flex items-center gap-3">
//                                         <span className="text-2xl">{skill.icon}</span>
//                                         <span className="font-medium text-gray-900">{skill.name}</span>
//                                         <span className="text-gray-500">- {skill.percentage}%</span>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <button onClick={() => setEditing(skill)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
//                                         <button onClick={() => deleteSkill(skill.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* PROJECTS TAB */}
//                 {activeTab === 'projects' && (
//                     <div className="bg-white rounded-xl p-6 shadow-lg">
//                         <h2 className="text-xl font-bold mb-6 text-gray-900">
//                             {editing ? 'Edit Project' : 'Add New Project'}
//                         </h2>
//                         <form onSubmit={saveProject} className="space-y-4 max-w-2xl mb-8" key={editing?.id}>
//                             <input name="title" placeholder="Project Title" defaultValue={editing?.title} required className="w-full px-4 py-2 rounded-lg border" />
//                             <textarea name="description" rows="3" placeholder="Description" defaultValue={editing?.description} required className="w-full px-4 py-2 rounded-lg border" />
//                             <div className="grid grid-cols-2 gap-4">
//                                 <input name="url" placeholder="Live URL" defaultValue={editing?.url} className="px-4 py-2 rounded-lg border" />
//                                 <input name="github_url" placeholder="GitHub URL" defaultValue={editing?.github_url} className="px-4 py-2 rounded-lg border" />
//                             </div>
//                             <input name="technologies" placeholder="Technologies (comma separated)" defaultValue={editing?.technologies?.join(', ')} className="w-full px-4 py-2 rounded-lg border" />
//                             <label className="flex items-center gap-2 text-gray-700">
//                                 <input type="checkbox" name="featured" defaultChecked={editing?.featured} /> Featured Project
//                             </label>
//                             <div className="flex gap-3">
//                                 <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? 'Update' : 'Add'} Project</button>
//                                 {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
//                             </div>
//                         </form>

//                         <div className="space-y-3">
//                             {projects.map(project => (
//                                 <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                                     <div>
//                                         <span className="font-medium text-gray-900">{project.title}</span>
//                                         {project.featured && <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded">Featured</span>}
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <button onClick={() => setEditing(project)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
//                                         <button onClick={() => deleteProject(project.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* EXPERIENCES TAB */}
//                 {activeTab === 'experiences' && (
//                     <div className="bg-white rounded-xl p-6 shadow-lg">
//                         <h2 className="text-xl font-bold mb-6 text-gray-900">
//                             {editing ? 'Edit Experience' : 'Add New Experience'}
//                         </h2>
//                         <form onSubmit={saveExperience} className="space-y-4 max-w-2xl mb-8" key={editing?.id}>
//                             <div className="grid grid-cols-3 gap-4">
//                                 <input name="title" placeholder="Job Title" defaultValue={editing?.title} required className="px-4 py-2 rounded-lg border" />
//                                 <input name="company" placeholder="Company" defaultValue={editing?.company} required className="px-4 py-2 rounded-lg border" />
//                                 <input name="duration" placeholder="Duration" defaultValue={editing?.duration} required className="px-4 py-2 rounded-lg border" />
//                             </div>
//                             <textarea name="description" rows="3" placeholder="Description" defaultValue={editing?.description} required className="w-full px-4 py-2 rounded-lg border" />
//                             <div className="flex gap-3">
//                                 <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">{editing ? 'Update' : 'Add'} Experience</button>
//                                 {editing && <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>}
//                             </div>
//                         </form>

//                         <div className="space-y-3">
//                             {experiences.map(exp => (
//                                 <div key={exp.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                                     <div>
//                                         <span className="font-medium text-gray-900">{exp.title}</span>
//                                         <span className="text-gray-500 ml-2">at {exp.company}</span>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <button onClick={() => setEditing(exp)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
//                                         <button onClick={() => deleteExperience(exp.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* MESSAGES TAB */}
//                 {activeTab === 'messages' && (
//                     <div className="bg-white rounded-xl p-6 shadow-lg">
//                         <h2 className="text-xl font-bold mb-6 text-gray-900">Messages</h2>
//                         {messages.length > 0 ? (
//                             <div className="space-y-4">
//                                 {messages.map(msg => (
//                                     <div key={msg.id} className={`p-4 rounded-lg border ${msg.read ? 'bg-gray-50' : 'bg-indigo-50 border-indigo-300'}`}>
//                                         <div className="flex justify-between items-start">
//                                             <div>
//                                                 <h3 className="font-bold text-gray-900">{msg.name}</h3>
//                                                 <p className="text-sm text-gray-500">{msg.email}</p>
//                                                 <p className="mt-2 text-gray-700">{msg.message}</p>
//                                                 <p className="text-xs text-gray-400 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 {!msg.read && <button onClick={() => markRead(msg.id)} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Read</button>}
//                                                 <button onClick={() => deleteMessage(msg.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <p className="text-gray-500">No messages yet.</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }