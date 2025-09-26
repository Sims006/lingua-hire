import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Building2, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import KeywordSelector from "./KeywordSelector";
import { INDUSTRIES, EXPERIENCE_LEVELS, WORK_TYPES, LANGUAGES, LANGUAGE_LEVELS } from "@/data/keywords";

interface JobPostingFormProps {
  onSubmit?: (jobData: any) => void;
  onCancel?: () => void;
}

const JobPostingForm = ({ onSubmit, onCancel }: JobPostingFormProps) => {
  const [jobData, setJobData] = useState({
    // Basic Information
    companyName: "",
    country: "",
    location: "",
    jobTitle: "",
    jobDescription: "",
    
    // Job Details
    jobType: "",
    workType: "",
    workHours: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    
    // Requirements
    experienceLevel: "",
    keywords: [] as string[],
    requiredLanguages: [] as { code: string; level: string }[],
    qualifications: "",
    
    // Hiring Details
    numberOfHires: "1",
    closingDate: null as Date | null
  });

  const updateJobData = (field: string, value: any) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(jobData);
    }
  };

  const addLanguage = () => {
    updateJobData("requiredLanguages", [...jobData.requiredLanguages, { code: "", level: "" }]);
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const newLanguages = [...jobData.requiredLanguages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    updateJobData("requiredLanguages", newLanguages);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = jobData.requiredLanguages.filter((_, i) => i !== index);
    updateJobData("requiredLanguages", newLanguages);
  };

  const JOB_TYPES = [
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'support', name: 'Support' },
    { id: 'finance', name: 'Finance' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'other', name: 'Other' }
  ];

  const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ];

  return (
    <div className="min-h-screen bg-secondary/30 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          <div className="text-center mb-8">
            <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Job Posting</h1>
            <p className="text-muted-foreground">Your job will be automatically translated into 50+ languages</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={jobData.companyName}
                    onChange={(e) => updateJobData("companyName", e.target.value)}
                    placeholder="Your Company Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={jobData.country}
                    onChange={(e) => updateJobData("country", e.target.value)}
                    placeholder="United States"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={jobData.location}
                    onChange={(e) => updateJobData("location", e.target.value)}
                    placeholder="San Francisco, CA or Remote"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Job Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Job Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={jobData.jobTitle}
                    onChange={(e) => updateJobData("jobTitle", e.target.value)}
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="jobDescription">Job Description *</Label>
                  <Textarea
                    id="jobDescription"
                    value={jobData.jobDescription}
                    onChange={(e) => updateJobData("jobDescription", e.target.value)}
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Job Type *</Label>
                    <Select value={jobData.jobType} onValueChange={(value) => updateJobData("jobType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {JOB_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Work Type *</Label>
                    <Select value={jobData.workType} onValueChange={(value) => updateJobData("workType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        {WORK_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="workHours">Work Hours</Label>
                    <Input
                      id="workHours"
                      value={jobData.workHours}
                      onChange={(e) => updateJobData("workHours", e.target.value)}
                      placeholder="e.g., 40 hours/week"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Salary & Compensation */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Salary & Compensation</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Currency</Label>
                  <Select value={jobData.salaryCurrency} onValueChange={(value) => updateJobData("salaryCurrency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salaryMin">Minimum Salary</Label>
                  <Input
                    id="salaryMin"
                    value={jobData.salaryMin}
                    onChange={(e) => updateJobData("salaryMin", e.target.value)}
                    placeholder="50000"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="salaryMax">Maximum Salary</Label>
                  <Input
                    id="salaryMax"
                    value={jobData.salaryMax}
                    onChange={(e) => updateJobData("salaryMax", e.target.value)}
                    placeholder="80000"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfHires">Number of Hires</Label>
                  <Input
                    id="numberOfHires"
                    value={jobData.numberOfHires}
                    onChange={(e) => updateJobData("numberOfHires", e.target.value)}
                    placeholder="1"
                    type="number"
                    min="1"
                  />
                </div>
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
              <div className="space-y-6">
                <div>
                  <Label>Experience Level *</Label>
                  <Select value={jobData.experienceLevel} onValueChange={(value) => updateJobData("experienceLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="qualifications">Required Qualifications</Label>
                  <Textarea
                    id="qualifications"
                    value={jobData.qualifications}
                    onChange={(e) => updateJobData("qualifications", e.target.value)}
                    placeholder="List required skills, certifications, degrees, or experience..."
                    rows={4}
                  />
                </div>

                <KeywordSelector
                  selectedKeywords={jobData.keywords}
                  onKeywordsChange={(keywords) => updateJobData("keywords", keywords)}
                  title="Required Skills & Keywords"
                  placeholder="Search for required skills and technologies..."
                  maxSelections={12}
                />
              </div>
            </Card>

            {/* Language Requirements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Language Requirements</h2>
              <div className="space-y-4">
                {jobData.requiredLanguages.map((language, index) => (
                  <Card key={index} className="p-4 bg-secondary/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <Label>Language</Label>
                        <Select 
                          value={language.code} 
                          onValueChange={(value) => updateLanguage(index, "code", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGES.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Required Level</Label>
                        <Select 
                          value={language.level} 
                          onValueChange={(value) => updateLanguage(index, "level", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGE_LEVELS.map((level) => (
                              <SelectItem key={level.id} value={level.id}>
                                {level.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeLanguage(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}

                <Button type="button" variant="outline" onClick={addLanguage} className="w-full">
                  Add Language Requirement
                </Button>
              </div>
            </Card>

            {/* Closing Date */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Application Deadline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Closing Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !jobData.closingDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {jobData.closingDate ? format(jobData.closingDate, "PPP") : "Select closing date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={jobData.closingDate || undefined}
                        onSelect={(date) => updateJobData("closingDate", date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </Card>

            {/* Submit */}
            <div className="flex justify-between">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <div className="ml-auto space-x-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit" variant="hero">
                  <Check className="w-4 h-4 mr-2" />
                  Publish Job
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default JobPostingForm;