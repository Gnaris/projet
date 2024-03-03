import "../styles/globals.css"

export const metadata = {
  title: "Connexion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body className="min-h-screen min-w-screen">
        {children}
      </body>
    </html>
  );
}
