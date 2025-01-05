import React from "react";
interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = () => {

    return (
       <div className="mathjax">
           \( a^2 + b^2 = c^2 \)
       </div>
    );
};

export default MarkdownRenderer;
