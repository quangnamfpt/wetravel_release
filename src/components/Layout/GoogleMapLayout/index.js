import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import '@reach/combobox/styles.css'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { memo, useState, useCallback, useEffect } from 'react'
import './GoogleMapLayout.scss'
import { english, vietnamese } from '../../Languages/MoreInformationTour';
import SearchMap from '../../images/map-search.png'

function GoogleMapLayout({ languageSelected, style, tour, setTour, hadOnclick, hadSearch, clickMarker }) {
    const txtSearch = (languageSelected === 'EN' ? english.txtSearchAddress : vietnamese.txtSearchAddress)

    let center = {
        lat: tour.latitude,
        lng: tour.longitude
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBZDeLRK0328QFPaSs-OCk03bMUOHXaMys",
        libraries: ["places"]
    })

    const handleClickMap = ((latLng) => {
        setTour({ ...tour, latitude: latLng.lat(), longitude: latLng.lng() })
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (isLoaded &&
        <div>
            <GoogleMap
                mapContainerStyle={style}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={hadOnclick && ((e) => handleClickMap(e.latLng))}
            >
                <Marker position={{
                    lat: tour.latitude,
                    lng: tour.longitude
                }} onClick={clickMarker} />
            </GoogleMap>
            {hadSearch &&
                <PlacesAutoComplete setTour={setTour} tour={tour} txtSearch={txtSearch} />
            }
        </div>
    );
}

const PlacesAutoComplete = ({ setTour, tour, txtSearch }) => {
    const [focus, setFocus] = useState(false)

    const optionFake = []

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete()

    const handleSelect = (async (address) => {
        console.log(address)
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0])
        setTour({ ...tour, latitude: lat })
        setTour({ ...tour, longitude: lng })
    })

    useEffect(() => {
        data.map(({ description }) => optionFake.push(description))
        console.log(optionFake)
    }, [data, status])

    return (
        <div className='combobox-maps'>
            {focus ? <ComboBox className='combobox-inner' onChange={e => setValue(e.target.value)} value={value} placeholder={txtSearch} onSelect={(e) => handleSelect(e)}
                options={optionFake} renderOptions={(option) => (
                    <div value={option}>{option}</div>
                )} onBlur={value.length == 0 && (() => setFocus(!focus))} /> :
                <div className='search-map-icon-back'>
                    <img src={SearchMap} onClick={() => setFocus(!focus)} />
                </div>}
        </div>
    )


    // <Combobox onSelect={handleSelect} className='combobox-maps'>
    //     {focus ? <><ComboboxInput value={value} onChange={e => setValue(e.target.value)} disabled={!ready}
    //         className='combobox-input-maps' placeholder={txtSearch} onBlur={value.length == 0 && (() => setFocus(!focus))} />
    //         <ComboboxPopover>
    //             <ComboboxList>
    //                 {status === 'OK' && data.map(({ place_id, description }) => (
    //                     <ComboboxOption key={place_id} value={description} />
    //                 ))
    //                 }
    //             </ComboboxList>
    //         </ComboboxPopover>
    //     </>
    //         :
    //         <div className='search-map-icon-back'>
    //             <img src={SearchMap} onClick={() => setFocus(!focus)} />
    //         </div>
    //     }

    // </Combobox>
}

export default memo(GoogleMapLayout)