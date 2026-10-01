import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import TemplateDownloadLink from '@/components/TemplateDownloadLink';

it('offers the public template and tracks a download click without personal data', async () => {
  window.va = vi.fn();
  render(<TemplateDownloadLink>Descargar plantilla</TemplateDownloadLink>);

  const link = screen.getByRole('link', { name: 'Descargar plantilla' });
  expect(link).toHaveAttribute('href', '/recursos/kit-presupuesto-freelance.txt');
  expect(link).toHaveAttribute('download');

  link.addEventListener('click', (event) => event.preventDefault());
  await userEvent.setup().click(link);
  expect(window.va).toHaveBeenCalledWith('event', { name: 'budget_template_download_clicked' });
});
