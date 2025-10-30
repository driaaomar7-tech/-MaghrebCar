import React, { useEffect, useState, useRef } from 'react';

// Declare Leaflet's global object 'L' to avoid TypeScript errors
declare const L: any;

interface MapPreviewProps {
  location: string;
  className?: string;
  interactive?: boolean;
}

// In-memory cache for geocoded locations to avoid repeated API calls
const geocodeCache = new Map<string, { lat: number; lng: number } | null>();

const MapPreview: React.FC<MapPreviewProps> = ({ location, className = '', interactive = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const geocodeLocation = async () => {
      if (!location) {
        setError('No location provided.');
        setIsLoading(false);
        return;
      }
      
      // Reset state for new location
      setIsLoading(true);
      setError(null);
      setCoords(null);

      // Check cache first
      if (geocodeCache.has(location)) {
        const cachedCoords = geocodeCache.get(location);
        setCoords(cachedCoords);
        if(!cachedCoords) setError(`Could not find coordinates for "${location}".`);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location + ', Morocco')}&format=json&limit=1&countrycodes=ma`
        );
        if (!response.ok) {
          throw new Error('Geocoding service failed.');
        }
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
          geocodeCache.set(location, newCoords); // Cache the result
          setCoords(newCoords);
        } else {
          geocodeCache.set(location, null); // Cache not found result
          setCoords(null);
          setError(`Could not find coordinates for "${location}".`);
        }
      } catch (err) {
        console.error('Geocoding error:', err);
        setError('Failed to fetch coordinates.');
        geocodeCache.set(location, null);
      } finally {
        setIsLoading(false);
      }
    };

    geocodeLocation();
  }, [location]);

  useEffect(() => {
    // Clean up previous map instance if it exists
    if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
    }

    // Initialize map only when we have coordinates and a container
    if (coords && mapContainerRef.current && typeof L !== 'undefined') {
        const map = L.map(mapContainerRef.current, {
          scrollWheelZoom: interactive,
          dragging: interactive,
          zoomControl: interactive,
        }).setView([coords.lat, coords.lng], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([coords.lat, coords.lng]).addTo(map);

        mapInstanceRef.current = map;
    }
    
    // Cleanup function to remove map on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coords, interactive]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 rounded-md ${className}`}>
        <p className="text-sm text-gray-500">جاري تحميل الخريطة...</p>
      </div>
    );
  }

  if (error || !coords) {
    return (
       <div className={`flex items-center justify-center bg-gray-100 border border-dashed rounded-md ${className}`}>
        <p className="text-xs text-gray-400 p-2 text-center">{error || 'الخريطة غير متوفرة.'}</p>
      </div>
    );
  }

  return <div ref={mapContainerRef} className={`rounded-md ${className}`} style={{zIndex: 0}} />;
};

export default MapPreview;
