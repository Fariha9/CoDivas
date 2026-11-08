import React from 'react';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, Code2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content">

      <div className="h-px bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-60" />

      {/* MAIN FOOTER BODY */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <Code2 className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-extrabold tracking-tight">
              Co<span className="text-purple-400">Divas</span>
            </span>
          </Link>
          <p className="text-sm text-neutral-content/60 leading-relaxed max-w-xs">
            Empowering learners with world-class coding courses, quizzes, and hands-on challenges. Built for the next generation of developers.
          </p>

          {/* Newsletter mini-CTA */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full max-w-xs">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent text-sm outline-none w-full placeholder:text-neutral-content/30"
              />
            </div>
            <button className="btn btn-sm bg-purple-500 hover:bg-purple-400 text-white border-none rounded-lg px-3 shrink-0 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Column 2 — Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
              Platform
            </p>
            {/* ✂️ Blogs removed from footer map array to prevent redundancy */}
            {[
              { label: 'Courses', to: '/courses' },
              { label: 'Quizzes', to: '/quizzes' },
              { label: 'Dashboard', to: '/dashboard' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="group flex items-center gap-1 text-sm text-neutral-content/60 hover:text-white transition-colors py-0.5 w-fit"
              >
                <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-purple-400">›</span>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
              Company
            </p>
            {[
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Terms of Use', to: '/terms' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="group flex items-center gap-1 text-sm text-neutral-content/60 hover:text-white transition-colors py-0.5 w-fit"
              >
                <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-purple-400">›</span>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
            Join the Community
          </p>
          <p className="text-sm text-neutral-content/60 leading-relaxed">
            Follow us for coding tips, course updates, and community highlights.
          </p>

          <div className="flex flex-col gap-2 mt-1">
            {[
              { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/', color: 'hover:text-blue-400' },
              { icon: <FaFacebook />, label: 'Facebook', href: 'https://www.facebook.com/', color: 'hover:text-blue-500' },
              { icon: <FaXTwitter />, label: 'X (Twitter)', href: 'https://x.com/', color: 'hover:text-white' },
              { icon: <FaYoutube />, label: 'YouTube', href: 'https://www.youtube.com/', color: 'hover:text-red-500' },
            ].map(({ icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between group text-sm text-neutral-content/60 ${color} transition-colors duration-200 py-1 border-b border-white/5`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{icon}</span>
                  {label}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom part */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-neutral-content/40">
            © {currentYear} CoDivas Ltd. All rights reserved.
          </p>
          <p className="text-xs text-neutral-content/30">
            Made with <span className="text-purple-400">♥</span> for learners everywhere
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;