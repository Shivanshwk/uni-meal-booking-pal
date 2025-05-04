
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { FoodItem } from "@/store/types";
import { useStore } from "@/store/store";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface FoodCardProps {
  food: FoodItem;
}

export default function FoodCard({ food }: FoodCardProps) {
  const { addToCart, addToWishlist } = useStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(food);
    toast({
      title: "Added to cart",
      description: `${food.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist(food);
    toast({
      title: "Added to wishlist",
      description: `${food.name} has been added to your wishlist.`,
      variant: "default",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden food-card">
      <Link to={`/food/${food.id}`}>
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/300x200?text=Food+Image";
          }}
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/food/${food.id}`}>
            <h3 className="font-semibold text-lg hover:text-campus-purple transition-colors">
              {food.name}
            </h3>
          </Link>
          {food.isVegetarian && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Veg
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{food.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-campus-purple font-bold">₹{food.price}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="text-gray-600 hover:text-campus-purple hover:border-campus-purple"
              onClick={handleAddToWishlist}
            >
              <Heart size={18} />
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-campus-purple hover:bg-campus-purple-dark"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
