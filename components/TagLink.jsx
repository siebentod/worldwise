'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { spaceToHyphen } from '@/lib/space-and-hyphen';

function TagLink({
  tag,
  count,
  tagSize = null,
  selectedTags = [],
  filteredArticles,
  color = '',
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tagCount = {};
  if (filteredArticles)
    filteredArticles.forEach((article) => {
      article.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

  const hidden =
    filteredArticles &&
    filteredArticles.filter((article) => article.tags.includes(tag)).length < 2;
  // filteredArticles.filter((article) => article.tags.includes(tag)).length === 0;

  const handleTagClick = () => {
    if (selectedTags.includes(tag)) return;
    const updatedTags = [...selectedTags, spaceToHyphen(tag)];
    console.log(selectedTags);
    const tagsToUrl = updatedTags.map(spaceToHyphen);
    const newTags = tagsToUrl.join(' ');

    const params = new URLSearchParams(searchParams.toString());
    params.set('tags', newTags);
    router.push(`?${params.toString()}`);
  };

  return (
    count > 1 && (
      <button
        key={tag}
        onClick={handleTagClick}
        className={`bg-gray-200 px-2 py-1 rounded transition-all hover:bg-gray-300 items-center ${color}`}
        style={{
          fontSize: `${tagSize || 1}rem`,
          display: hidden ? 'none' : 'inherit',
        }}
      >
        {tag}
        {/* {count !== undefined && filteredArticles && ` (${count})`} */}
        {tagCount[tag] && ` (${tagCount[tag]})`}
      </button>
    )
  );
}

export default TagLink;
