import { useNavigate } from "react-router-dom";
import JobPostingForm from "@/components/forms/JobPostingForm";

const JobPostingFormPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (jobData: any) => {
    console.log("Job posting submitted:", jobData);
    // Here you would save to Supabase
    navigate("/employer-dashboard");
  };

  const handleCancel = () => {
    navigate("/employer-dashboard");
  };

  return <JobPostingForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default JobPostingFormPage;