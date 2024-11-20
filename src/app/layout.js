import { Faculty_Glyphic } from 'next/font/google';
import './globals.css';

const faculty = Faculty_Glyphic({ 
  weight: '400', // Faculty Glyphic only has 400 weight
  subsets: ['latin']
});

export const metadata = {
  title: 'Questodoro',
  description: 'A gamified Pomodoro timer',
  openGraph: {
    images: [{
      url: 'https://res.cloudinary.com/dk9mn4cvz/image/upload/v1732056862/Questodoro-Gamified-Pomodoro-Mariana-Oka_pk0vtn.jpg',
      width: 1200,
      height: 630,
      alt: 'Questodoro - A gamified Pomodoro timer',
    }],
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚔️</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={faculty.className}>{children}</body>
    </html>
  );
}