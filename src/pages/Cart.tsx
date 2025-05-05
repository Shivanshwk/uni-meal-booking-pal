
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingCart, IndianRupee } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart, getCartTotal } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const cartTotal = getCartTotal();
  const deliveryFee = 2.00;
  const taxes = cartTotal * 0.08; // Assuming 8% tax
  const total = cartTotal + deliveryFee + taxes;
  
  const handleRemoveItem = (itemId: string, name: string) => {
    removeFromCart(itemId);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };
  
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateCartItemQuantity(itemId, quantity);
  };
  
  const handleCheckout = () => {
    // In a real app, you would navigate to a checkout page
    navigate("/checkout");
  };
  
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6 flex justify-center">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/canteens">
              <Button className="bg-campus-purple hover:bg-campus-purple-dark">
                Browse Canteens
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
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cart.map((item) => (
              <div key={item.foodItem.id} className="flex flex-col sm:flex-row gap-4 border-b py-6">
                <div className="sm:w-1/4">
                  <img
                    src={item.foodItem.image}
                    alt={item.foodItem.name}
                    className="w-full h-32 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300x200?text=Food+Image";
                    }}
                  />
                </div>
                
                <div className="sm:w-3/4 flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.foodItem.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.foodItem.description}</p>
                    <p className="text-campus-purple font-bold flex items-center">
                      <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                      {item.foodItem.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col justify-between mt-4 sm:mt-0">
                    <div className="flex items-center justify-end">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.foodItem.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="mx-4 font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.foodItem.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2"
                      onClick={() => handleRemoveItem(item.foodItem.id, item.foodItem.name)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-6">
              <Button
                variant="outline"
                className="text-gray-600"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/3 bg-gray-50 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="flex items-center">
                  <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                  {cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="flex items-center">
                  <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                  {deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="flex items-center">
                  <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                  {taxes.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t font-bold">
                <span>Total</span>
                <span className="text-campus-purple flex items-center">
                  <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
            
            <Button
              className="w-full bg-campus-orange hover:bg-campus-orange/90 mb-4"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            
            <Link to="/canteens">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
