import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { CANONICAL_KEYWORDS, INDUSTRIES } from '@/data/keywords';

interface KeywordGroup {
  id: string;
  category: string;
  canonical: string;
  variants: string[];
  is_active: boolean;
  usage_count: number;
}

export default function AdminKeywords() {
  const [keywords, setKeywords] = useState<KeywordGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<KeywordGroup | null>(null);
  const { toast } = useToast();

  // Initialize with existing keywords
  useEffect(() => {
    const mockKeywords: KeywordGroup[] = Object.entries(CANONICAL_KEYWORDS).map(([key, variants], index) => ({
      id: `${index + 1}`,
      category: getKeywordCategory(key),
      canonical: key,
      variants,
      is_active: true,
      usage_count: Math.floor(Math.random() * 100) + 10
    }));

    setTimeout(() => {
      setKeywords(mockKeywords);
      setLoading(false);
    }, 1000);
  }, []);

  const getKeywordCategory = (canonical: string): string => {
    for (const industry of INDUSTRIES) {
      if (industry.keywords.includes(canonical)) {
        return industry.name;
      }
    }
    return 'Other';
  };

  const filteredKeywords = keywords.filter(keyword =>
    keyword.canonical.toLowerCase().includes(searchQuery.toLowerCase()) ||
    keyword.variants.some(variant => variant.toLowerCase().includes(searchQuery.toLowerCase())) ||
    keyword.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveKeyword = (keywordData: Partial<KeywordGroup>) => {
    if (editingKeyword) {
      setKeywords(prev => prev.map(k => 
        k.id === editingKeyword.id 
          ? { ...k, ...keywordData }
          : k
      ));
      toast({
        title: "Keyword Updated",
        description: "Keyword group has been updated successfully.",
      });
    } else {
      const newKeyword: KeywordGroup = {
        id: Date.now().toString(),
        category: keywordData.category || 'Other',
        canonical: keywordData.canonical || '',
        variants: keywordData.variants || [],
        is_active: true,
        usage_count: 0
      };
      setKeywords(prev => [...prev, newKeyword]);
      toast({
        title: "Keyword Added",
        description: "New keyword group has been added successfully.",
      });
    }
    setIsDialogOpen(false);
    setEditingKeyword(null);
  };

  const handleDeleteKeyword = (id: string) => {
    setKeywords(prev => prev.filter(k => k.id !== id));
    toast({
      title: "Keyword Deleted",
      description: "Keyword group has been deleted successfully.",
    });
  };

  const toggleKeywordStatus = (id: string) => {
    setKeywords(prev => prev.map(k => 
      k.id === id 
        ? { ...k, is_active: !k.is_active }
        : k
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Keyword Management</h1>
          <p className="text-muted-foreground">Manage multilingual matching keywords and their variants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keywords.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keywords.filter(k => k.is_active).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(keywords.map(k => k.category)).size}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keywords.reduce((sum, k) => sum + k.variants.length, 0)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Groups</CardTitle>
            <CardDescription>Manage canonical keywords and their multilingual variants</CardDescription>
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      setEditingKeyword(null);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Keyword Group
                  </Button>
                </DialogTrigger>
                <KeywordDialog 
                  keyword={editingKeyword} 
                  onSave={handleSaveKeyword}
                  onCancel={() => {
                    setIsDialogOpen(false);
                    setEditingKeyword(null);
                  }}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading keywords...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Canonical</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Variants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKeywords.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Hash className="w-4 h-4 text-muted-foreground" />
                          <span>{keyword.canonical}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{keyword.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {keyword.variants.slice(0, 3).map((variant, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {variant}
                            </Badge>
                          ))}
                          {keyword.variants.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{keyword.variants.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={keyword.is_active ? "default" : "outline"}
                          onClick={() => toggleKeywordStatus(keyword.id)}
                          className="h-6 px-2 text-xs"
                        >
                          {keyword.is_active ? 'Active' : 'Inactive'}
                        </Button>
                      </TableCell>
                      <TableCell>{keyword.usage_count}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingKeyword(keyword);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteKeyword(keyword.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

interface KeywordDialogProps {
  keyword: KeywordGroup | null;
  onSave: (data: Partial<KeywordGroup>) => void;
  onCancel: () => void;
}

function KeywordDialog({ keyword, onSave, onCancel }: KeywordDialogProps) {
  const [canonical, setCanonical] = useState(keyword?.canonical || '');
  const [category, setCategory] = useState(keyword?.category || '');
  const [variantsText, setVariantsText] = useState(keyword?.variants.join('\n') || '');

  useEffect(() => {
    setCanonical(keyword?.canonical || '');
    setCategory(keyword?.category || '');
    setVariantsText(keyword?.variants.join('\n') || '');
  }, [keyword]);

  const handleSave = () => {
    const variants = variantsText.split('\n').filter(v => v.trim()).map(v => v.trim());
    onSave({
      canonical,
      category,
      variants
    });
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{keyword ? 'Edit Keyword Group' : 'Add New Keyword Group'}</DialogTitle>
        <DialogDescription>
          Define a canonical keyword and its multilingual variants for matching.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="canonical">Canonical Keyword</Label>
          <Input
            id="canonical"
            placeholder="e.g., FRONTEND"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="e.g., Technology"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="variants">Variants (one per line)</Label>
          <Textarea
            id="variants"
            placeholder="Frontend Developer&#10;Front-end Developer&#10;Développeur Front-end&#10;Desenvolvedor Front-end"
            value={variantsText}
            onChange={(e) => setVariantsText(e.target.value)}
            rows={6}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {keyword ? 'Update' : 'Add'} Keyword Group
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}