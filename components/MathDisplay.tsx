'use client'

import React from 'react';
import ReactMarkdown from "react-markdown";
import { MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
};

interface MathDisplayProps {
  math: string; 
}

const MathDisplay: React.FC<MathDisplayProps> = ({ math }) => {
  const wrappedMath = `$$${math}$$`; 

  return (
    <MathJaxContext config={config}>
      <div className="output">
          <ReactMarkdown>{wrappedMath}</ReactMarkdown>
      </div>
    </MathJaxContext>
  );
};

export default MathDisplay;
