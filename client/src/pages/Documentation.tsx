import { useQuery } from "@tanstack/react-query";
import { Guide } from "@/lib/types";
import { 
  Book, 
  Shield, 
  Calendar, 
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function Documentation() {
  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryKey: ['/api/guides']
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <Book className="h-6 w-6 text-primary" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'calendar':
        return <Calendar className="h-6 w-6 text-primary" />;
      case 'lightbulb':
        return <Lightbulb className="h-6 w-6 text-primary" />;
      default:
        return <Book className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
        <p className="mt-2 text-gray-600">Learn how to make the most of your financial tools</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {isLoading ? (
          <div className="col-span-2 h-48 flex items-center justify-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-opacity-50 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          guides?.map((guide) => (
            <Card key={guide.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {getIcon(guide.iconName)}
                  <CardTitle>{guide.title}</CardTitle>
                </div>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <p className="text-gray-600 mb-6">We've prepared a collection of comprehensive guides to help you understand and manage your finances better.</p>
        
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-lg">Financial Planning Basics</h3>
            <p className="text-gray-600 mt-1">Learn the fundamentals of creating a solid financial plan.</p>
          </div>
          
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-lg">Investment Strategies</h3>
            <p className="text-gray-600 mt-1">Discover different approaches to growing your wealth through investments.</p>
          </div>
          
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-lg">Tax Planning</h3>
            <p className="text-gray-600 mt-1">Learn how to optimize your tax situation and save money.</p>
          </div>
        </div>
        
        <button className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
          View All Resources
        </button>
      </div>
    </div>
  );
}
