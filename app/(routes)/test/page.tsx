'use client'

import React from 'react';
import { usePollinationsText } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.css';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

const TextComponent = () => {
  const text = usePollinationsText("give me 10 tan and sin formulas trignometry", {
    seed: 42,
    model: 'openai',
    systemPrompt: "You are a helpful AI assistant. When writing mathematical formulas, use LaTeX syntax with single dollar signs for inline math and double dollar signs for display math."
  });

  return (
    <div className="p-4">
      {text ? (
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm, remarkToc]}
          rehypePlugins={[rehypeKatex]}
          components={{
          }}
        >
          {text}
        </ReactMarkdown>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default TextComponent;
