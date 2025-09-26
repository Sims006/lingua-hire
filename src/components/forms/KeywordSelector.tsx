import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Search, Plus } from "lucide-react";
import { getKeywordSuggestions, CANONICAL_KEYWORDS, INDUSTRIES } from "@/data/keywords";

interface KeywordSelectorProps {
  selectedKeywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
  placeholder?: string;
  title?: string;
  maxSelections?: number;
}

const KeywordSelector = ({ 
  selectedKeywords, 
  onKeywordsChange, 
  placeholder = "Search for skills, roles, or responsibilities...",
  title = "Keywords & Skills",
  maxSelections = 10
}: KeywordSelectorProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setSearchInput(value);
    if (value.length > 2) {
      const newSuggestions = getKeywordSuggestions(value);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const addKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword) && selectedKeywords.length < maxSelections) {
      onKeywordsChange([...selectedKeywords, keyword]);
    }
    setSearchInput("");
    setSuggestions([]);
  };

  const removeKeyword = (keyword: string) => {
    onKeywordsChange(selectedKeywords.filter(k => k !== keyword));
  };

  const addFromIndustry = (industryKeywords: string[]) => {
    const newKeywords = [...selectedKeywords];
    industryKeywords.forEach(key => {
      const variants = CANONICAL_KEYWORDS[key as keyof typeof CANONICAL_KEYWORDS];
      if (variants && variants.length > 0) {
        const mainVariant = variants[0];
        if (!newKeywords.includes(mainVariant) && newKeywords.length < maxSelections) {
          newKeywords.push(mainVariant);
        }
      }
    });
    onKeywordsChange(newKeywords);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Badge variant="secondary">{selectedKeywords.length}/{maxSelections}</Badge>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className="pl-10"
        />
        
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1 p-2 border border-border bg-background shadow-lg">
            <div className="grid grid-cols-1 gap-1">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => addKeyword(suggestion)}
                  className="justify-start h-auto p-2 text-left"
                  disabled={selectedKeywords.includes(suggestion)}
                >
                  <Plus className="w-3 h-3 mr-2" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Industry Quick Add */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Quick Add by Industry:</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {INDUSTRIES.map((industry) => (
            <Button
              key={industry.id}
              variant="outline"
              size="sm"
              onClick={() => addFromIndustry(industry.keywords)}
              className="text-xs h-auto py-2"
            >
              {industry.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Selected Keywords */}
      {selectedKeywords.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Selected Keywords:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedKeywords.map((keyword, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="flex items-center gap-1 px-3 py-1"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {selectedKeywords.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Start typing to search for keywords or select from industries above</p>
        </div>
      )}
    </div>
  );
};

export default KeywordSelector;