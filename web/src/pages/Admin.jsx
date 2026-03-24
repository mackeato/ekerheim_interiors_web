import { useState, useEffect } from 'react';
import bgPatternSand from '../assets/abstract_pattern_sand.png';

export default function Admin({ setCurrentPage }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  // Note: images is now an ARRAY inside the form state
  const [form, setForm] = useState({ id: null, name: '', description: '', images: [], location: '', area: '', scope: '', year: '', status: 'completed' });
  const [activeTab, setActiveTab] = useState('completed');
  const [manualUrl, setManualUrl] = useState('');

  const formatImg = (img) => {
    if (!img) return '';
    if (img.includes('http://localhost:3001/uploads/')) {
      return img.replace('http://localhost:3001/uploads/', import.meta.env.BASE_URL + 'uploads/');
    }
    if (img.startsWith('/uploads/')) {
      return import.meta.env.BASE_URL + img.slice(1);
    }
    return img;
  };

  useEffect(() => {
    if (token) fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection refused. Is the backend running?');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = form.id !== null;
    const url = isEdit ? `http://localhost:3001/api/projects/${form.id}` : 'http://localhost:3001/api/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        fetchProjects();
        setForm({ id: null, name: '', description: '', images: [], location: '', area: '', scope: '', year: '', status: 'completed' });
      } else {
        alert('Action failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('images', file));

    try {
      const res = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.urls) {
        setForm(prev => ({ ...prev, images: [...prev.images, ...data.urls] }));
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Image upload failed');
    }
    setUploading(false);
    e.target.value = null; // reset input
  };

  const handleManualUrlAdd = () => {
    if(!manualUrl.trim()) return;
    setForm(prev => ({ ...prev, images: [...prev.images, manualUrl.trim()] }));
    setManualUrl('');
  };

  const handleEdit = (p) => {
    setForm({ ...p, images: p.images || [] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const removeImage = (index) => {
    setForm(prev => {
      const updated = [...prev.images];
      updated.splice(index, 1);
      return { ...prev, images: updated };
    });
  };

  const shiftImage = (index, direction) => {
    setForm(prev => {
      const updated = [...prev.images];
      if (direction === 'up' && index > 0) {
        // swap
        [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      } else if (direction === 'down' && index < updated.length - 1) {
        [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      }
      return { ...prev, images: updated };
    });
  };

  if (!token) {
    return (
      <div className="relative z-10 mx-auto max-w-lg px-8 py-32 fade-in">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-[11px] uppercase tracking-[0.25em] text-[#7E746A] hover:text-[#4E4E4A] transition mb-12 flex items-center gap-2"
        >
          &larr; Tillbaka till startsidan
        </button>
        <div className="glass-panel rounded-[2.5rem] p-10 md:p-14 shadow-lg text-center relative overflow-hidden reveal-up">
          <img src={bgPatternSand} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-color-burn" alt="" />
          <div className="relative z-10">
            <h1 className="font-serif text-3xl text-[#4E4E4A] mb-8">Admin Access</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="grid gap-6">
              <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="rounded-2xl border border-white/50 bg-white/50 px-6 py-4 outline-none focus:bg-white/80 transition" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="rounded-2xl border border-white/50 bg-white/50 px-6 py-4 outline-none focus:bg-white/80 transition" />
              <button disabled={loading} type="submit" className="rounded-full bg-[#4E4E4A] px-8 py-4 text-xs uppercase tracking-widest text-[#F7F3EE] transition hover:opacity-90 shadow-md">
                {loading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const completedProjects = projects.filter(p => !p.status || p.status === 'completed');
  const ongoingProjects = projects.filter(p => p.status === 'ongoing');

  return (
    <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 py-16 md:py-24 fade-in">
      <div className="flex justify-between items-center mb-10 border-b border-white/40 pb-6">
        <h1 className="font-serif text-4xl text-[#4E4E4A]">Studio Dashboard</h1>
        <div className="flex items-center gap-4">
           <button onClick={() => setCurrentPage('home')} className="text-xs uppercase tracking-widest text-[#7E746A] hover:text-[#4E4E4A] underline-offset-4 hover:underline">View Live Site</button>
           <button onClick={handleLogout} className="rounded-full bg-red-900/10 text-red-900 px-6 py-2 text-xs uppercase tracking-widest transition hover:bg-red-900/20">Log out</button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[650px_1fr] gap-10">
        
        {/* Editor Panel */}
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 relative self-start reveal-scale">
           <h2 className="font-serif text-3xl text-[#4E4E4A] mb-8">{form.id ? 'Edit Project' : 'Create Project'}</h2>
           <form onSubmit={handleSubmit} className="grid gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#9D8C79] mb-2 block ml-2">Project Classification</label>
                <select value={form.status || 'completed'} onChange={e => setForm({...form, status: e.target.value})} className="w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-3 outline-none focus:bg-white/90 focus:border-white transition cursor-pointer font-medium text-[#4E4E4A]">
                  <option value="completed">Completed (Portfolio)</option>
                  <option value="ongoing">Ongoing (Tracker)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#9D8C79] mb-2 block ml-2">Project Name</label>
                <input required type="text" placeholder="e.g. Vindsvåning Östermalm" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-3 outline-none text-base focus:bg-white/90 focus:border-white transition" />
              </div>
              
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#9D8C79] mb-2 block ml-2">Description</label>
                <textarea required rows="4" placeholder="Project overview..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-4 outline-none text-base resize-y focus:bg-white/90 focus:border-white transition" />
              </div>

              {/* Image Manager UI */}
              <div className="bg-white/30 rounded-[2rem] border border-white/50 p-6">
                <label className="text-[10px] uppercase tracking-[0.3em] text-[#4E4E4A] mb-6 block font-semibold border-b border-white/40 pb-4">Image Management</label>
                
                {/* Thumbnails list */}
                {form.images.length > 0 ? (
                  <div className="space-y-3 mb-6">
                    {form.images.map((imgUrl, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-center gap-4 bg-white/60 p-3 rounded-2xl border border-white/60 shadow-sm relative">
                        <img src={formatImg(imgUrl)} className="w-20 h-20 rounded-xl object-cover border border-white/40 bg-[#F2ECE4]" alt="" />
                        <div className="flex-1 w-full min-w-0">
                           <p className="text-xs text-[#665E57] truncate font-mono bg-white/40 p-2 rounded-lg border border-white/40">{imgUrl}</p>
                           <div className="flex gap-2 mt-2">
                              <button type="button" onClick={() => shiftImage(idx, 'up')} disabled={idx === 0} className="px-3 py-1 bg-[#E8DED1] text-[10px] uppercase tracking-wider text-[#4E4E4A] rounded-md disabled:opacity-50 transition hover:bg-[#DCCFC0]">↑ Upp</button>
                              <button type="button" onClick={() => shiftImage(idx, 'down')} disabled={idx === form.images.length - 1} className="px-3 py-1 bg-[#E8DED1] text-[10px] uppercase tracking-wider text-[#4E4E4A] rounded-md disabled:opacity-50 transition hover:bg-[#DCCFC0]">↓ Ner</button>
                           </div>
                        </div>
                        <button type="button" onClick={() => removeImage(idx)} className="sm:self-stretch bg-red-900/10 text-red-900 px-4 py-2 rounded-xl text-xs uppercase tracking-wider hover:bg-red-900/20 transition">Ta bort</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#9D8C79] italic mb-6">Inga bilder uppladdade ännu.</p>
                )}

                <div className="mb-6">
                  <label className="w-full py-6 flex flex-col items-center justify-center border-2 border-dashed border-[#B8A792] rounded-2xl bg-white/40 cursor-pointer hover:bg-white/60 transition group">
                    {uploading ? (
                      <span className="text-[#6D655D] text-sm animate-pulse">Laddar upp bilder...</span>
                    ) : (
                      <>
                        <svg className="w-6 h-6 text-[#9D8C79] group-hover:text-[#4E4E4A] mb-2 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        <span className="text-[#6D655D] text-sm font-medium">Bifoga bilder (drag & drop)</span>
                      </>
                    )}
                    <input type="file" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} accept="image/*" />
                  </label>
                </div>

                <div className="flex gap-3">
                  <input type="text" placeholder="Eller klistra in manuell bildlänk (/assets/img...)" value={manualUrl} onChange={e => setManualUrl(e.target.value)} className="flex-1 rounded-xl border border-white/60 bg-white/70 px-4 py-2 outline-none text-xs focus:bg-white transition" />
                  <button type="button" onClick={handleManualUrlAdd} className="bg-[#B8A792] text-white px-5 py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-[#9D8C79] transition">Lägg till</button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#9D8C79] mb-2 block ml-2">Location</label>
                  <input required type="text" placeholder="Stockholm" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-3 outline-none text-base focus:bg-white/90 focus:border-white transition" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#9D8C79] mb-2 block ml-2">Area (kvm)</label>
                  <input required type="text" placeholder="145" value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-3 outline-none text-base focus:bg-white/90 focus:border-white transition" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#9D8C79] mb-2 block ml-2">Scope</label>
                  <input required type="text" placeholder="Renovering" value={form.scope} onChange={e => setForm({...form, scope: e.target.value})} className="w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-3 outline-none text-base focus:bg-white/90 focus:border-white transition" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#9D8C79] mb-2 block ml-2">Year</label>
                  <input required type="text" placeholder="2026" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="w-full rounded-2xl border border-white/60 bg-white/70 px-5 py-3 outline-none text-base focus:bg-white/90 focus:border-white transition" />
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                 <button type="submit" className="flex-1 rounded-full bg-[#4E4E4A] py-5 text-xs uppercase tracking-widest text-[#F7F3EE] hover:opacity-90 shadow-md transform active:scale-[0.98] transition">{form.id ? 'Save Changes' : 'Create Project'}</button>
                 {form.id && <button type="button" onClick={() => setForm({ id: null, name: '', description: '', images: [], location: '', area: '', scope: '', year: '', status: 'completed' })} className="flex-1 rounded-full bg-white/60 border border-[#B8A792] py-5 text-xs uppercase tracking-widest text-[#4E4E4A] hover:bg-white/80 transition">Cancel</button>}
              </div>
           </form>
        </div>

        {/* Database Explorer Panel */}
        <div className="space-y-10 mt-8 xl:mt-0 reveal-up" style={{ transitionDelay: '200ms' }}>
          <div className="flex glass-panel !p-2 mb-8 !rounded-full">
            <button 
              onClick={() => setActiveTab('completed')} 
              className={`flex-1 rounded-full py-3 text-xs uppercase tracking-widest transition-colors ${activeTab === 'completed' ? 'bg-[#4E4E4A] text-white shadow-sm' : 'text-[#6D655D] hover:bg-white/50'}`}
            >
              Completed / Portfolio ({completedProjects.length})
            </button>
            <button 
              onClick={() => setActiveTab('ongoing')} 
              className={`flex-1 rounded-full py-3 text-xs uppercase tracking-widest transition-colors ${activeTab === 'ongoing' ? 'bg-[#B8A792] text-white shadow-sm' : 'text-[#6D655D] hover:bg-white/50'}`}
            >
              Ongoing Projects ({ongoingProjects.length})
            </button>
          </div>

          <div className="space-y-6">
            {activeTab === 'completed' && completedProjects.map(p => (
              <div key={p.id} className="rounded-3xl border border-white/50 bg-white/40 backdrop-blur-sm p-6 flex gap-6 items-center shadow-sm hover:shadow-md transition">
                 <img src={formatImg((p.images && p.images[0]) || '')} alt="" className="w-24 h-24 rounded-2xl object-cover border border-white/30 bg-[#F2ECE4]" />
                 <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl text-[#4E4E4A] truncate">{p.name}</h3>
                    <p className="text-sm text-[#665E57] mt-1 line-clamp-1">{p.description}</p>
                    <p className="text-[11px] text-[#9D8C79] mt-3 uppercase tracking-widest">{p.location} &middot; {p.area} &middot; {p.year}</p>
                 </div>
                 <div className="flex flex-col gap-3 shrink-0">
                   <button onClick={() => handleEdit(p)} className="rounded-full border border-[#4E4E4A] bg-transparent px-6 py-2.5 text-[11px] uppercase tracking-widest text-[#4E4E4A] hover:bg-[#4E4E4A] hover:text-white transition">Edit</button>
                   <button onClick={() => handleDelete(p.id)} className="rounded-full border border-transparent bg-red-900/10 text-red-900 px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-red-900/20 transition">Delete</button>
                 </div>
              </div>
            ))}

            {activeTab === 'ongoing' && ongoingProjects.map(p => (
              <div key={p.id} className="rounded-3xl border border-[#B8A792] bg-white/40 backdrop-blur-sm p-6 flex gap-6 items-center shadow-sm hover:shadow-md transition">
                 <div className="w-24 h-24 rounded-2xl border border-white/30 bg-[#E8DED1]/60 flex items-center justify-center flex-shrink-0">
                   <span className="text-[#9D8C79] uppercase text-[10px] tracking-widest">In Progress</span>
                 </div>
                 <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-2xl text-[#4E4E4A] truncate">{p.name}</h3>
                    <p className="text-sm text-[#665E57] mt-1 line-clamp-1">{p.description}</p>
                    <p className="text-[11px] text-[#9D8C79] mt-3 uppercase tracking-widest">{p.location} &middot; {p.area} &middot; {p.year}</p>
                 </div>
                 <div className="flex flex-col gap-3 shrink-0">
                   <button onClick={() => handleEdit(p)} className="rounded-full border border-[#4E4E4A] bg-transparent px-6 py-2.5 text-[11px] uppercase tracking-widest text-[#4E4E4A] hover:bg-[#4E4E4A] hover:text-white transition">Edit</button>
                   <button onClick={() => handleDelete(p.id)} className="rounded-full border border-transparent bg-red-900/10 text-red-900 px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-red-900/20 transition">Delete</button>
                 </div>
              </div>
            ))}

            {(activeTab === 'completed' && completedProjects.length === 0) && <p className="text-gray-500 italic p-10 text-center">No portfolio projects found.</p>}
            {(activeTab === 'ongoing' && ongoingProjects.length === 0) && <p className="text-gray-500 italic p-10 text-center">No ongoing projects currently tracked.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
