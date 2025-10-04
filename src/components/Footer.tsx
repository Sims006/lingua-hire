import { Globe, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "구직자용",
      links: [
        "채용공고 둘러보기",
        "이력서 작성",
        "커리어 조언",
        "연봉 가이드",
        "면접 팁"
      ]
    },
    {
      title: "채용담당자용",
      links: [
        "채용공고 게시",
        "이력서 둘러보기",
        "가격 플랜",
        "채용 도구",
        "기업 프로필"
      ]
    },
    {
      title: "글로벌 지원",
      links: [
        "도움말 센터",
        "지원팀 연락",
        "언어 설정",
        "현지 가이드라인",
        "커뮤니티 포럼"
      ]
    },
    {
      title: "회사 정보",
      links: [
        "회사 소개",
        "채용",
        "보도자료",
        "파트너 프로그램",
        "제휴 프로그램"
      ]
    }
  ];

  const languages = [
    "English", "Español", "Français", "Deutsch", "中文", 
    "日本語", "العربية", "Português", "Русский", "हिंदी"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">글로벌잡스</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 text-sm">
                50개 이상의 언어로 글로벌 인재를 연결합니다.
                전 세계 어디서나 꿈의 직장을 찾거나 완벽한 후보자를 채용하세요.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Language Selection & Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Language Selector */}
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-primary-foreground/80">지원 언어:</span>
              {languages.slice(0, 5).map((lang, index) => (
                <a key={index} href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                  {lang}
                </a>
              ))}
              <span className="text-primary-foreground/60">+ 45개 언어 더보기</span>
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-primary-foreground/80">
              <span>© {currentYear} 글로벌잡스. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">개인정보 처리방침</a>
                <a href="#" className="hover:text-white transition-colors">이용약관</a>
                <a href="#" className="hover:text-white transition-colors">쿠키</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;