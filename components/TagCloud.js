'use client';

import { useState, useEffect, useMemo } from 'react';
import TagLink from './TagLink';
import Spinner from './Spinner';

export default function TagCloud({
  tags: tagsCommon,
  selectedTags,
  filteredArticles,
}) {
  const [tagSizes, setTagSizes] = useState({});
  const tags = useMemo(() => ({ ...tagsCommon }), [tagsCommon]);
  selectedTags.forEach((tag) => {
    delete tags[tag];
  });

  useEffect(() => {
    const maxCount = Math.max(...Object.values(tags));
    const minCount = Math.min(...Object.values(tags));
    const sizeRange = 0.6; // Разница между минимальным и максимальным размером шрифта

    const sizes = {};
    for (const [tag, count] of Object.entries(tags)) {
      const size =
        0.65 + ((count - minCount) / (maxCount - minCount)) * sizeRange;
      sizes[tag] = size;
    }
    setTagSizes(sizes);
  }, [tags]);
  // console.log(Object.keys(tagSizes));

  return Object.keys(tagSizes).length === 0 ? (
    <Spinner />
  ) : (
    <div className="flex flex-wrap gap-2 justify-center mb-1">
      {Object.entries(tags).map(([tag, count]) => (
        <TagLink
          tag={tag}
          count={count}
          tagSize={tagSizes[tag]}
          selectedTags={selectedTags}
          key={tag}
          filteredArticles={filteredArticles}
          color="bg-gray-100 hover:bg-gray-200"
        />
      ))}
    </div>
  );
}
