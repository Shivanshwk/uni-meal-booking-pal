
import Layout from "@/components/Layout";
import FoodCard from "@/components/FoodCard";
import { useStore } from "@/store/store";

export default function Featured() {
  const { foodItems } = useStore();
  
  // Get featured items (items with isFeatured flag or you could customize this logic)
  const featuredItems = foodItems.filter(item => 
    item.price > 8 || item.name.toLowerCase().includes("special")
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Today's Specials</h1>
        
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredItems.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No featured items available today.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
