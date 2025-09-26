import { Button } from "@/components/ui/button";
import { Users, Building2, Globe, ArrowRight } from "lucide-react";

const BannerMessages = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-accent py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner Messages */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Job Seekers Banner */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">For Job Seekers</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Register your resume, translated into 50+ languages, and access global job opportunities—even without speaking foreign languages.
            </p>
            <Button variant="secondary" size="lg" className="w-full group">
              Register Your Resume
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Employers Banner */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">For Employers</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Post your job, instantly translated into 50+ languages, and hire the best talent worldwide—even without speaking foreign languages.
            </p>
            <Button variant="secondary" size="lg" className="w-full group">
              Post a Job
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Demo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Live Translation Demo</span>
          </div>
        </div>

        {/* Sample Translations */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sample Resume */}
          <div className="bg-white rounded-2xl p-6 shadow-strong">
            <h4 className="font-bold text-foreground mb-3">Sample Resume (Auto-translated)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-medium">EN</span>
                <div>
                  <p className="font-medium">Software Engineer | 5+ years experience</p>
                  <p className="text-muted-foreground">Specialized in React, Node.js, and cloud architecture</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center text-xs font-medium">ES</span>
                <div>
                  <p className="font-medium">Ingeniero de Software | 5+ años de experiencia</p>
                  <p className="text-muted-foreground">Especializado en React, Node.js y arquitectura en la nube</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded bg-secondary/50 flex items-center justify-center text-xs font-medium">日</span>
                <div>
                  <p className="font-medium">ソフトウェアエンジニア | 5年以上の経験</p>
                  <p className="text-muted-foreground">React、Node.js、クラウドアーキテクチャを専門とする</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Job Posting */}
          <div className="bg-white rounded-2xl p-6 shadow-strong">
            <h4 className="font-bold text-foreground mb-3">Sample Job Posting (Auto-translated)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-medium">EN</span>
                <div>
                  <p className="font-medium">Senior Frontend Developer - Remote</p>
                  <p className="text-muted-foreground">Join our global team building next-gen web applications</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center text-xs font-medium">FR</span>
                <div>
                  <p className="font-medium">Développeur Frontend Senior - Télétravail</p>
                  <p className="text-muted-foreground">Rejoignez notre équipe mondiale pour créer des applications web nouvelle génération</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="w-6 h-6 rounded bg-secondary/50 flex items-center justify-center text-xs font-medium">DE</span>
                <div>
                  <p className="font-medium">Senior Frontend Entwickler - Remote</p>
                  <p className="text-muted-foreground">Werden Sie Teil unseres globalen Teams beim Aufbau modernster Webanwendungen</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-gradient-to-br from-white to-secondary/50 rounded-2xl p-8 text-center shadow-strong">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Job Seekers</h3>
            <p className="text-muted-foreground mb-6">Register your resume here and get discovered by global employers</p>
            <Button variant="hero" size="lg" className="w-full">
              Register Your Resume Here
            </Button>
          </div>
          <div className="bg-gradient-to-br from-white to-accent/10 rounded-2xl p-8 text-center shadow-strong">
            <Building2 className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Employers</h3>
            <p className="text-muted-foreground mb-6">Post a job here and find the perfect global talent</p>
            <Button variant="professional" size="lg" className="w-full">
              Post a Job Here
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerMessages;