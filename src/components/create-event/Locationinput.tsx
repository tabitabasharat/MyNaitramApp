import { useEffect, useRef } from 'react';

const LocationAutocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Ensure the Google Maps API is loaded and window is defined
    if (typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!, {
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
  }, []);

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
