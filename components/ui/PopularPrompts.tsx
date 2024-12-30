import React from 'react';
const PopularPrompts = () => {
  const prompts = [
    { number: '#1', text: 'Case study' },
    { number: '#2', text: 'Business' },
    { number: '#3', text: 'Programming' },
    { number: '#4', text: 'SEO' },
    { number: '#5', text: 'Marketing' },
    { number: '#6', text: 'Design' },
  ];

  return (
    <div>
      <h2 className="text-white text-xl font-light mb-4">Popular prompt</h2>
      <div className="flex flex-wrap gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-gray-400 text-sm">{prompt.number}</span>
            <span>{prompt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularPrompts;