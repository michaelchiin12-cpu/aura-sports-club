import "./globals.css";

export const metadata = {
  title: "Aura Sports Club",
  description: "Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}