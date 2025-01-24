
import type { Metadata } from "next";
import localFont from 'next/font/local'
import "~/styles/globals.scss";
import StoreProvider from "./providers/StoreProvider";

const muller = localFont({
  src: [
    {
      path: '../shared/assets/font/Muller-Regular.woff2',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../shared/assets/font/Muller-Bold.woff2',
      weight: '700',
      style: 'bold',
    }
  ],
  variable: '--font-muller'
})

export const metadata: Metadata = {
  title: "Ferma Todo List App",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`flex flex-col ${muller.variable} antialiased items-center`}>
        <div className={'flex flex-col items-center justify-center max-w-page w-full'}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </div>
      </body>
    </html >
  );
}
