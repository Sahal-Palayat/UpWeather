export const getWeatherCondition = (weathercode) => {
  console.log('weather code:', weathercode);

  if (weathercode === 0) return "Sunny";
  if (weathercode === 1 || weathercode === 2) return "Partly Cloudy";
  if (weathercode === 3 || weathercode === 4) return "Cloudy";
  if (weathercode >= 5 && weathercode <= 8) return "Rainy";
  if (weathercode >= 9 && weathercode <= 11) return "Stormy";
  if (weathercode >= 12 && weathercode <= 14) return "Snowy";
  if (weathercode >= 15 && weathercode <= 17) return "Windy";
  if (weathercode >= 18 && weathercode <= 20) return "Foggy";
  if (weathercode >= 21 && weathercode <= 23) return "Hazy";
  if (weathercode >= 24 && weathercode <= 26) return "Drizzle";
  if (weathercode >= 27 && weathercode <= 29) return "Freezing Rain";
  if (weathercode >= 30 && weathercode <= 39) return "Mixed Precipitation";
  if (weathercode >= 40 && weathercode <= 49) return "Blustery";
  if (weathercode >= 50 && weathercode <= 59) return "Sleet";
  if (weathercode >= 60 && weathercode <= 69) return "Blizzard";
  if (weathercode >= 70 && weathercode <= 79) return "Cold";
  if (weathercode >= 80 && weathercode <= 89) return "Hot";
  if (weathercode >= 90 && weathercode <= 94) return "Severe Weather";
  if (weathercode === 95) return "Severe Thunderstorm";
  if (weathercode >= 96 && weathercode <= 99) return "Extreme Weather";
  if (weathercode === 100) return "Special Weather Condition";

  return "Unknown Weather Condition";
};
