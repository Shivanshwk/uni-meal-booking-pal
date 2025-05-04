
import Layout from "@/components/Layout";
import CanteenCard from "@/components/CanteenCard";
import { useStore } from "@/store/store";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Canteens() {
  const { canteens } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCanteens = canteens.filter((canteen) =>
    canteen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    canteen.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Campus Canteens</h1>
        
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search canteens..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-campus-purple focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredCanteens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCanteens.map((canteen) => (
              <CanteenCard key={canteen.id} canteen={canteen} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No canteens found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
