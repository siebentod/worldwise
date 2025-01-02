import { getArticlesByTheme, getAllThemes } from '../../../lib/articles';
import ThemeArticles from '../../../components/ThemeArticles';

export async function generateStaticParams() {
  const themes = await getAllThemes();
  return themes.map((theme) => ({
    theme: theme,
  }));
}

export default async function ThemePage({ params }) {
  const articles = await getArticlesByTheme(params.theme);

  return (
    <div className="container mx-auto px-4">
      <ThemeArticles articles={articles} theme={params.theme} />
    </div>
  );
}
