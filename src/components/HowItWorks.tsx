import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, MessageSquare, CheckCircle, Briefcase, FileText, Users, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const jobSeekerSteps = [
    {
      icon: FileText,
      title: "이력서 업로드",
      description: "50개 이상의 언어로 이력서를 한 번 업로드하세요. AI가 귀하의 기술, 경험, 자격을 추출합니다.",
    },
    {
      icon: TrendingUp,
      title: "AI 분석",
      description: "시스템이 귀하의 프로필을 분석하고 기술, 경험 수준, 직무 선호도를 자동으로 분류합니다.",
    },
    {
      icon: CheckCircle,
      title: "자동 매칭",
      description: "키워드, 기술, 경험을 기반으로 관련 채용공고와 즉시 매칭됩니다. 수동 검색이 필요 없습니다.",
    },
    {
      icon: MessageSquare,
      title: "연락 받기",
      description: "고용주가 매칭된 귀하를 확인하고 직접 연락합니다. 모든 커뮤니케이션은 자동으로 귀하의 언어로 번역됩니다.",
    },
  ];

  const employerSteps = [
    {
      icon: Briefcase,
      title: "채용공고 게시",
      description: "필요한 기술, 경험 수준, 업무 책임을 포함한 채용 요구사항을 제출하세요. 귀하의 언어로 게시되며 자동으로 번역됩니다.",
    },
    {
      icon: TrendingUp,
      title: "AI 매칭",
      description: "시스템이 즉시 채용공고를 분석하고 키워드 및 기술 적합성을 기반으로 적격 후보자와 매칭합니다.",
    },
    {
      icon: Users,
      title: "매칭 결과 수신",
      description: "귀하의 요구사항을 충족하는 엄선된 후보자 목록을 받으세요. 수천 개의 이력서를 검색할 필요가 없습니다.",
    },
    {
      icon: CheckCircle,
      title: "연락 및 채용",
      description: "매칭된 프로필을 검토하고 후보자에게 직접 연락하세요. 모든 커뮤니케이션은 양측 언어로 자동 번역됩니다.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            자동 매칭 프로세스
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI가 귀하를 대신해 작업을 수행합니다 - 수동 검색이 필요 없습니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Job Seekers Process */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              구직자용
            </h3>
            <div className="space-y-6">
              {jobSeekerSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-all">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-semibold text-primary">단계 {index + 1}</span>
                          <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Employers Process */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              채용담당자용
            </h3>
            <div className="space-y-6">
              {employerSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-accent hover:shadow-md transition-all">
                    <CardContent className="flex items-start space-x-4 p-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-semibold text-accent">단계 {index + 1}</span>
                          <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
