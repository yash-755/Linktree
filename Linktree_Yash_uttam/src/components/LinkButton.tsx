import { forwardRef, ComponentType, SVGProps } from 'react';

interface LinkButtonProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  delay?: number;
}

/**
 * LinkButton Component
 * 
 * A reusable button component for social media and portfolio links.
 * Features:
 * - Icon and label display
 * - Hover effects (scale and color change)
 * - Staggered fade-in animation support via 'delay' prop
 * - Glassmorphism styling
 */
const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ icon: Icon, label, href, delay = 0 }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-2.5 group opacity-0 animate-fade-in"
        style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full glass-effect neon-button flex items-center justify-center group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-foreground/80 group-hover:text-primary transition-colors" />
        </div>
        <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium tracking-wide">
          {label}
        </span>
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
