
import { Canteen } from "@/store/types";
import { Link } from "react-router-dom";

interface CanteenCardProps {
  canteen: Canteen;
}

export default function CanteenCard({ canteen }: CanteenCardProps) {
  return (
    <Link to={`/canteens/${canteen.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden canteen-card">
        <img
          src={canteen.image}
          alt={canteen.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/300x200?text=Canteen+Image";
          }}
        />
        <div className="p-4">
          <h3 className="font-semibold text-xl mb-2 text-gray-800">{canteen.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{canteen.description}</p>
          <p className="text-xs text-gray-500 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Open Now • {canteen.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
