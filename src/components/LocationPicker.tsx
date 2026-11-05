import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  Component } from
'react';
import {
  MapPin,
  Crosshair,
  Loader2,
  AlertCircle,
  Search,
  X } from
'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl =
'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl =
'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
interface LocationPickerProps {
  value: string;
  onChange: (
  address: string,
  coords?: {
    lat: number;
    lng: number;
  })
  => void;
  provincia?: string;
  className?: string;
}
interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    pedestrian?: string;
    house_number?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    county?: string;
  };
  type?: string;
}
function MapUpdater({ center }: {center: [number, number];}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}
function DraggableMarker({
  position,
  onDragEnd



}: {position: [number, number];onDragEnd: (lat: number, lng: number) => void;}) {
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          onDragEnd(lat, lng);
        }
      }
    }),
    [onDragEnd]
  );
  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={defaultIcon} />);


}
export function LocationPicker({
  value,
  onChange,
  provincia = '',
  className = ''
}: LocationPickerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState(value || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Sync external value changes
  useEffect(() => {
    setSearchQuery(value || '');
  }, [value]);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node))
      {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const searchLocations = useCallback(
    async (query: string) => {
      if (query.length < 3) {
        setResults([]);
        setShowDropdown(false);
        return;
      }
      setIsSearching(true);
      try {
        // Build search query with province context for Dominican Republic
        const searchText = provincia ?
        `${query}, ${provincia}, República Dominicana` :
        `${query}, República Dominicana`;
        // Try structured search first for better DR results
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&countrycodes=do&limit=8&addressdetails=1&bounded=1&viewbox=-72.01,21.19,-68.32,17.47`,
          {
            headers: {
              'Accept-Language': 'es'
            }
          }
        );
        let data: SearchResult[] = await response.json();
        // If no results, try a broader search with just the query in DR
        if (data.length === 0 && provincia) {
          const fallbackResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', ' + provincia + ', RD')}&countrycodes=do&limit=8&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'es'
              }
            }
          );
          data = await fallbackResponse.json();
        }
        setResults(data);
        setShowDropdown(data.length > 0);
      } catch (err) {
        console.error('Error searching locations:', err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [provincia]
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onChange(query); // Update parent immediately with typed text
    // Debounce the API search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchLocations(query);
    }, 400);
  };
  const handleSelectResult = (result: SearchResult) => {
    const addr = result.address || {};
    const street = addr.road || addr.pedestrian || '';
    const number = addr.house_number || '';
    const suburb = addr.suburb || addr.neighbourhood || '';
    const city = addr.city || addr.town || addr.village || '';
    let formattedAddress = result.display_name;
    if (street) {
      const parts = [`${street} ${number}`.trim(), suburb, city].filter(Boolean);
      formattedAddress = parts.join(', ');
    }
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setSearchQuery(formattedAddress);
    setCoords([lat, lng]);
    setShowDropdown(false);
    setResults([]);
    onChange(formattedAddress, {
      lat,
      lng
    });
  };
  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
    setShowDropdown(false);
    setCoords(null);
    onChange('');
    inputRef.current?.focus();
  };
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'es'
          }
        }
      );
      const data = await response.json();
      if (data && data.display_name) {
        const addr = data.address || {};
        const street = addr.road || addr.pedestrian || '';
        const number = addr.house_number || '';
        const suburb = addr.suburb || addr.neighbourhood || '';
        const city = addr.city || addr.town || addr.village || '';
        let formattedAddress = data.display_name;
        if (street) {
          formattedAddress = `${street} ${number}, ${suburb}, ${city}`.
          replace(/,\s*,/g, ',').
          trim();
        }
        return formattedAddress;
      }
      return null;
    } catch (err) {
      console.error('Error fetching address:', err);
      return null;
    }
  };
  const handleGeolocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('La geolocalización no es soportada por su navegador.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords([latitude, longitude]);
        const address = await fetchAddress(latitude, longitude);
        if (address) {
          setSearchQuery(address);
          onChange(address, {
            lat: latitude,
            lng: longitude
          });
        } else {
          const fallback = `Ubicación: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setSearchQuery(fallback);
          onChange(fallback, {
            lat: latitude,
            lng: longitude
          });
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(
          'No se pudo obtener su ubicación. Por favor verifique sus permisos.'
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  const handleMarkerDrag = async (lat: number, lng: number) => {
    setCoords([lat, lng]);
    const address = await fetchAddress(lat, lng);
    if (address) {
      setSearchQuery(address);
      onChange(address, {
        lat,
        lng
      });
    }
  };
  const formatResultName = (result: SearchResult) => {
    const addr = result.address || {};
    const street = addr.road || addr.pedestrian || '';
    const number = addr.house_number || '';
    const suburb = addr.suburb || addr.neighbourhood || '';
    const city = addr.city || addr.town || addr.village || '';
    const county = addr.county || '';
    if (street) {
      return {
        primary: `${street} ${number}`.trim(),
        secondary: [suburb, city, county].filter(Boolean).join(', ')
      };
    }
    const parts = result.display_name.split(',').map((s) => s.trim());
    return {
      primary: parts[0] || result.display_name,
      secondary: parts.slice(1, 3).join(', ')
    };
  };
  return (
    <div className={`space-y-3 ${className}`}>
      <style>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      `}</style>

      {/* Search Input with Autocomplete */}
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              if (results.length > 0) setShowDropdown(true);
            }}
            className="w-full pl-10 pr-10 py-3 border focus:outline-none focus:border-[#FCEE02] focus:ring-2 focus:ring-[#FCEE02]/20 transition-all rounded-lg"
            style={{
              backgroundColor: 'var(--input-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            placeholder="Ej: Calle Principal #5, Sector Los Jardines..."
            autoComplete="off" />
          
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {isSearching ?
            <Loader2
              className="w-4 h-4 animate-spin"
              style={{
                color: 'var(--text-muted)'
              }} /> :


            <Search
              className="w-4 h-4"
              style={{
                color: 'var(--text-muted)'
              }} />

            }
          </div>
          {searchQuery &&
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full transition-colors"
            style={{
              color: 'var(--text-muted)'
            }}>
            
              <X className="w-4 h-4" />
            </button>
          }
        </div>

        {/* Dropdown Results */}
        {showDropdown && results.length > 0 &&
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 border overflow-hidden max-h-72 overflow-y-auto rounded-lg"
          style={{
            backgroundColor: 'var(--dropdown-bg)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--shadow-lg)'
          }}>
          
            {results.map((result) => {
            const { primary, secondary } = formatResultName(result);
            return (
              <button
                key={result.place_id}
                type="button"
                onClick={() => handleSelectResult(result)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 border-b transition-colors"
                style={{
                  borderColor: 'var(--border-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                  'var(--dropdown-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}>
                
                  <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{
                    color: 'var(--accent-yellow-text)'
                  }} />
                
                  <div className="min-w-0 flex-1">
                    <p
                    className="font-semibold text-sm truncate"
                    style={{
                      color: 'var(--text-primary)'
                    }}>
                    
                      {primary}
                    </p>
                    {secondary &&
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{
                      color: 'var(--text-muted)'
                    }}>
                    
                        {secondary}
                      </p>
                  }
                  </div>
                </button>);

          })}
          </div>
        }
      </div>

      {/* Geolocation Button */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleGeolocation}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 font-bold uppercase text-xs tracking-wider transition-colors border border-[#FCEE02]/30 hover:border-[#FCEE02] rounded-lg"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}>
          
          {loading ?
          <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Obteniendo ubicación...
            </> :

          <>
              <Crosshair className="w-4 h-4" />
              Usar mi ubicación actual
            </>
          }
        </button>

        {error &&
        <div className="flex items-center gap-2 text-[#EC2424] text-sm bg-[#EC2424]/10 p-3 border border-[#EC2424]/20 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        }
      </div>

      {/* Map Display */}
      {coords &&
      <div className="h-56 w-full border-2 border-[#FCEE02]/50 rounded-xl overflow-hidden relative">
          <MapContainer
          center={coords}
          zoom={16}
          scrollWheelZoom={false}
          style={{
            height: '100%',
            width: '100%'
          }}>
          
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
            <MapUpdater center={coords} />
            <DraggableMarker position={coords} onDragEnd={handleMarkerDrag} />
          </MapContainer>
          <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-2 text-center z-[1000] pointer-events-none">
            Arrastra el marcador para ajustar la ubicación
          </div>
        </div>
      }
    </div>);

}