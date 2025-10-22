import { Button } from "@/components/ui/button";
import { Users, Building, Zap, Target, Globe } from "lucide-react";
import heroImage from "@/assets/hero-recruitment.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Zap, label: "자동 매칭" },
    { icon: Target, label: "스킬 기반 매칭" },
    { icon: Globe, label: "50개 이상 언어 지원" },
  ];

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              더 이상 구직 활동은 필요 없습니다.
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                자동으로 매칭해드립니다
              </span>
            </h1>

            {/* Service Explanation */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-12 max-w-3xl mx-auto">
              <p className="text-lg text-foreground mb-4 font-medium">
                AI 기반 플랫폼이 구직자와 완벽한 기회를 자동으로 연결합니다.
              </p>
              <p className="text-muted-foreground">
                <strong>구직자:</strong> 이력서를 한 번만 업로드하세요. 시스템이 귀하의 기술과 경험을 분석하여 50개 이상의 언어로 관련 직무와 자동 매칭합니다.
              </p>
              <p className="text-muted-foreground mt-3">
                <strong>채용담당자:</strong> 채용 요구사항을 게시하세요. 기술, 경험, 언어 능력을 기반으로 적격 후보자와 즉시 매칭됩니다.
              </p>
              <p className="text-sm text-primary font-semibold mt-4">
                수동 검색 불필요. 끝없는 지원서 작성 불필요. 스마트한 자동 매칭만 있을 뿐입니다.
              </p>
            </div>
          </div>

          {/* Two Main Action Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Job Seeker Card */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-3xl p-8 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">구직자입니다</h2>
                <p className="text-muted-foreground mb-6">
                  이력서를 업로드하고 AI가 자동으로 완벽한 직무를 찾아드립니다
                </p>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={() => navigate('/resume-builder')}
                >
                  이력서 등록하기
                </Button>
              </div>
            </div>

            {/* Employer Card */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20 rounded-3xl p-8 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">채용담당자입니다</h2>
                <p className="text-muted-foreground mb-6">
                  채용 요구사항을 게시하고 적합한 후보자를 즉시 추천받으세요
                </p>
                <Button 
                  variant="professional" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={() => navigate('/job-posting')}
                >
                  채용공고 등록하기
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;