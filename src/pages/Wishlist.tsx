
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const { toast } = useToast();
  
  const handleRemove = (itemId: string, name: string) => {
    removeFromWishlist(itemId);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your wishlist.`,
    });
  };
  
  const handleAddToCart = (foodItem: any) => {
    addToCart(foodItem);
    toast({
      title: "Added to cart",
      description: `${foodItem.name} has been added to your cart.`,
    });
  };
  
  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6 flex justify-center">
              <Heart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6">
              You haven't saved any items to your wishlist yet.
            </p>
            <Link to="/canteens">
              <Button className="bg-campus-purple hover:bg-campus-purple-dark">
                Explore Canteens
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.foodItem.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/food/${item.foodItem.id}`}>
                <img
                  src={item.foodItem.image}
                  alt={item.foodItem.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Food+Image";
                  }}
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Link to={`/food/${item.foodItem.id}`}>
                    <h3 className="font-semibold text-lg hover:text-campus-purple transition-colors">
                      {item.foodItem.name}
                    </h3>
                  </Link>
                  {item.foodItem.isVegetarian && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Veg
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {item.foodItem.description}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-campus-purple font-bold">
                    ${item.foodItem.price.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:border-red-500"
                      onClick={() => handleRemove(item.foodItem.id, item.foodItem.name)}
                    >
                      <Trash2 size={16} />
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-campus-purple hover:bg-campus-purple-dark"
                      onClick={() => handleAddToCart(item.foodItem)}
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
