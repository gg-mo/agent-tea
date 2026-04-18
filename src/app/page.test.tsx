import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Home from './page';

describe('Home page', () => {
  it('renders the Agent Tea launch headline', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: /your ai has tea about you\./i,
      }),
    ).toBeInTheDocument();
  });

  it('reveals dual entry points only after start CTA click', () => {
    render(<Home />);

    expect(screen.queryByRole('heading', { name: /coding agents/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /chatbots/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /see what your ai thinks of you/i }));

    expect(screen.getByRole('heading', { name: /coding agents/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /chatbots/i })).toBeInTheDocument();
    expect(screen.getByText(/\/instructions\/coding-agent\.md/i)).toBeInTheDocument();
    expect(screen.getByText(/\/instructions\/chatbot\.md/i)).toBeInTheDocument();
  });

  it('renders a clear call to action for first-time users', () => {
    render(<Home />);

    expect(screen.getByRole('button', { name: /see what your ai thinks of you/i })).toBeInTheDocument();
  });

  it('reveals chatbot encoded input only after copying chatbot instruction', async () => {
    render(<Home />);
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    vi.stubGlobal(
      'fetch',
      vi.fn((input: RequestInfo) => {
        const url = typeof input === 'string' ? input : input.toString();
        if (url.endsWith('/instructions/chatbot.md')) {
          return Promise.resolve(new Response('# Agent Tea — Chatbot Instructions'));
        }
        return Promise.resolve(new Response(null, { status: 204 }));
      }),
    );

    fireEvent.click(screen.getByRole('button', { name: /see what your ai thinks of you/i }));

    expect(screen.queryByLabelText(/drop in your chatbot/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /copy chatbot instruction/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('heading', { name: /chatbots/i }));
    fireEvent.click(screen.getByRole('button', { name: /copy chatbot instruction/i }));

    await waitFor(() =>
      expect(screen.getByLabelText(/drop in your chatbot/i)).toBeInTheDocument(),
    );
  });
});
