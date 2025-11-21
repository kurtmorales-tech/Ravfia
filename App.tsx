import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Calendar, 
  Droplets, 
  Truck, 
  Star, 
  ArrowRight, 
  Plus, 
  Loader2,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Trash2,
  HelpCircle,
  Clock,
  Check,
  Leaf,
  StarHalf,
  MapPin,
  Phone,
  Mail,
  Tag,
  X
} from 'lucide-react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import BlackFridayPopup from './components/BlackFridayPopup';
import { generateBlogPost } from './services/geminiService';
import { BlogPost, ServicePlan, Testimonial } from './types';

// --- Mock Data ---
const SERVICES: ServicePlan[] = [
  {
    id: 'one-time',
    name: 'One-Time Clean',
    price: '$35',
    frequency: 'Single Service',
    features: ['High-pressure wash', 'Deodorizing', 'Eco-friendly sanitizer', 'Curbside service'],
    recommended: false,
  },
  {
    id: 'monthly',
    name: 'Monthly Fresh',
    price: '$15',
    frequency: 'Per Month / Bin',
    features: ['12 cleans per year', 'Lowest price per clean', 'Automatic scheduling', 'Bill monthly'],
    recommended: true,
  },
  {
    id: 'quarterly',
    name: 'Quarterly Deep',
    price: '$25',
    frequency: 'Per Quarter / Bin',
    features: ['4 cleans per year', 'Seasonal maintenance', 'Deep scrub', 'Flexible scheduling'],
    recommended: false,
  },
];

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Why Hosing Your Bin Isn’t Enough',
    excerpt: 'Think a garden hose does the trick? Think again. Learn about the bacteria lurking in your wheelie bin.',
    content: '<p>Many homeowners believe that a quick spray with the garden hose is sufficient to keep their trash bins clean. However, low-pressure cold water does little to remove the biofilm where harmful bacteria like Salmonella, E. coli, and Listeria thrive.</p><p>At Ravfia, we use 200°F water at high pressure to blast away grime and kill 99.9% of bacteria, ensuring your family stays safe and your garage smells fresh.</p>',
    date: 'Oct 12, 2023',
    author: 'Ravfia Team',
    imageUrl: 'https://picsum.photos/seed/bin1/800/600',
    category: 'Tips'
  },
  {
    id: '2',
    title: 'The Environmental Impact of Dirty Bins',
    excerpt: 'Runoff from cleaning your own bins can harm the local ecosystem. Here is how we do it responsibly.',
    content: '<p>When you wash your bin in the driveway, the dirty water—filled with grease, chemicals, and bacteria—often flows directly into the storm drains. This untreated water eventually reaches our rivers and oceans.</p><p>Ravfia uses a self-contained cleaning system on our trucks. We collect all the wastewater and dispose of it properly at authorized treatment facilities, protecting our local waterways.</p>',
    date: 'Nov 05, 2023',
    author: 'Eco Expert',
    imageUrl: 'https://picsum.photos/seed/nature/800/600',
    category: 'Eco-Friendly'
  },
  {
    id: '3',
    title: 'We Are Expanding to Summerlin!',
    excerpt: 'Good news for Las Vegas residents! Ravfia is now serving the entire Summerlin area.',
    content: '<p>We have received countless requests from residents in Summerlin, and we are happy to announce that our routes now cover the area. Sign up today to get your bins cleaned by the pros.</p>',
    date: 'Dec 15, 2023',
    author: 'Ravfia Team',
    imageUrl: 'https://picsum.photos/seed/summerlin/800/600',
    category: 'Company Updates'
  }
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Javier M.", role: "Monthly Plan", text: "The smell was unbearable in the summer heat. RavFia completely eliminated the odor on the first visit. Their monthly service is so convenient—I don't even have to think about it anymore.", rating: 5 },
  { id: 2, name: "Sophia L.", role: "Quarterly Plan", text: "We were struggling with flies and maggots. RavFia's hot water system solved the issue instantly. Our bins look brand new again. Highly recommended!", rating: 5 },
  { id: 3, name: "Robert C.", role: "One-Time Clean", text: "Excellent value for money. They show up right after the trash truck comes, clean it out, and put it back. Seamless and professional.", rating: 5 },
];

// --- Page Components ---

const HomePage: React.FC = () => (
  <div className="bg-slate-50">
    {/* Hero Section */}
    <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/water/1920/1080')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-5 duration-700">
            The Smarter Way to <span className="text-emerald-400">Clean Bins</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            We kill 99.9% of bacteria and eliminate odors using high-pressure, eco-friendly hot water. No mess, no stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
            <Link to="/services" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-center transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-1 hover:scale-105 active:scale-95">
              See Pricing
            </Link>
            <Link to="/contact" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Ravfia?</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">We bring the cleaning plant to your curb. Our self-contained trucks ensure a spotless clean without the runoff.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Droplets size={32} />, title: "High Pressure & Hot Water", desc: "200°F water eliminates grime that cold hoses can't touch." },
            { icon: <ShieldCheck size={32} />, title: "Sanitized & Deodorized", desc: "Hospital-grade eco-friendly disinfectants kill harmful bacteria." },
            { icon: <Truck size={32} />, title: "Eco-Friendly Process", desc: "We capture all dirty water and dispose of it responsibly." }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 hover:-translate-y-2 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-20 bg-emerald-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-emerald-200 -z-10 transform -translate-y-1/2"></div>

          {[
            { icon: <Calendar size={24} />, title: "Book Online", desc: "Select your plan and service day in under 2 minutes." },
            { icon: <Trash2 size={24} />, title: "Leave Bins Out", desc: "Leave your empty bins at the curb after trash collection." },
            { icon: <Truck size={24} />, title: "We Clean", desc: "Our truck lifts, cleans, sanitizes, and deodorizes on the spot." },
            { icon: <Sparkles size={24} />, title: "Enjoy Clean", desc: "We tag your bin to let you know it's fresh and ready to use." }
          ].map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-emerald-500 group-hover:scale-110 transition-all duration-300 z-10">
                <div className="text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed px-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3">
                    Eco-Friendly & Reliable
                </h2>
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                    Why Neighbors Trust Ravfia
                </h3>
                <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                    Join hundreds of happy homeowners who have switched to the greener, cleaner way to manage their bins.
                </p>
            </div>

            {/* Testimonial Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(t.rating) ? "currentColor" : "none"} className={i < Math.floor(t.rating) ? "text-yellow-400" : "text-slate-300"} />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-3">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{t.name}</h4>
                      <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </section>
  </div>
);

const ServicesPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-600">Choose the schedule that fits your needs. No contracts, cancel anytime.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {SERVICES.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
              plan.recommended 
                ? 'bg-white border-2 border-emerald-500 shadow-2xl scale-105 z-10' 
                : 'bg-white border border-slate-200 shadow-lg hover:-translate-y-2'
            }`}
          >
            {plan.recommended && (
              <div className="bg-emerald-500 text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              <p className="text-slate-500 mt-2 text-sm font-medium">{plan.frequency}</p>
              <div className="my-6">
                <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.id !== 'one-time' && <span className="text-slate-500 font-medium">/mo</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="text-emerald-500 mr-3 flex-shrink-0" size={20} />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/contact" 
                className={`block w-full py-4 rounded-xl text-center font-bold transition-all duration-300 ${
                  plan.recommended 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30' 
                    : 'bg-slate-100 text-slate-800 hover:bg-emerald-100 hover:text-emerald-700'
                }`}
              >
                Choose Plan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState<string | null>(null);

  const CATEGORIES = ['All', 'Tips', 'News', 'Eco-Friendly', 'Company Updates'];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const newContent = await generateBlogPost(topic);
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: newContent.title,
        excerpt: newContent.excerpt,
        content: newContent.content,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author: 'AI Contributor',
        imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`,
        category: newContent.category || 'News'
      };
      setPosts([newPost, ...posts]);
      setTopic('');
    } catch (err) {
      console.error(err);
      setError("Could not generate blog post. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Cleaning Tips & News</h1>
            <p className="text-slate-600 mt-2">Expert advice on home hygiene and sustainability.</p>
          </div>
          
          {/* Admin Generator */}
          <div className="w-full md:w-auto bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-2">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic to generate..."
              className="flex-1 md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium transition-colors"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
              <span>Generate</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 transition-colors p-1">
              <X size={18} />
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-200">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat 
                ? 'bg-emerald-600 text-white shadow-md transform scale-105' 
                : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col relative group">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-emerald-700 uppercase tracking-wide shadow-sm flex items-center gap-1 border border-emerald-100">
                  <Tag size={12} /> {post.category}
                </span>
              </div>
              
              <div className="h-64 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium uppercase tracking-wide">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors cursor-pointer">{post.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                <div dangerouslySetInnerHTML={{__html: post.content}} className="hidden" />
                <button className="text-emerald-600 font-bold text-sm uppercase tracking-wide hover:text-emerald-700 flex items-center self-start group/btn">
                  Read Article <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    plan: 'monthly',
    date: '',
    time: 'anytime',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after demo
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', address: '', plan: 'monthly', date: '', time: 'anytime', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 py-10 px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
            <p className="text-slate-400">Fill out the form below to schedule your first cleaning.</p>
          </div>
          
          {submitted ? (
            <div className="p-12 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h2>
              <p className="text-slate-600">We'll be in touch shortly to confirm your appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Service Address</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="123 Clean Street, Las Vegas, NV"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - {s.price}</option>
                  ))}
                </select>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pl-10 text-slate-600"
                    />
                    <Calendar className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time</label>
                  <div className="relative">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all appearance-none pl-10 bg-white text-slate-600"
                    >
                      <option value="anytime">Anytime (8am - 5pm)</option>
                      <option value="morning">Morning (8am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 5pm)</option>
                    </select>
                    <Clock className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="Gate codes, dogs, specific instructions..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group"
              >
                <span>Submit Booking Request</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
        <Navigation />
        <BlackFridayPopup />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <