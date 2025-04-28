import { useQuery } from "@tanstack/react-query";
import { Guide } from "@/lib/types";
import { 
  Utensils, Shield, Clock, HelpCircle, ArrowRight, 
  QrCode, BookOpen, Wallet, MapPin 
} from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function DocumentationList() {
  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryKey: ['/api/guides']
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="h-6 w-6 text-emerald-500" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-red-500" />;
      case 'calendar':
        return <Clock className="h-6 w-6 text-blue-500" />;
      case 'lightbulb':
        return <HelpCircle className="h-6 w-6 text-amber-500" />;
      default:
        return <Utensils className="h-6 w-6 text-emerald-500" />;
    }
  };

  // Modify guide titles and descriptions to match cafeteria context
  const cafeteriaGuides = guides?.map(guide => {
    let title = guide.title;
    let description = guide.description;
    
    if (guide.title === "How to track your spending") {
      title = "Cafeteria Locations & Hours";
      description = "Find all on-campus cafeterias, their opening hours and menu specialties.";
    } else if (guide.title === "Security best practices") {
      title = "Lost or Stolen Card?";
      description = "Learn how to block your card immediately and request a replacement.";
    } else if (guide.title === "Setting up recurring payments") {
      title = "Meal Plan Options";
      description = "Explore different meal plan packages and subscription options.";
    } else if (guide.title === "Getting financial insights") {
      title = "Cafeteria Menu Guide";
      description = "Browse weekly meal schedules and nutritional information.";
    }
    
    return {
      ...guide,
      title,
      description
    };
  });

  return (
    <Card className="bg-white shadow overflow-hidden sm:rounded-lg">
      <CardHeader className="px-4 py-5 sm:px-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="text-lg flex items-center">
          <Utensils className="h-5 w-5 mr-2 text-emerald-600" />
          Cafeteria Guide
        </CardTitle>
        <CardDescription>Helpful information about campus dining services.</CardDescription>
      </CardHeader>
      <CardContent className="border-t border-gray-200 px-4 py-5 sm:p-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-10 w-10 rounded mr-3" />
                <div>
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-60" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {cafeteriaGuides?.map((guide) => (
              <li key={guide.id}>
                <a href="#" className="block hover:bg-gray-50 p-2 -m-2 rounded-md transition duration-150 ease-in-out">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getIcon(guide.iconName)}
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h4 className="text-base font-medium text-gray-900">{guide.title}</h4>
                        {guide.title === "Lost or Stolen Card?" && (
                          <Badge variant="outline" className="ml-2 text-xs bg-red-50 text-red-700 border-red-200">
                            Important
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{guide.description}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-6 border-t border-gray-100 pt-4">
          <a href="/documentation" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center">
            View complete cafeteria guide
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
