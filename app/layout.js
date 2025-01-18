import HomeButton from '@/components/HomeButton';
import './index.css';

export const metadata = {
  title: 'WorldWise | Тексты о философии',
  description: 'Полезные тексты о философии в формате блога',
};

export const dynamicParams = true;

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <HomeButton />
        {children}
      </body>
    </html>
  );
}
