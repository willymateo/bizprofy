import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";

const Home = () => (
  <>
    <Header />

    <div className="flex flex-row">
      <Navigation />

      <main className="min-h-screen flex flex-col gap-20"></main>
    </div>
  </>
);

export default Home;
