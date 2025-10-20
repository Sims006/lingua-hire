import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Building, Users, Bookmark } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";

const JobListings = () => {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl">채용 기회 불러오는 중...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl text-destructive">채용공고 로드 오류: {error}</div>
        </div>
      </section>
    );
  }

  const featuredJobs = jobs.slice(0, 4).map(job => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1).replace('-', ' '),
    salary: `${job.salary_currency === 'USD' ? '$' : job.salary_currency === 'GBP' ? '£' : '€'}${Math.round(job.salary_min / 1000)}k - ${Math.round(job.salary_max / 1000)}k`,
    posted: job.posted_ago || "Recently",
    skills: job.required_skills?.slice(0, 3) || [],
    applicants: job.applications_count,
    isUrgent: job.is_urgent,
  }));

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            주요 채용 기회
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            전 세계 기업의 기회를 발견하고, 자동으로 번역되어 
            귀하의 기술에 매칭됩니다.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-3 items-center text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{job.applicants} 지원자</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.isUrgent && (
                    <Badge className="bg-accent text-accent-foreground text-xs">
                      긴급
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{job.posted}</span>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      자세히 보기
                    </Button>
                    <Button variant="default" size="sm">
                      지금 지원
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Jobs Button */}
        <div className="text-center">
          <Button variant="hero" size="lg" className="px-8">
            모든 채용공고 보기 ({jobs.length > 0 ? jobs.length.toLocaleString() : '0'})
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;