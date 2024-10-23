import DoctorList from "./_components/DoctorList";
import { Hero } from "./_components/Hero";
import Recommended from "./_components/Recommended";

const page = () => {
  return (
    <div>
      <Hero />
      <Recommended />
      <DoctorList />
    </div>
  );
};

export default page;
