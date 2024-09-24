// components/LocationAutocomplete.tsx
import { useEffect, useRef, useState } from 'react';

const LocationAutocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    // Load the Google Maps script dynamically
    const loadGoogleMapsApi = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA78WzK8evJ7Vier7fUXAqjM5KDhDwyq88&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsApiLoaded(true);
      document.body.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  useEffect(() => {
    if (isApiLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'], // Restrict to geographical locations
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place?.geometry && place.geometry.location) {
          console.log('Selected place:', place.name);
          console.log('Location:', place.geometry.location.toString());
        }
      });
    }
  }, [isApiLoaded]);

  return (
    <div className="flex flex-col items-center mt-5">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a location"
        className="border border-gray-300 p-2 rounded-md w-80"
      />
    </div>
  );
};

export default LocationAutocomplete;
