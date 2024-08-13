import { CloudIcon } from "../Components/icons/CloudIcon";
import { CloudRainIcon } from "../Components/icons/Rainy";
import { SunIcon } from "../Components/icons/SunIcon";
import { SnowIcon } from "../Components/icons/SnowIcon";
import { ThunderstormIcon } from "../Components/icons/ThunderStorm";
import { WindIcon } from "../Components/icons/Windy";

export function displayIcon(weathercode) {

  switch (weathercode) {
    case 0: 
      return <SunIcon className="w-12 h-12 text-yellow-500" />;
    case 1:
    case 2: 
      return <CloudIcon className="w-12 h-12 text-blue-500" />;
    case 3:
    case 4: 
      return <CloudIcon className="w-12 h-12 text-gray-500" />;
    case 5:
    case 6:
    case 7:
    case 8: 
      return <CloudRainIcon className="w-12 h-12 text-blue-500" />;
    case 9:
    case 10:
    case 11: 
      return <ThunderstormIcon className="w-12 h-12 text-gray-500" />;
    case 12:
    case 13:
    case 14:
      return <SnowIcon className="w-12 h-12 text-blue-500" />;
    case 15:
    case 16:
    case 17:
      return <WindIcon className="w-12 h-12 text-blue-500" />;
    default:
      return <ThunderstormIcon className="w-12 h-12 text-gray-500" />; 
  }
}
