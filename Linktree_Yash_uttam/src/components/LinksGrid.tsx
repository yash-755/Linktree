import LinkButton from './LinkButton';
import {
  LinkedInIcon,
  GitHubIcon,
  ResumeIcon,
  PortfolioIcon,
  HackerRankIcon,
  LeetCodeIcon,
  XIcon,
  KaggleIcon,
  TelegramIcon,
  InstagramIcon,
} from './icons/SocialIcons';

// Configuration for all social/portfolio links
const links = [
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-uttam' },
  { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/yash-755' },
  { icon: ResumeIcon, label: 'Resume', href: '/myresume.pdf' },
  { icon: PortfolioIcon, label: 'Portfolio', href: '#portfolio' },
  { icon: HackerRankIcon, label: 'HackerRank', href: 'https://www.hackerrank.com/profile/ur731084' },
  { icon: LeetCodeIcon, label: 'LeetCode', href: 'https://leetcode.com/u/Yash_Uttam/' },
  { icon: XIcon, label: 'X', href: 'https://x.com/yash_uttam__' },
  { icon: KaggleIcon, label: 'Kaggle', href: 'https://www.kaggle.com/yashuttam' },
  { icon: TelegramIcon, label: 'Telegram', href: 'https://t.me/botyash75' },
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/yash_uttam__' },
];

/**
 * LinksGrid Component
 * 
 * Renders a responsive grid of LinkButtons.
 * Adjusts column count based on screen size (2 cols on mobile, 5 on desktop).
 * Applies staggered animation delays to each button for a cascading entrance effect.
 */
const LinksGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-12 lg:gap-x-10 lg:gap-y-14 px-4 max-w-4xl mx-auto">
      {links.map((link, index) => (
        <LinkButton
          key={link.label}
          icon={link.icon}
          label={link.label}
          href={link.href}
          delay={300 + index * 80}
        />
      ))}
    </div>
  );
};

export default LinksGrid;
