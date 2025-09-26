import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, FileText, User, Briefcase, Languages, Check } from "lucide-react";
import KeywordSelector from "./KeywordSelector";
import { INDUSTRIES, EXPERIENCE_LEVELS, WORK_TYPES, LANGUAGES, LANGUAGE_LEVELS, RESPONSIBILITIES } from "@/data/keywords";

interface ResumeBuilderProps {
  onComplete?: (resumeData: any) => void;
  onCancel?: () => void;
}

const ResumeBuilder = ({ onComplete, onCancel }: ResumeBuilderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    
    // Experience
    industry: "",
    role: "",
    experienceLevel: "",
    workTypes: [] as string[],
    
    // Skills & Keywords
    keywords: [] as string[],
    responsibilities: [] as string[],
    
    // Languages
    languages: [] as { code: string; level: string }[],
    
    // Work Experience
    experiences: [] as any[],
    
    // Education
    education: [] as any[]
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateResumeData = (field: string, value: any) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(resumeData);
    }
  };

  const addLanguage = () => {
    updateResumeData("languages", [...resumeData.languages, { code: "", level: "" }]);
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const newLanguages = [...resumeData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    updateResumeData("languages", newLanguages);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = resumeData.languages.filter((_, i) => i !== index);
    updateResumeData("languages", newLanguages);
  };

  const toggleWorkType = (workType: string) => {
    const newWorkTypes = resumeData.workTypes.includes(workType)
      ? resumeData.workTypes.filter(t => t !== workType)
      : [...resumeData.workTypes, workType];
    updateResumeData("workTypes", newWorkTypes);
  };

  const toggleResponsibility = (responsibility: string) => {
    const newResponsibilities = resumeData.responsibilities.includes(responsibility)
      ? resumeData.responsibilities.filter(r => r !== responsibility)
      : [...resumeData.responsibilities, responsibility];
    updateResumeData("responsibilities", newResponsibilities);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={resumeData.fullName}
                  onChange={(e) => updateResumeData("fullName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => updateResumeData("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.phone}
                  onChange={(e) => updateResumeData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.location}
                  onChange={(e) => updateResumeData("location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={(e) => updateResumeData("summary", e.target.value)}
                placeholder="Brief overview of your professional background and career goals..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Industry & Experience</h2>
              <p className="text-muted-foreground">Select your industry and experience level</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Industry *</Label>
                <Select value={resumeData.industry} onValueChange={(value) => updateResumeData("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Experience Level *</Label>
                <Select value={resumeData.experienceLevel} onValueChange={(value) => updateResumeData("experienceLevel", value)}>
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
            </div>

            <div>
              <Label>Current Role/Title</Label>
              <Input
                value={resumeData.role}
                onChange={(e) => updateResumeData("role", e.target.value)}
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            <div>
              <Label>Preferred Work Types *</Label>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mt-2">
                {WORK_TYPES.map((workType) => (
                  <Button
                    key={workType.id}
                    variant={resumeData.workTypes.includes(workType.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleWorkType(workType.id)}
                  >
                    {workType.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Skills & Keywords</h2>
              <p className="text-muted-foreground">Add your skills and expertise</p>
            </div>

            <KeywordSelector
              selectedKeywords={resumeData.keywords}
              onKeywordsChange={(keywords) => updateResumeData("keywords", keywords)}
              title="Technical Skills & Keywords"
              maxSelections={15}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Work Responsibilities</h2>
              <p className="text-muted-foreground">Select your key responsibilities</p>
            </div>

            {resumeData.keywords.length > 0 && (
              <div className="space-y-4">
                {resumeData.keywords.map((keyword) => {
                  const canonicalKey = Object.keys(RESPONSIBILITIES).find(key => 
                    RESPONSIBILITIES[key as keyof typeof RESPONSIBILITIES] && 
                    keyword.toLowerCase().includes(key.toLowerCase())
                  ) as keyof typeof RESPONSIBILITIES;
                  
                  if (!canonicalKey) return null;
                  
                  const responsibilities = RESPONSIBILITIES[canonicalKey];
                  
                  return (
                    <Card key={keyword} className="p-4">
                      <h4 className="font-semibold text-foreground mb-3">{keyword} Responsibilities:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {responsibilities.map((responsibility) => (
                          <Button
                            key={responsibility}
                            variant={resumeData.responsibilities.includes(responsibility) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleResponsibility(responsibility)}
                            className="justify-start text-left h-auto py-2 px-3"
                          >
                            {resumeData.responsibilities.includes(responsibility) && (
                              <Check className="w-4 h-4 mr-2" />
                            )}
                            {responsibility}
                          </Button>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {resumeData.keywords.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Add keywords in the previous step to see relevant responsibilities</p>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Languages className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Language Skills</h2>
              <p className="text-muted-foreground">Add your language proficiency</p>
            </div>

            <div className="space-y-4">
              {resumeData.languages.map((language, index) => (
                <Card key={index} className="p-4">
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
                      <Label>Proficiency Level</Label>
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
                      variant="outline"
                      onClick={() => removeLanguage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}

              <Button variant="outline" onClick={addLanguage} className="w-full">
                Add Language
              </Button>
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Resume Complete!</h3>
              <p className="text-muted-foreground">Your resume will be automatically translated into 50+ languages for global opportunities.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-foreground">Resume Builder</h1>
              <Badge variant="secondary">Step {currentStep} of {totalSteps}</Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              {onCancel && (
                <Button variant="ghost" onClick={onCancel} className="ml-2">
                  Cancel
                </Button>
              )}
            </div>

            <div>
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete} variant="hero">
                  Complete Resume
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;