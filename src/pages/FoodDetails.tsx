
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ChevronLeft, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function FoodDetails() {
  const { id } = useParams<{ id: string }>();
  const { foodItems, canteens, addToCart, addToWishlist } = useStore();
  const { toast } = useToast();
  
  const foodItem = foodItems.find((item) => item.id === id);
  
  if (!foodItem) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Food Item Not Found</h2>
          <p className="text-gray-600">The food item you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }
  
  const canteen = canteens.find((c) => c.id === foodItem.canteenId);
  const relatedItems = foodItems
    .filter((item) => item.canteenId === foodItem.canteenId && item.id !== foodItem.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(foodItem);
    toast({
      title: "Added to cart",
      description: `${foodItem.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist(foodItem);
    toast({
      title: "Added to wishlist",
      description: `${foodItem.name} has been added to your wishlist.`,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to={`/canteens/${foodItem.canteenId}`} className="flex items-center text-campus-purple mb-6">
          <ChevronLeft size={20} className="mr-1" />
          <span>Back to {canteen?.name || "Canteen"}</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={foodItem.image}
              alt={foodItem.name}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/600x400?text=Food+Image";
              }}
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{foodItem.name}</h1>
              {foodItem.isVegetarian && (
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Vegetarian
                </span>
              )}
            </div>
            
            <div className="flex items-center">
              <span className="text-2xl font-bold text-campus-purple">${foodItem.price.toFixed(2)}</span>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Description</h3>
              <p className="text-gray-600">{foodItem.description}</p>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock size={18} className="mr-2" />
              <span>Preparation time: ~15-20 minutes</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to={`/canteens/${foodItem.canteenId}`}>
                <span className="text-campus-purple hover:underline">
                  From: {canteen?.name || "Unknown Canteen"}
                </span>
              </Link>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline"
                className="border-campus-purple text-campus-purple flex-1"
                onClick={handleAddToWishlist}
              >
                <Heart size={20} className="mr-2" />
                Add to Wishlist
              </Button>
              <Button 
                className="bg-campus-purple hover:bg-campus-purple-dark flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedItems.map((food) => (
                <Link to={`/food/${food.id}`} key={food.id} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=Food+Image";
                      }}
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{food.name}</h3>
                        <span className="text-campus-purple font-bold">${food.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
