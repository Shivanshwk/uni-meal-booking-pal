
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import FoodCard from "@/components/FoodCard";
import { useStore } from "@/store/store";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CanteenDetails() {
  const { id } = useParams<{ id: string }>();
  const { canteens, foodItems } = useStore();
  const [category, setCategory] = useState<string>("all");
  
  const canteen = canteens.find((c) => c.id === id);
  const canteenFoodItems = foodItems.filter((item) => item.canteenId === id);
  
  // Get unique categories
  const categories = ["all", ...new Set(canteenFoodItems.map((item) => item.category))];
  
  // Filter by category
  const filteredFoodItems = category === "all"
    ? canteenFoodItems
    : canteenFoodItems.filter((item) => item.category === category);
  
  if (!canteen) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Canteen Not Found</h2>
          <p className="text-gray-600">The canteen you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="relative h-64 md:h-80 bg-gray-800">
        <img
          src={canteen.image}
          alt={canteen.name}
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/1200x400?text=Canteen+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{canteen.name}</h1>
            <p className="text-white/90 max-w-2xl">{canteen.description}</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} className="text-campus-purple" />
              <span>{canteen.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} className="text-campus-purple" />
              <span>{canteen.openingHours}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={18} className="text-campus-purple" />
              <span>{canteen.contact}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-campus-purple text-campus-purple">
              View on Map
            </Button>
            <Button className="bg-campus-purple hover:bg-campus-purple-dark">
              Contact Canteen
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all" value={category} onValueChange={setCategory}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
            <TabsList className="mb-6">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="capitalize"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredFoodItems.map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>
                {filteredFoodItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-600">No items found in this category.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
