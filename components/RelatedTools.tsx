// components/RelatedTools.tsx
import Link from 'next/link';
import { toolRegistry } from '@/lib/tools-registry';

interface RelatedToolsProps {
  currentToolSlug: string;
}

export function RelatedTools({ currentToolSlug }: RelatedToolsProps) {
  const relatedTools = toolRegistry.filter(
    (tool) => tool.category === 'productivity' && tool.slug !== currentToolSlug
  ).slice(0, 3); // Get up to 3 related tools

  if (relatedTools.length === 0) {
    return (
      <div className="text-center text-EPU-secondary-light/70 py-8">
        <p>No other related productivity tools found at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {relatedTools.map((tool) => (
        <Link href={tool.path} key={tool.slug} className="block">
          <div className="bg-EPU-primary/10 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-EPU-primary/40 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-EPU-primary mb-2">{tool.name}</h3>
              <p className="text-EPU-secondary-light text-sm mb-4">{tool.description}</p>
            </div>
            <div className="text-right mt-4">
              <span className="inline-flex items-center text-EPU-secondary hover:text-EPU-primary transition-colors">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
