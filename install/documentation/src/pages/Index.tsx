import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Screenshots from "@/components/Screenshots";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ScrollReveal animation="fade-in">
          <Hero />
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <Projects />
        </ScrollReveal>

        <ScrollReveal animation="bounce-in" delay={200} className="reveal-bounce">
          <Screenshots />
        </ScrollReveal>

        <ScrollReveal animation="slide-in-left" delay={100}>
          <About />
        </ScrollReveal>

        <ScrollReveal animation="slide-in-right" delay={100}>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
