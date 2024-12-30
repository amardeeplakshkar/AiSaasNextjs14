import React from 'react';
import { ArrowRight, LucideProps } from 'lucide-react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  iconColor?: string;
  href: string;
}

const FeatureCard = ({ icon : Icon, title, href, iconColor = 'text-orange-400' }: FeatureCardProps) => {
  return (
    <Link href={href} className="feature-card bg-white/5 hover:bg-white/10 rounded-2xl p-4 relative group cursor-pointer">
      <div className={`${iconColor} mb-3 text-2xl`}><Icon/></div>
      <div className="space-y-1">
        <h3 className="text-white text-lg font-light">{title}</h3>
      </div>
      <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-5 h-5 text-white" />
      </div>
    </Link>
  );
};

export default FeatureCard;