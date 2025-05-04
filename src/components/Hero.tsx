
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-campus-purple/90 to-campus-blue/90 text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Campus Meals Made <span className="text-campus-orange">Easy</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Order from your favorite campus canteens with just a few clicks.
            Skip the lines and save your time!
          </p>
          
          <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for food or canteen..."
                className="w-full pl-10 pr-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-campus-purple text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit"
              className="bg-campus-orange hover:bg-campus-orange/90 rounded-l-none"
            >
              Search
            </Button>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-campus-purple px-6"
              onClick={() => navigate('/canteens')}
            >
              View All Canteens
            </Button>
            <Button
              className="bg-campus-orange hover:bg-campus-orange/90 px-6"
              onClick={() => navigate('/featured')}
            >
              Today's Specials
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
