interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
        {title}
      </h3>
      <p className="text-surface-600 dark:text-surface-400 text-sm">
        {description}
      </p>
    </div>
  );
}
