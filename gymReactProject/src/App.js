import "./App.css";

import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Programs from "./Components/Programs/Programs";
import Reasons from "./Components/Reasons/Reasons";
import Plans from "./Components/Plans/Plans";
import Testimonials from "./Components/Tesimonials/Testimonials";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Programs />
      <Reasons />
      <Plans />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
