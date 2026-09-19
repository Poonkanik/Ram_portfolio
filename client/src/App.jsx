import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About, { Research } from "./components/About.jsx";
import Publications from "./components/Publications.jsx";
import Guidance from "./components/Guidance.jsx";
import Achievements from "./components/Achievements.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <Publications />
        <Guidance />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
