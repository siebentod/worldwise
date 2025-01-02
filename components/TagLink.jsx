'use client';

import { useRouter, useSearchParams } from 'next/navigation';

function TagLink({
  tag,
  count,
  tagSize = null,
  selectedTags = [],
  filteredArticles,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hidden =
    filteredArticles &&
    filteredArticles.filter((article) => article.tags.includes(tag)).length ===
      0;

  const handleTagClick = () => {
    if (selectedTags.includes(tag)) return;
    const updatedTags = [...selectedTags, tag];
    const newTags = updatedTags.join(' ');

    const params = new URLSearchParams(searchParams.toString());
    params.set('tags', newTags);
    router.push(`?${params.toString()}`);
  };

  return (
    <button
      key={tag}
      onClick={handleTagClick}
      className="bg-gray-200 px-2 py-1 rounded transition-all hover:bg-gray-300 items-center"
      style={{
        fontSize: `${tagSize || 1}rem`,
        display: hidden ? 'none' : 'inherit',
      }}
    >
      {tag}
      {count !== undefined && ` (${count})`}
    </button>
  );
}

export default TagLink;
