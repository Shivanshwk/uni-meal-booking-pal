
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Checkout() {
  const { cart, getCartTotal, clearCart, isAuthenticated, user } = useStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for order placement
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [tokenNumber, setTokenNumber] = useState("");
  
  // Form state
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  
  const cartTotal = getCartTotal();
  const deliveryFee = 2.00;
  const taxes = cartTotal * 0.08; // Assuming 8% tax
  const total = cartTotal + deliveryFee + taxes;
  
  // If no items in cart, redirect to cart page
  if (cart.length === 0 && !orderCompleted) {
    navigate("/cart");
    return null;
  }
  
  // Generate pickup time options (every 15 minutes from current time)
  const generatePickupTimeOptions = () => {
    const options = [];
    const now = new Date();
    // Start 30 minutes from now
    now.setMinutes(now.getMinutes() + 30);
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    
    for (let i = 0; i < 12; i++) {
      const time = new Date(now);
      time.setMinutes(time.getMinutes() + (i * 15));
      
      const hours = time.getHours();
      const minutes = time.getMinutes();
      
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const period = hours < 12 ? 'AM' : 'PM';
      
      const timeString = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      options.push(timeString);
    }
    
    return options;
  };
  
  const pickupTimeOptions = generatePickupTimeOptions();
  
  const handlePlaceOrder = async () => {
    // Validate form
    if (!name || !email || !phone || !pickupTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing and order creation
    try {
      // In a real application, you would call your backend API here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random token number
      const generatedToken = Math.floor(10000 + Math.random() * 90000).toString();
      setTokenNumber(generatedToken);
      
      // Clear the cart after successful order
      clearCart();
      setOrderCompleted(true);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (orderCompleted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Order Confirmed!</CardTitle>
              <CardDescription className="text-center">
                Thank you for your order. Your food will be ready for pickup soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-md text-center">
                <p className="text-gray-500">Your Token Number</p>
                <p className="text-4xl font-bold text-campus-purple">{tokenNumber}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Time:</span>
                  <span className="font-medium">{pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Total:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Please show your token number when you arrive to pick up your order.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-campus-purple hover:bg-campus-purple-dark"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-8">
            {!isAuthenticated && (
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Have an account? Log in for faster checkout.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/login", { state: { redirectTo: "/checkout" } })}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/signup", { state: { redirectTo: "/checkout" } })}
                  >
                    Sign Up
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-2 border rounded-md"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label htmlFor="pickup-time" className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Time *
                  </label>
                  <select
                    id="pickup-time"
                    className="w-full p-2 border rounded-md"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                  >
                    <option value="">Select a pickup time</option>
                    {pickupTimeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="online" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="online">Pay Online</TabsTrigger>
                    <TabsTrigger value="cash">Pay at Pickup</TabsTrigger>
                  </TabsList>
                  <TabsContent value="online" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="card-number"
                          className="w-full p-2 border rounded-md"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date *
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            className="w-full p-2 border rounded-md"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            className="w-full p-2 border rounded-md"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="card-name"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="cash" className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>You'll pay when you pick up your order.</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Please bring the exact amount in cash. Pickup counter accepts cash only.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.foodItem.id} className="flex justify-between">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{item.quantity}x</span>
                      <span>{item.foodItem.name}</span>
                    </div>
                    <span>${(item.foodItem.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Total</span>
                    <span className="text-campus-purple">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-campus-orange hover:bg-campus-orange/90"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
