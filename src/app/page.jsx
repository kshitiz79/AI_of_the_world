import AIWelcome from "@/components/Home/AIWelcome";
import Banner from "@/components/Home/Banner";
import Banner2 from "@/components/Home/Banner2";
import FluidGlassParent from "@/components/Home/FluidGlassParent";
import ImageGrig from "@/components/Home/ImageGrid";

import Image from "next/image";

export default function Home() {
  return (
    <div className="">


      <Banner/>


<AIWelcome/>


     <FluidGlassParent/>
     <ImageGrig/>
    </div>
  );
}
