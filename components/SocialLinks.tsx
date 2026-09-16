import { SocialIcon } from "@/components/icons/SocialIcons";
import { socialItems } from "@/lib/social";

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <ul className={`social-links ${className}`.trim()} aria-label="Social media">
      {socialItems.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={item.label}
          >
            <span className="social-link__ring" aria-hidden="true" />
            <SocialIcon id={item.id} className="social-link__icon" />
          </a>
        </li>
      ))}
    </ul>
  );
}
