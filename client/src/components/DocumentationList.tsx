import { useQuery } from "@tanstack/react-query";
import { Guide } from "@/lib/types";
import { Book, Shield, Calendar, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentationList() {
  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryKey: ['/api/guides']
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <Book className="h-6 w-6 text-primary-500" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-primary-500" />;
      case 'calendar':
        return <Calendar className="h-6 w-6 text-primary-500" />;
      case 'lightbulb':
        return <Lightbulb className="h-6 w-6 text-primary-500" />;
      default:
        return <Book className="h-6 w-6 text-primary-500" />;
    }
  };

  return (
    <Card className="bg-white shadow overflow-hidden sm:rounded-lg">
      <CardHeader className="px-4 py-5 sm:px-6">
        <CardTitle className="text-lg">Documentation</CardTitle>
        <CardDescription>Quick guides to help you manage your finances.</CardDescription>
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
            {guides?.map((guide) => (
              <li key={guide.id}>
                <a href="#" className="block hover:bg-gray-50 p-2 -m-2 rounded-md transition duration-150 ease-in-out">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getIcon(guide.iconName)}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-base font-medium text-gray-900">{guide.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{guide.description}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-6">
          <a href="/documentation" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
            View all guides
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
