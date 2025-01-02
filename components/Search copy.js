'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search({ searchQuery, selectedTags }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="relative w-full max-w-md border border-gray-300 rounded-md p-2">
        {/* Теги */}
        <div className="flex flex-wrap gap-2 items-center">
          {selectedTags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
            >
              {tag}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeTag(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          className="mt-2 w-full border-none outline-none focus:ring-0"
          placeholder="Введите тег и нажмите Enter"
        />

        {/* Кнопка X */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ×
        </button>
      </div>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
}
