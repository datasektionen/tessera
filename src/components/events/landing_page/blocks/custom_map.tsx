import { Editor } from "grapesjs";

export const addPredefinedLocationMapComponent = (editor: Editor, location: string) => {
    editor.DomComponents.addType('predefined-location-map', {
        extend: 'map',
        isComponent: el => el.tagName === 'IFRAME' && (el as HTMLIFrameElement).src.includes('maps.google.com'),
        model: {
            defaults: {
                type: 'map',
                attributes: {
                    // Encode the location and include it as a marker
                    src: `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=14&ie=UTF8&iwloc=&output=embed&markers=color:red|${encodeURIComponent(location)}`
                },
                traits: [
                    // Here you can modify or remove traits if you don't need users to change the location
                    // For a fixed location map, you might want to remove traits that change location
                ]
            }
        }
    });

    editor.BlockManager.add('predefined-location-map', {
        label: 'Predefined Location Map',
        category: 'Extra',
        content: {
            type: 'predefined-location-map',
            style: { width: '600px', height: '600px' }
        },
        attributes: {
            class: 'fa fa-map',
        }
    });
};
