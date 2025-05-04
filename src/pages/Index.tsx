
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FoodCard from "@/components/FoodCard";
import CanteenCard from "@/components/CanteenCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Link } from "react-router-dom";

export default function Index() {
  const { canteens, foodItems } = useStore();
  
  // Get featured items (you could customize this logic)
  const featuredFoodItems = foodItems.slice(0, 8);
  
  return (
    <Layout>
      <Hero />
      
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Campus Canteens</h2>
          <Link to="/canteens">
            <Button variant="ghost" className="text-campus-purple hover:text-campus-purple-dark">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {canteens.map((canteen) => (
            <CanteenCard key={canteen.id} canteen={canteen} />
          ))}
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular Food Items</h2>
          <Link to="/featured">
            <Button variant="ghost" className="text-campus-purple hover:text-campus-purple-dark">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredFoodItems.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gray-100 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Choose Campus Bite?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-campus-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                <span>Skip long canteen lines and save time</span>
              </li>
              <li className="flex items-start">
                <span className="bg-campus-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                <span>Order ahead for pickup at your convenience</span>
              </li>
              <li className="flex items-start">
                <span className="bg-campus-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                <span>Explore menus from all campus canteens in one place</span>
              </li>
              <li className="flex items-start">
                <span className="bg-campus-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                <span>Save your favorite meals for quick reordering</span>
              </li>
            </ul>
            <Button className="mt-6 bg-campus-orange hover:bg-campus-orange/90">
              Get Started
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
              alt="Delicious campus food" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
