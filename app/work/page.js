import Navbar from "../components/Navbar";
import WorkSection from "../components/WorkSection";


export default function Work() {
  return (
    <main className="bg-white">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <WorkSection />
      </div>
    </main>
  );
}

