import { motion } from 'framer-motion';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-4 mt-4">
      <p className="text-sm text-slate-300">Weather in {weather.city}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{weather.temperature}°C</p>
          <p className="capitalize text-slate-200">{weather.description}</p>
          <p className="text-xs text-slate-400">Humidity: {weather.humidity}%</p>
        </div>
        {weather.icon && <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" className="h-16 w-16" />}
      </div>
    </motion.div>
  );
}
