import { Linkedin, Dribbble, Github, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black min-h-[50vh] py-32 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative gradient blob - optional but adds to "high-impact" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="font-sans font-extrabold text-white text-4xl md:text-6xl lg:text-[90px] leading-tight tracking-tight mb-12">
          Let&apos;s build something <br className="hidden md:block" />
          scalable together.
        </h2>

        <div className="flex items-center justify-center gap-8 md:gap-10">
          <SocialLink href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
          <SocialLink href="https://dribbble.com" icon={<Dribbble />} label="Dribbble" />
          <SocialLink href="https://github.com" icon={<Github />} label="GitHub" />
          <SocialLink href="https://instagram.com" icon={<Instagram />} label="Instagram" />
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-400 hover:text-white transition-all duration-300 hover:scale-110"
      aria-label={label}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 [&>svg]:w-full [&>svg]:h-full">
        {icon}
      </div>
    </Link>
  );
};

export default Footer;
