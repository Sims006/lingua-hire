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
              <h2 className="text-2xl font-bold text-foreground mb-2">개인 정보</h2>
              <p className="text-muted-foreground">자신에 대해 알려주세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">이름 *</Label>
                <Input
                  id="fullName"
                  value={resumeData.fullName}
                  onChange={(e) => updateResumeData("fullName", e.target.value)}
                  placeholder="홍길동"
                />
              </div>
              <div>
                <Label htmlFor="email">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => updateResumeData("email", e.target.value)}
                  placeholder="hong@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  value={resumeData.phone}
                  onChange={(e) => updateResumeData("phone", e.target.value)}
                  placeholder="+82 10-1234-5678"
                />
              </div>
              <div>
                <Label htmlFor="location">위치</Label>
                <Input
                  id="location"
                  value={resumeData.location}
                  onChange={(e) => updateResumeData("location", e.target.value)}
                  placeholder="서울, 대한민국"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">경력 요약</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={(e) => updateResumeData("summary", e.target.value)}
                placeholder="전문적인 배경과 경력 목표에 대한 간략한 개요..."
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
              <h2 className="text-2xl font-bold text-foreground mb-2">산업 및 경험</h2>
              <p className="text-muted-foreground">산업 분야와 경험 수준을 선택하세요</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>산업 분야 *</Label>
                <Select value={resumeData.industry} onValueChange={(value) => updateResumeData("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="산업 분야를 선택하세요" />
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
                <Label>경험 수준 *</Label>
                <Select value={resumeData.experienceLevel} onValueChange={(value) => updateResumeData("experienceLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="경험 수준을 선택하세요" />
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
              <Label>현재 직책/직급</Label>
              <Input
                value={resumeData.role}
                onChange={(e) => updateResumeData("role", e.target.value)}
                placeholder="예: 시니어 프론트엔드 개발자"
              />
            </div>

            <div>
              <Label>선호하는 근무 형태 *</Label>
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
              <h2 className="text-2xl font-bold text-foreground mb-2">기술 및 키워드</h2>
              <p className="text-muted-foreground">귀하의 기술과 전문성을 추가하세요</p>
            </div>

            <KeywordSelector
              selectedKeywords={resumeData.keywords}
              onKeywordsChange={(keywords) => updateResumeData("keywords", keywords)}
              title="기술 능력 및 키워드"
              maxSelections={15}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">업무 책임</h2>
              <p className="text-muted-foreground">주요 업무 책임을 선택하세요</p>
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
                      <h4 className="font-semibold text-foreground mb-3">{keyword} 책임:</h4>
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
                <p>관련 책임을 보려면 이전 단계에서 키워드를 추가하세요</p>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Languages className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">언어 능력</h2>
              <p className="text-muted-foreground">언어 숙련도를 추가하세요</p>
            </div>

            <div className="space-y-4">
              {resumeData.languages.map((language, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <Label>언어</Label>
                      <Select 
                        value={language.code} 
                        onValueChange={(value) => updateLanguage(index, "code", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="언어 선택" />
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
                      <Label>숙련도</Label>
                      <Select 
                        value={language.level} 
                        onValueChange={(value) => updateLanguage(index, "level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="수준 선택" />
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
                      삭제
                    </Button>
                  </div>
                </Card>
              ))}

              <Button variant="outline" onClick={addLanguage} className="w-full">
                언어 추가
              </Button>
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">이력서 완성!</h3>
              <p className="text-muted-foreground">귀하의 이력서는 글로벌 기회를 위해 50개 이상의 언어로 자동 번역됩니다.</p>
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
              <h1 className="text-3xl font-bold text-foreground">이력서 작성</h1>
              <Badge variant="secondary">단계 {currentStep} / {totalSteps}</Badge>
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
                  이전
                </Button>
              )}
              {onCancel && (
                <Button variant="ghost" onClick={onCancel} className="ml-2">
                  취소
                </Button>
              )}
            </div>

            <div>
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  다음
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete} variant="hero">
                  이력서 완성
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