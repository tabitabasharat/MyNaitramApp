import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

const LocationAutocompleteReact = () => {
  const [selectedPlace, setSelectedPlace] = useState({ city: null, country: null });
  const locationAPIKEY="AIzaSyA78WzK8evJ7Vier7fUXAqjM5KDhDwyq88"

  const handlePlaceSelected = (place: any) => {
    // Extract city and country from the address components
    const addressComponents = place.address_components;
    if (addressComponents) {
      const city = addressComponents.find((component: any) =>
        component.types.includes('locality') || component.types.includes('administrative_area_level_1')
      )?.long_name;

      const country = addressComponents.find((component: any) =>
        component.types.includes('country')
      )?.long_name;

      setSelectedPlace({
        city: city || null,
        country: country || null,
      });

      console.log('City:', city);
      console.log('Country:', country);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <p>Location check</p>
      <Autocomplete
        style={{ width: '90%' }}
        apiKey={locationAPIKEY}
        onPlaceSelected={handlePlaceSelected}
        types={['geocode']} // restrict to geographical locations
      />

      {/* Display the selected city and country */}
      {selectedPlace.city && selectedPlace.country && (
        <div className="mt-4">
          <p><strong>City:</strong> {selectedPlace.city}</p>
          <p><strong>Country:</strong> {selectedPlace.country}</p>
        </div>
      )}
    </div>
  );
};

export default LocationAutocompleteReact;
