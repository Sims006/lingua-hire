import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter } from "lucide-react";
import { useJobs, SearchFilters } from "@/hooks/useJobs";

interface SearchJobsFormProps {
  onSearchResults?: (jobs: any[]) => void;
  className?: string;
}

const SearchJobsForm = ({ onSearchResults, className = "" }: SearchJobsFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const { searchJobs } = useJobs();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: SearchFilters = {
      searchQuery: searchQuery.trim() || undefined,
      location: location.trim() || undefined,
      jobType: jobType !== "all" ? jobType : undefined,
    };

    await searchJobs(filters, 0);
    
    if (onSearchResults) {
      // This would typically be called with the search results
      // For now, we'll just trigger the callback
      onSearchResults([]);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`space-y-4 ${className}`}>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Job title, skills, or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Location or remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="h-12">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" variant="hero" size="lg" className="h-12 w-full">
          Search Jobs
        </Button>
      </div>
    </form>
  );
};

export default SearchJobsForm;