"use server";

import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";

const Home = () => (
  <div className="min-h-screen flex flex-row">
    <Navigation />

    <div className="flex flex-col w-full">
      <Header />

      <main className="flex flex-col gap-2 h-full mx-6 xl:mx-10">OVERVIEW</main>
    </div>
  </div>
);

export default Home;
