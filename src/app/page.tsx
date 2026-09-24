import About from "@/components/about";
import Area from "@/components/area";
import Banner from "@/components/banner";
import Choose from "@/components/choose";
import Contact from "@/components/contact";
import Cta from "@/components/cta";
import Footer from "@/components/footer";
import Services from "@/components/services";
import Video from "@/components/video";

export default function Home() {
  return (
    <div>
      <Banner />
      <About />
      <Services />
      <Choose />
      <Video />
      <Area />
      <Contact />
      <Cta />
      <Footer />
    </div>
  );
}
