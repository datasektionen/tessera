import { Editor } from "grapesjs";

export default function grapesjsGoogleMaps(editor: Editor, opts = {}) {
    const options = {
        ...{
            apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            locationName: 'Washington D.C., DC, USA', // Put your fixed location here
        }, ...opts
    };

    editor.BlockManager.add('google-map', {
        label: 'Google Map',
        attributes: { class: 'fa fa-map-marker' },
        content: {
            type: 'google-map',
            style: { width: '100%', height: '350px' },
            script: function () {
                const mapElement = this;

                const initMap = () => {
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ 'address': options.locationName }, function (results, status) {
                        if (status === 'OK') {
                            // Create a map centered on the geocoded location
                            // @ts-ignore
                            const map = new google.maps.Map(mapElement, {
                                center: results![0].geometry.location,
                                zoom: 12
                            });

                            new google.maps.Marker({
                                map: map,
                                position: results![0].geometry.location
                            });
                        } else {
                            console.error('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                };

                // Load Google Maps API if not already loaded
                if (window.google && window.google.maps) {
                    initMap();
                } else {
                    const script = document.createElement('script');
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${options.apiKey}&callback=initMap`;
                    script.async = true;
                    script.defer = true;
                    document.head.appendChild(script);
                }
            },
        },
    });
}
