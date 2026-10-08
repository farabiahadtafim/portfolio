import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, Loader2, Calendar, Linkedin, Dribbble, MessageCircle, Clock, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'temp-mail.org', '10minutemail.com',
  'guerrillamail.com', 'yopmail.com', 'trashmail.com', 'dispostable.com',
  'throwawaymail.com', 'sharklasers.com', 'getairmail.com', 'fake.com',
  'test.com', 'example.com', 'mytemp.email'
]);

interface EmailValidation {
  isValid: boolean;
  type: 'gmail' | 'work' | 'invalid' | 'empty';
  message?: string;
}

function validateEmail(email: string): EmailValidation {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { isValid: false, type: 'empty' };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, type: 'invalid', message: 'Please enter a valid email format.' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) return { isValid: false, type: 'invalid', message: 'Invalid email address.' };
  
  const [localPart, domain] = parts;
  if (localPart.length < 2 || ['test', 'asdf', 'admin', 'fake'].includes(localPart)) {
    return { isValid: false, type: 'invalid', message: 'Please enter an authentic mailbox name.' };
  }

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { isValid: false, type: 'invalid', message: 'Temporary or disposable emails are not allowed.' };
  }

  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return { isValid: true, type: 'gmail', message: 'Verified Gmail Address' };
  }

  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-z]+$/.test(tld) || domain.length < 4) {
    return { isValid: false, type: 'invalid', message: 'Must be @gmail.com or an authentic company work email.' };
  }

  return { isValid: true, type: 'work', message: `Verified Work Email (${domain})` };
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { profile } = usePortfolio();
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', 
    company: '',
    email: '', 
    projectType: '',
    budget: '',
    message: '' 
  });

  const emailStatus = useMemo(() => validateEmail(formData.email), [formData.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');

    if (!emailStatus.isValid) {
      setSendError(emailStatus.message || 'Must be @gmail.com or a verified work email.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/farabiahadtafim@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          emailCategory: emailStatus.type === 'gmail' ? 'Verified Gmail' : 'Verified Work Email',
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.name} (${formData.email})`,
          _replyto: formData.email,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
          setFormData({ name: '', company: '', email: '', projectType: '', budget: '', message: '' });
          onClose();
        }, 2500);
      } else {
        throw new Error('Endpoint error');
      }
    } catch {
      const mailtoUrl = `mailto:farabiahadtafim@gmail.com?subject=${encodeURIComponent(
        `Project Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setFormData({ name: '', company: '', email: '', projectType: '', budget: '', message: '' });
        onClose();
      }, 2500);
    } finally {
      setIsSending(false);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#bb031c] focus:border-[#bb031c] transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto w-full h-full flex flex-col"
        >
          {/* Close Button */}
          <div className="sticky top-0 z-50 flex justify-end p-6 bg-gradient-to-b from-[#0A0A0A] to-transparent pointer-events-none">
            <button
              onClick={onClose}
              className="pointer-events-auto p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/10 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 pb-24 -mt-10">
            
            {/* Hero Section */}
            <div className="max-w-3xl mb-16 pt-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-space font-bold text-white tracking-tight leading-[1.1] mb-6"
              >
                Ready to elevate <br className="hidden sm:block" /> your brand?
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-neutral-400 leading-relaxed max-w-2xl"
              >
                Currently taking on new projects. Available for remote partnerships worldwide. Fill out the form below or book a discovery call.
              </motion.p>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* Left Column - Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-7"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 ml-1">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={inputClasses}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 ml-1">Company / Brand</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className={inputClasses}
                    />
                    {formData.email && !emailStatus.isValid && emailStatus.type !== 'empty' && (
                      <p className="text-red-400 text-xs mt-1.5 ml-1">{emailStatus.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label className="text-sm font-medium text-white/70 ml-1">Project Type</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>Select Type</option>
                          <option value="Supplement Packaging">Supplement Packaging</option>
                          <option value="Box Design">Box Design</option>
                          <option value="Can Label">Can Label</option>
                          <option value="Pouch">Pouch</option>
                          <option value="3D Visualization">3D Visualization</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-sm font-medium text-white/70 ml-1">Estimated Budget (USD)</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>Select Budget</option>
                          <option value="$1k - $3k">$1k - $3k</option>
                          <option value="$3k - $5k">$3k - $5k</option>
                          <option value="$5k+">$5k+</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-1">Project Details</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your brand, goals, and timeline..."
                      rows={5}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {sendError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {sendError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending || sendSuccess}
                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#bb031c] text-white font-semibold text-lg transition-all duration-300 hover:bg-[#d90422] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(187,3,28,0.4)] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer overflow-hidden"
                  >
                    {sendSuccess ? (
                      <span className="flex items-center gap-2">
                        Message Sent! We'll talk soon.
                      </span>
                    ) : isSending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Right Column - Direct Info & Booking */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-5 space-y-8 lg:mt-8"
              >
                {/* Info Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-8">
                    <Clock className="w-3.5 h-3.5" />
                    Replies within 24-48 hours
                  </div>

                  <div className="space-y-6">
                    <a href="mailto:farabiahadtafim@gmail.com" className="flex items-start gap-4 group cursor-pointer w-fit">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#bb031c]/20 group-hover:border-[#bb031c]/30 group-hover:text-[#bb031c] transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400 mb-0.5">Email</p>
                        <p className="text-white font-medium group-hover:text-[#bb031c] transition-colors">farabiahadtafim@gmail.com</p>
                      </div>
                    </a>

                    <a href={profile.social.whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4 group cursor-pointer w-fit">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#bb031c]/20 group-hover:border-[#bb031c]/30 group-hover:text-[#bb031c] transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400 mb-0.5">WhatsApp</p>
                        <p className="text-white font-medium group-hover:text-[#bb031c] transition-colors">{profile.social.phone}</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Calendly Card */}
                <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-[#bb031c]/50 to-transparent overflow-hidden group">
                  <div className="absolute inset-0 bg-[#bb031c]/20 blur-2xl group-hover:bg-[#bb031c]/30 transition-colors duration-500" />
                  <div className="relative bg-[#0A0A0A]/90 backdrop-blur-xl rounded-[31px] p-8 h-full border border-[#bb031c]/20">
                    <div className="w-12 h-12 rounded-2xl bg-[#bb031c]/10 flex items-center justify-center mb-6">
                      <Calendar className="w-6 h-6 text-[#bb031c]" />
                    </div>
                    <h3 className="text-2xl font-space font-bold text-white mb-3 tracking-tight">Book a Discovery Call</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                      Want to discuss your project face-to-face? Book a direct 15-minute 1-on-1 call to see if we're a good fit.
                    </p>
                    <a
                      href="https://calendly.com/farabiahadtafim" 
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Book a Call
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Footer Area */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={profile.social.behance}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Behance"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.827 5.364 5.357h-7.796c.049 1.838 1.107 2.753 3.011 2.753 1.408 0 2.213-.672 2.62-1.515h2zM20.25 11.666c-.198-1.547-1.157-2.18-2.673-2.18-1.583 0-2.316.64-2.529 2.18h5.202zm-12.724 5.334c-1.396 0-2.526-.893-2.526-2.571 0-1.688 1.116-2.57 2.526-2.57 1.397 0 2.526.892 2.526 2.57 0 1.688-1.118 2.571-2.526 2.571m4.394-2.571c0 2.92-2.193 4.571-4.707 4.571h-5.213v-15h4.945c2.685 0 4.414 1.551 4.414 3.992 0 1.341-.66 2.55-1.996 3.197 1.517.659 2.557 1.868 2.557 3.24m-4.509-3.79c-1.282 0-2.361-.734-2.361-2.146 0-1.42 1.054-2.146 2.361-2.146 1.294 0 2.361.734 2.361 2.146 0 1.42-1.04 2.146-2.361 2.146"/></svg>
                </a>
                <a
                  href={profile.social.dribbble}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Dribbble"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <Dribbble className="w-4 h-4" />
                </a>
              </div>
              
              <div className="text-center sm:text-right w-full sm:max-w-sm">
                 <p className="text-neutral-500 text-[10px] sm:text-xs font-space uppercase tracking-widest leading-relaxed">
                   Let's Build Incredible <br className="sm:hidden" /> Work Together
                 </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
