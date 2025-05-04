
import Layout from "@/components/Layout";
import FoodCard from "@/components/FoodCard";
import CanteenCard from "@/components/CanteenCard";
import { useStore } from "@/store/store";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const { canteens, foodItems } = useStore();
  const [searchQuery, setSearchQuery] = useState(query);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);
  
  // Filter results based on search query
  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCanteens = canteens.filter((canteen) =>
    canteen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    canteen.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    canteen.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with new search query
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?q=${encodeURIComponent(searchQuery)}`
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Results</h1>
        
        <div className="mb-8 max-w-md">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for food or canteens..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-campus-purple focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All ({filteredFoodItems.length + filteredCanteens.length})</TabsTrigger>
            <TabsTrigger value="food">Food Items ({filteredFoodItems.length})</TabsTrigger>
            <TabsTrigger value="canteens">Canteens ({filteredCanteens.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            {filteredCanteens.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Canteens ({filteredCanteens.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCanteens.map((canteen) => (
                    <CanteenCard key={canteen.id} canteen={canteen} />
                  ))}
                </div>
              </div>
            )}
            
            {filteredFoodItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Food Items ({filteredFoodItems.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredFoodItems.map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>
              </div>
            )}
            
            {filteredCanteens.length === 0 && filteredFoodItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No results found for "{searchQuery}".</p>
                <p className="text-gray-500 mt-2">Try different keywords or browse our canteens.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="food" className="pt-4">
            {filteredFoodItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredFoodItems.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No food items found for "{searchQuery}".</p>
                <p className="text-gray-500 mt-2">Try different keywords or browse our canteens.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="canteens" className="pt-4">
            {filteredCanteens.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCanteens.map((canteen) => (
                  <CanteenCard key={canteen.id} canteen={canteen} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No canteens found for "{searchQuery}".</p>
                <p className="text-gray-500 mt-2">Try different keywords or browse all canteens.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
