import { useEffect, useRef, useState } from 'react';
import { Input } from "../ui/input";

interface LocationAutocompleteProps {
  value?: string;
  onLocationSelect: (location: string | null) => void;
}

const LocationAutocomplete = ({ value, onLocationSelect }: LocationAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  
  // Local state for the input value
  const [location, setLocation] = useState<string>(value || '');
const APIKEY = "AIzaSyA78WzK8evJ7Vier7fUXAqjM5KDhDwyq88"
  // Google Maps API loading
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        setIsApiLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsApiLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  // Set up autocomplete once the API is loaded
  useEffect(() => {
    if (isApiLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place?.geometry && place.geometry.location) {
          const fullAddress = place.formatted_address || '';
          setLocation(fullAddress);
          onLocationSelect(fullAddress || null);
        } else {
          onLocationSelect(null); // No valid location found
        }
      });
    }
  }, [isApiLoaded, onLocationSelect]);

  // Sync with the passed `value`
  useEffect(() => {
    if (value !== location) {
      setLocation(value || '');
    }
  }, [value]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <Input
        ref={inputRef}
        type="text"
        aria-label="Location input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location"
        className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] text-white"
        onKeyDown={handleKeyDown} 
      />
    </div>
  );
};

export default LocationAutocomplete;
