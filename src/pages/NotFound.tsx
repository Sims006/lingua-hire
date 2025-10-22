import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">페이지를 찾을 수 없습니다</h2>
        <p className="text-lg text-muted-foreground">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <Link to="/">
          <Button size="lg" className="mt-4">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
