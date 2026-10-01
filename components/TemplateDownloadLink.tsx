'use client';

import type { ReactNode } from 'react';

const templateUrl = '/recursos/kit-presupuesto-freelance.txt';

export default function TemplateDownloadLink({ children }: { children: ReactNode }) {
  return (
    <a
      href={templateUrl}
      className="primary-button"
      download
      onClick={() => window.va?.('event', { name: 'budget_template_download_clicked' })}
    >
      {children}
    </a>
  );
}
