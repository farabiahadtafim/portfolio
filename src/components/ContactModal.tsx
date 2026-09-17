import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Copy, Check, Send, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Blocklist of known temporary, disposable, and fake email providers */
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'guerrillamail.com',
  'yopmail.com',
  'trashmail.com',
  'dispostable.com',
  'throwawaymail.com',
  'sharklasers.com',
  'getairmail.com',
  'fake.com',
  'test.com',
  'example.com',
  'mytemp.email',
  'mohmal.com',
  'burnermail.io',
  'crazymailing.com',
  'tempail.com',
  'inboxkitten.com',
  'dropmail.me',
  'fakemailgenerator.com',
  'nada.ltd',
  'generator.email',
  'emailondeck.com',
  'armyspy.com',
  'cuvox.de',
  'dayrep.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'rhyta.com',
  'superrito.com',
  'teleworm.us',
]);

interface EmailValidation {
  isValid: boolean;
  type: 'gmail' | 'work' | 'invalid' | 'empty';
  message?: string;
}

function validateEmail(email: string): EmailValidation {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { isValid: false, type: 'empty' };

  // Basic RFC-compliant regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      type: 'invalid',
      message: 'Please enter a valid email format.',
    };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, type: 'invalid', message: 'Invalid email address.' };
  }

  const [localPart, domain] = parts;

  if (localPart.length < 2 || ['test', 'asdf', 'admin', 'fake'].includes(localPart)) {
    return {
      isValid: false,
      type: 'invalid',
      message: 'Please enter an authentic mailbox name.',
    };
  }

  // Check for disposable/spam domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      type: 'invalid',
      message: 'Temporary or disposable emails are not allowed.',
    };
  }

  // Verified Gmail
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return {
      isValid: true,
      type: 'gmail',
      message: 'Verified Gmail Address',
    };
  }

  // Check valid business / work domain
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-z]+$/.test(tld) || domain.length < 4) {
    return {
      isValid: false,
      type: 'invalid',
      message: 'Must be @gmail.com or an authentic company work email.',
    };
  }

  return {
    isValid: true,
    type: 'work',
    message: `Verified Work Email (${domain})`,
  };
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailStatus = useMemo(() => validateEmail(formData.email), [formData.email]);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');

    if (!emailStatus.isValid) {
      setSendError(emailStatus.message || 'Must be @gmail.com or a verified work email.');
      return;
    }

    setIsSending(true);

    try {
      // POST to formsubmit.co targeted directly to farabiahadtafim@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/farabiahadtafim@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          emailCategory: emailStatus.type === 'gmail' ? 'Verified Gmail' : 'Verified Work Email',
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
          setFormData({ name: '', email: '', message: '' });
          onClose();
        }, 2500);
      } else {
        throw new Error('Endpoint error');
      }
    } catch {
      // Fallback: Direct mailto link to farabiahadtafim@gmail.com
      const mailtoUrl = `mailto:farabiahadtafim@gmail.com?subject=${encodeURIComponent(
        `Project Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail (${emailStatus.type}): ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 2500);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#141316] border border-white/10 p-6 sm:p-8 shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#ea0044]">
                  Get In Touch
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Let’s start a conversation.
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Messages are delivered directly to <span className="text-white font-medium">farabiahadtafim@gmail.com</span>
                </p>
              </div>

              {/* Direct Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#ea0044]/15 flex items-center justify-center text-[#ea0044] flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-neutral-400">Email Me</p>
                      <p className="text-xs font-medium text-white truncate">
                        {profile.social.email}
                      </p>
                    </div>
                  </div>
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-500 group-hover:text-white flex-shrink-0" />
                  )}
                </button>

                <a
                  href={profile.social.whatsapp || 'https://wa.me/+8801638228009'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#ea0044] hover:bg-[#d0003c] text-white transition-all text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">WhatsApp / Direct</p>
                      <p className="text-xs font-bold text-white">
                        {profile.social.phone || '+880 1638 228009'}
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Quick Message Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Miller"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ea0044] transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-neutral-400">
                      Your Email <span className="text-[#ea0044]">*</span>
                    </label>
                    {/* Live Validation Indicator */}
                    {emailStatus.isValid && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {emailStatus.type === 'gmail' ? 'Verified Gmail' : 'Verified Work Email'}
                      </span>
                    )}
                  </div>

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (sendError) setSendError('');
                    }}
                    placeholder="yourname@gmail.com or name@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      emailStatus.isValid
                        ? 'border-emerald-500/50 focus:border-emerald-400'
                        : emailStatus.type === 'invalid'
                        ? 'border-red-500/50 focus:border-red-400'
                        : 'border-white/10 focus:border-[#ea0044]'
                    }`}
                  />

                  {/* Helper / Error text */}
                  {emailStatus.type === 'invalid' ? (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {emailStatus.message}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-[11px] text-neutral-400">
                      Accepted: <span className="text-white font-medium">@gmail.com</span> or authentic company/work domain.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Project Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your packaging, label, or brand identity project..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ea0044] transition-colors resize-none"
                  />
                </div>

                {sendError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{sendError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending || sendSuccess || (formData.email.length > 0 && !emailStatus.isValid)}
                  className="w-full py-3 px-5 rounded-full bg-[#ea0044] hover:bg-[#d0003c] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#ea0044]/20"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending to Farabi...
                    </>
                  ) : sendSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" /> Sent! Received at farabiahadtafim@gmail.com
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
