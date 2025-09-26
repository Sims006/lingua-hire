import { useNavigate } from "react-router-dom";
import ResumeBuilder from "@/components/forms/ResumeBuilder";

const ResumeBuilderPage = () => {
  const navigate = useNavigate();

  const handleComplete = (resumeData: any) => {
    console.log("Resume completed:", resumeData);
    // Here you would save to Supabase
    navigate("/job-seeker-dashboard");
  };

  const handleCancel = () => {
    navigate("/job-seeker-dashboard");
  };

  return <ResumeBuilder onComplete={handleComplete} onCancel={handleCancel} />;
};

export default ResumeBuilderPage;