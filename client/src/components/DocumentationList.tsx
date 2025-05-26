import { useQuery } from "@tanstack/react-query";
import { Guide } from "@/lib/types";
import { 
  Book, 
  Shield, 
  Lightbulb,
  CreditCard,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentationListProps {
  limit?: number;
}

export default function DocumentationList({ limit }: DocumentationListProps) {
  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryKey: ['/api/guides']
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <Book className="h-4 w-4 text-blue-400" />;
      case 'shield':
        return <Shield className="h-4 w-4 text-green-400" />;
      case 'lightbulb':
        return <Lightbulb className="h-4 w-4 text-yellow-400" />;
      default:
        return <Book className="h-4 w-4 text-blue-400" />;
    }
  };

  const quickInfo = [
    {
      icon: <CreditCard className="h-4 w-4 text-blue-400" />,
      title: "Card Management",
      description: "Block/unblock cards, view transaction history"
    },
    {
      icon: <Phone className="h-4 w-4 text-green-400" />,
      title: "Support",
      description: "Contact support for card issues or balance inquiries"
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-white">Quick Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quickInfo.map((info, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/50">
              <div className="flex-shrink-0 mt-0.5">
                {info.icon}
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">{info.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{info.description}</p>
              </div>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-16 mt-4">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-opacity-50 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          guides && guides.length > 0 && (
            <div className="space-y-2 mt-4">
              <h5 className="font-medium text-gray-300 text-sm">Helpful Guides</h5>
              {(limit ? guides.slice(0, 2) : guides.slice(0, 2)).map((guide) => (
                <div key={guide.id} className="flex items-center space-x-3 p-2 hover:bg-gray-700/50 rounded-md transition-colors">
                  {getIcon(guide.iconName)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{guide.title}</p>
                    <p className="text-xs text-gray-400 truncate">{guide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}