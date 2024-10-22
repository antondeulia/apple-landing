import Features from "./components/Features";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HighLights from "./components/HighLights";
import HowItWorks from "./components/HowItWorks";
import Model from "./components/Model";

const App = () => {
  return (
    <main className="bg-black">
      <Header />
      <Hero />
      <HighLights />
      <Model />
      <Features />
      <HowItWorks />
    </main>
  );
};

export default App;
