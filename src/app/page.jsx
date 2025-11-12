import AIWelcome from "@/components/Home/AIWelcome";
import Banner from "@/components/Home/Banner";
import Banner2 from "@/components/Home/Banner2";
import ImageGrig from "@/components/Home/ImageGrid";
import ThreadParent from "@/components/Home/ThreadParent";
import Image from "next/image";

export default function Home() {
  return (
    <div mt-2 >


      <Banner/>
      <ThreadParent/>
<AIWelcome/>

     <ImageGrig/>
    </div>
  );
}
