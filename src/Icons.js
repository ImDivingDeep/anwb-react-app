import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

var carIcon = new L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faCar} size="lg" />),
    className: '',
});

var maintenanceIcon = new L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faTriangleExclamation} size="lg" />),
    className: ''
});

export { carIcon, maintenanceIcon };