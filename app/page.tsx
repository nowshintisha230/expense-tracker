import About from "./components/About";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "12px" }}>
   <Banner></Banner>
   <section id="reviews">
   <Reviews></Reviews>
   </section>
   <section id="about">
   <About></About>
   </section>
  <Footer></Footer>
    </main>
  );
}