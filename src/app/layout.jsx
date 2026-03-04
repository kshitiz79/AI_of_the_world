import Footer from "@/components/Global/Footer/Footer";
import "./globals.css";
import Header from "@/components/Global/Header/Header";

export const metadata = {
  title: "AI OF THE WORLD",
  description: "Get Your AI Art Now For Free   ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black" style={{ paddingBottom: '400px' }}> {/* Add padding-bottom equal to footer height to prevent overlap */}

          <Header />
          <main>{children}</main>
          <Footer />

      </body>
    </html>
  );
}
