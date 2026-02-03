import type { ReactNode } from 'react';

export default function ContactCard({
  title,
  icon,
  children,
  action,
  highlight = false,
  className
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`card card-interactive flex h-full flex-col gap-4 p-4 sm:p-6 ${
        highlight ? 'border-secondary/40 bg-secondary/5' : ''
      } ${className || ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          {icon}
        </span>
        <div className="text-sm font-semibold text-text">{title}</div>
      </div>
      <div className="text-sm text-muted">{children}</div>
      {action ? <div className="mt-auto">{action}</div> : null}
    </div>
  );
}
