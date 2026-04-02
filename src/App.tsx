import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import {
  Search,
  Filter,
  Map as MapIcon,
  Grid,
  Shuffle,
  ChevronRight,
  Clock,
  Calendar,
  DollarSign,
  Globe,
  ArrowLeft,
  X,
  Plus,
  ArrowRightLeft,
  Sun,
  Cloud,
  CloudRain,
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS, CATEGORIES, Destination } from './data/destinations';
import { cn } from './lib/utils';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "region">("name");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || dest.activities.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.region.localeCompare(b.region);
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const selectedDestination = useMemo(() =>
    DESTINATIONS.find(d => d.id === selectedDestId),
  [selectedDestId]);

  const handleRandom = () => {
    const random = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    setSelectedDestId(random.id);
    setViewMode("grid");
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setSelectedDestId(null); setIsComparing(false);}}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Globe size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Wanderlust</h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search destinations, countries..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-full text-sm transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandom}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
              title="Surprise Me"
            >
              <Shuffle size={20} />
            </button>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            >
              {viewMode === "grid" ? <MapIcon size={20} /> : <Grid size={20} />}
            </button>
            {compareList.length > 0 && (
              <button
                onClick={() => setIsComparing(true)}
                className="relative p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
              >
                <ArrowRightLeft size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!selectedDestId && !isComparing ? (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  !selectedCategory ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
                )}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                    selectedCategory === cat ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
                  )}
                >
                  {cat}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Sort by</span>
                <select
                  className="bg-transparent text-sm font-semibold outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="name">Name</option>
                  <option value="region">Region</option>
                </select>
              </div>
            </div>

            {/* Content */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDestinations.map((dest, idx) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer flex flex-col"
                    onClick={() => setSelectedDestId(dest.id)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {dest.activities.slice(0, 2).map(act => (
                          <span key={act} className="px-2 py-0.5 bg-white/90 backdrop-blur text-[10px] font-bold uppercase rounded shadow-sm">
                            {act}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(dest.id);
                        }}
                        className={cn(
                          "absolute top-3 right-3 p-2 rounded-full backdrop-blur transition-all",
                          compareList.includes(dest.id) ? "bg-indigo-600 text-white" : "bg-white/80 text-slate-600 hover:bg-white"
                        )}
                      >
                        <Plus size={16} className={cn(compareList.includes(dest.id) && "rotate-45 transition-transform")} />
                      </button>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg leading-tight">{dest.name}</h3>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {dest.region}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{dest.description}</p>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Clock size={14} />
                          <span className="text-xs font-medium">{dest.recommendedDuration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600 font-bold text-sm">
                          Explore <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden h-[600px] relative">
                <ComposableMap projectionConfig={{ scale: 140 }}>
                  <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#F1F5F9"
                            stroke="#CBD5E1"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { fill: "#E2E8F0", outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    {filteredDestinations.map((dest) => (
                      <Marker
                        key={dest.id}
                        coordinates={dest.coordinates}
                        onClick={() => setSelectedDestId(dest.id)}
                      >
                        <circle r={4} fill="#4F46E5" stroke="#fff" strokeWidth={1} className="cursor-pointer hover:r-6 transition-all" />
                        <text
                          textAnchor="middle"
                          y={-10}
                          style={{ fontFamily: "Inter", fill: "#1E293B", fontSize: "8px", fontWeight: 600, pointerEvents: "none" }}
                        >
                          {dest.name}
                        </text>
                      </Marker>
                    ))}
                  </ZoomableGroup>
                </ComposableMap>
              </div>
            )}
          </>
        ) : isComparing ? (
          <ComparisonView
            ids={compareList}
            onClose={() => setIsComparing(false)}
            onRemove={(id) => setCompareList(prev => prev.filter(i => i !== id))}
            onSelect={(id) => {setSelectedDestId(id); setIsComparing(false);}}
          />
        ) : (
          <DestinationDetail
            dest={selectedDestination!}
            onBack={() => setSelectedDestId(null)}
            onCompare={() => toggleCompare(selectedDestination!.id)}
            isComparing={compareList.includes(selectedDestination!.id)}
            onSelectSimilar={(id) => setSelectedDestId(id)}
          />
        )}
      </main>
    </div>
  );
}

function DestinationDetail({ dest, onBack, onCompare, isComparing, onSelectSimilar }: {
  dest: Destination,
  onBack: () => void,
  onCompare: () => void,
  isComparing: boolean,
  onSelectSimilar: (id: string) => void
}) {
  const [activeItinerary, setActiveItinerary] = useState<"3" | "5" | "7">("3");

  const currentItinerary = activeItinerary === "3" ? dest.itineraries.threeDay :
                          activeItinerary === "5" ? dest.itineraries.fiveDay :
                          dest.itineraries.sevenDay;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Back to Discovery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media & Basics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-indigo-600 rounded text-[10px] font-bold uppercase tracking-widest">
                      {dest.region}
                    </span>
                    <span className="text-sm font-medium opacity-80">{dest.country}</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black">{dest.name}</h2>
                </div>
                <button
                  onClick={onCompare}
                  className={cn(
                    "p-4 rounded-2xl backdrop-blur transition-all",
                    isComparing ? "bg-indigo-600 text-white" : "bg-white/20 text-white hover:bg-white/30"
                  )}
                >
                  <ArrowRightLeft size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">About {dest.name}</h3>
              <p className="text-slate-600 leading-relaxed">{dest.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-indigo-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" /> Must See
                </h4>
                <ul className="space-y-2">
                  {dest.mustSee.map(item => (
                    <li key={item} className="text-sm text-slate-600 flex items-start gap-2">
                      <ChevronRight size={14} className="mt-1 flex-shrink-0 text-slate-300" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-emerald-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full" /> Must Do
                </h4>
                <ul className="space-y-2">
                  {dest.mustDo.map(item => (
                    <li key={item} className="text-sm text-slate-600 flex items-start gap-2">
                      <ChevronRight size={14} className="mt-1 flex-shrink-0 text-slate-300" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-orange-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 rounded-full" /> Must Eat
                </h4>
                <ul className="space-y-2">
                  {dest.mustEat.map(item => (
                    <li key={item} className="text-sm text-slate-600 flex items-start gap-2">
                      <ChevronRight size={14} className="mt-1 flex-shrink-0 text-slate-300" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Itinerary Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Sample Itineraries</h3>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {(["3", "5", "7"] as const).map(days => (
                  <button
                    key={days}
                    onClick={() => setActiveItinerary(days)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                      activeItinerary === days ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {currentItinerary.map((day, idx) => (
                <div key={idx} className="relative pl-8 pb-6 border-l-2 border-slate-100 last:pb-0">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                  <h4 className="font-bold text-slate-900 mb-2">Day {day.day}: {day.title}</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {day.activities.map((act, i) => (
                      <li key={i} className="text-sm text-slate-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-300 rounded-full" /> {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Info Panel */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Sun size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-60 uppercase tracking-wider">Weather</p>
                  <p className="font-bold">{dest.weather.temp} • {dest.weather.condition}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <DollarSign size={18} className="mb-2 text-indigo-300" />
                <p className="text-[10px] font-medium opacity-60 uppercase">Currency</p>
                <p className="font-bold">{dest.currency}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <Clock size={18} className="mb-2 text-indigo-300" />
                <p className="text-[10px] font-medium opacity-60 uppercase">Timezone</p>
                <p className="font-bold">{dest.timezone}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs font-medium opacity-60 uppercase mb-2 flex items-center gap-2">
                  <Calendar size={14} /> Best Months to Visit
                </p>
                <div className="flex flex-wrap gap-1">
                  {dest.bestMonths.map(m => (
                    <span key={m} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium opacity-60 uppercase mb-2">Avoid Months</p>
                <div className="flex flex-wrap gap-1">
                  {dest.avoidMonths.map(m => (
                    <span key={m} className="px-2 py-0.5 bg-red-500/20 text-red-300 text-[10px] font-bold rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <h3 className="font-bold mb-4">Similar Destinations</h3>
            <div className="space-y-3">
              {dest.similarDestinations.map(id => {
                const similar = DESTINATIONS.find(d => d.id === id);
                if (!similar) return null;
                return (
                  <button
                    key={id}
                    onClick={() => onSelectSimilar(id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <img
                      src={similar.image}
                      alt={similar.name}
                      className="w-12 h-12 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <p className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{similar.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{similar.country}</p>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-indigo-600 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComparisonView({ ids, onClose, onRemove, onSelect }: {
  ids: string[],
  onClose: () => void,
  onRemove: (id: string) => void,
  onSelect: (id: string) => void
}) {
  const destinations = ids.map(id => DESTINATIONS.find(d => d.id === id)!).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black">Compare Destinations</h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden relative">
            <button
              onClick={() => onRemove(dest.id)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <X size={16} />
            </button>
            <img src={dest.image} alt={dest.name} className="w-full aspect-video object-cover" referrerPolicy="no-referrer" />
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                <p className="text-slate-400 text-sm">{dest.country}, {dest.region}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-medium text-slate-400 uppercase">Weather</span>
                  <span className="text-sm font-bold">{dest.weather.temp}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-medium text-slate-400 uppercase">Currency</span>
                  <span className="text-sm font-bold">{dest.currency}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-medium text-slate-400 uppercase">Duration</span>
                  <span className="text-sm font-bold">{dest.recommendedDuration}</span>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-medium text-slate-400 uppercase">Top Activities</span>
                  <div className="flex flex-wrap gap-1">
                    {dest.activities.map(act => (
                      <span key={act} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold rounded">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelect(dest.id)}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
