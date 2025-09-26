import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BannerMessages from "@/components/BannerMessages";
import JobListings from "@/components/JobListings";
import ResumesSection from "@/components/ResumesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BannerMessages />
      <JobListings />
      <ResumesSection />
      <Footer />
    </div>
  );
};

export default Index;