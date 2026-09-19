import { Github, Instagram, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

type SocialLink = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
}

export default function SocialLinks({
  className = '',
  iconClassName = 'h-4 w-4',
  showLabels = false,
}: SocialLinksProps) {
  const { profile } = usePortfolio();
  const { social } = profile;

  const rawLinks = [
    { label: 'LinkedIn', href: social.linkedin, Icon: Linkedin },
    { label: 'GitHub', href: social.github, Icon: Github },
    { label: 'Instagram', href: social.instagram, Icon: Instagram },
    { label: 'Email', href: social.email ? `mailto:${social.email}` : undefined, Icon: Mail },
  ];

  const links: SocialLink[] = rawLinks
    .filter((l): l is { label: string; href: string; Icon: LucideIcon } => Boolean(l.href))
    .map((l) => ({ label: l.label, href: l.href, Icon: l.Icon }));

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
          className="inline-flex items-center justify-center gap-1.5 rounded-full p-2.5 bg-white/5 hover:bg-[#bb031c] text-white transition-all duration-200"
        >
          <Icon className={iconClassName} strokeWidth={2} />
          {showLabels ? (
            <span className="text-xs font-medium tracking-wide">
              {label}
            </span>
          ) : null}
        </a>
      ))}
    </div>
  );
}
