import React from 'react';
import { Trash2, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-white mr-2">
                <Trash2 size={20} />
              </div>
              <span className="text-xl font-bold text-white">Ravfia</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional bin cleaning services that keep your home healthy and your neighborhood smelling fresh. Eco-friendly and affordable.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Residential Cleaning</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Commercial Dumpsters</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Power Washing</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Sanitization</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center"><MapPin size={16} className="mr-2 text-emerald-500" /> 8035 Torremolinos Ave, Las Vegas, NV 89178</li>
              <li className="flex items-center"><Phone size={16} className="mr-2 text-emerald-500" /> 725-206-9742</li>
              <li className="flex items-center"><Mail size={16} className="mr-2 text-emerald-500" /> hello@ravfia.com</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold uppercase text-sm tracking-wider">Find Us</h3>
            <div className="w-full h-40 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=8035+Torremolinos+Ave,+Las+Vegas,+NV+89178&t=&z=13&ie=UTF8&iwloc=&output=embed"
                title="Ravfia Location"
                loading="lazy"
              ></iframe>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded hover:bg-emerald-600 hover:text-white transition-colors"><Facebook size={18} /></a>
              <a href="#" className="bg-slate-800 p-2 rounded hover:bg-emerald-600 hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="bg-slate-800 p-2 rounded hover:bg-emerald-600 hover:text-white transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Ravfia Bin Cleaning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;