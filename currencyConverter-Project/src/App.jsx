import Card from "./components/Card";
import BgPhoto from './Assets/bg-photo.jpg'

function App() {
  const appStyle = {
    backgroundImage: `url(${BgPhoto})`,
    backgroundSize: '100% 50%',  // Adjust this based on your preference
    backgroundPosition: 'top center',  // Adjust this based on your preference
    backgroundRepeat: 'no-repeat',  // Adjust this based on your preference
    // Add any additional styles you need
  };

  return (
    <div className="w-full h-screen justify-center items-cente " style={appStyle}>
      <h2 className="font-bold text-white text-3xl text-center pt-40 pb-2">Currency Converter</h2> 
      <p className="text-x text-center text-yellow-400 pb-10">Check live foreign currency exchange rates</p>
      <Card />
    </div>
  );
}

export default App;
