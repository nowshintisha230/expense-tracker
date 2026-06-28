import "./globals.css";
import NavBar from "./components/NavBar";

export default function RootLayout({children,}:{  children: React.ReactNode;}
  ) {
  return (
   
    <html lang="en">
      <body className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-55 w-full">
       
        <NavBar></NavBar>
      {children}
      
        </body>
    </html>
    
  );
}
