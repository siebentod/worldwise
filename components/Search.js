'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { hyphenToSpace } from '@/lib/space-and-hyphen';

export default function Search({ searchQuery, selectedTags }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    // router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const searchHandle = (value) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchTerm(''); // Сбрасываем значение поиска
  };

  const removeTag = (tag) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    const newTags = updatedTags.join(' ');

    const params = new URLSearchParams(searchParams.toString());
    if (newTags) {
      params.set('tags', newTags);
    } else {
      params.delete('tags');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => searchHandle(e.target.value)}
          placeholder="Search articles..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        {/* <button
          className="float-right text-red-500 hover:text-red-700 text-2xl"
          onClick={clearSearch}
        >
          ×
        </button> */}
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex gap-2 items-center ">
          {selectedTags.map((tag) => (
            <span
              onClick={() => removeTag(tag)}
              key={tag}
              className="group flex items-center  pl-2 pr-1.5 py-1 rounded transition-all bg-gray-200 hover:bg-gray-300 h-max cursor-pointer"
            >
              {tag}
              <span className="group-hover:text-black ml-1 float-right text-gray-500">
                ×
              </span>
            </span>
          ))}
        </div>
      </div>
      {/* <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button> */}
    </form>
  );
}
