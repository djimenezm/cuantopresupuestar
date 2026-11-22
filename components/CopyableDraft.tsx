'use client';

import { useId, useRef, useState } from 'react';
import styles from './DraftEditor.module.css';

type CopyableDraftProps = { text: string; label: string; copyLabel: string };
type CopyStatus = 'copying' | 'copied' | 'manual';

const copyMessages: Record<CopyStatus, string> = {
  copying: 'Copiando borrador…',
  copied: 'Borrador copiado.',
  manual: 'Texto seleccionado. Cópialo manualmente con el teclado o el menú de tu dispositivo.',
};

export default function CopyableDraft({ text, label, copyLabel }: CopyableDraftProps) {
  const previewId = useId();
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const [copyStatus, setCopyStatus] = useState<CopyStatus | null>(null);

  async function copyDraft() {
    const preview = previewRef.current;
    if (!preview || !text) return;

    setCopyStatus('copying');
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(preview.value);
        copied = true;
      }
    } catch {
      // Keep the draft available for manual copying when clipboard access is denied.
    }

    if (previewRef.current !== preview) return;
    if (!copied) {
      preview.focus();
      preview.select();
    }
    setCopyStatus(copied ? 'copied' : 'manual');
  }

  return (
    <>
      <div className={styles.preview}>
        <label htmlFor={previewId}>{label}</label>
        <textarea id={previewId} ref={previewRef} rows={12} value={text} readOnly />
        <button type="button" className="primary-button" onClick={copyDraft} disabled={copyStatus === 'copying'}>
          {copyLabel}
        </button>
      </div>
      <div role="status" className={styles.status}>
        {copyStatus && copyMessages[copyStatus]}
      </div>
    </>
  );
}
