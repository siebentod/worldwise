'use client';

import ArticleList from '@/components/ArticleList';
import Search from '@/components/Search';
import TagCloud from '@/components/TagCloud';
import { useState } from 'react';

function App({ articles, tags, selectedTags: sel_tags, searchQuery }) {
  const [selectedTags, setSelectedTags] = useState(sel_tags);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <main className="container mx-auto p-4 min-h-screen">
          <h1 className="text-3xl font-bold mb-4">WorldWise</h1>
          <Search searchQuery={searchQuery} selectedTags={selectedTags} />
          <ArticleList articles={articles} />
        </main>
        <aside className="md:w-1/4">
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Популярные теги
            </h2>
            <TagCloud
              tags={tags}
              searchQuery={searchQuery}
              selectedTags={selectedTags}
            />
          </div>
        </aside>
      </div>
    </>
  );
}

export default App;
