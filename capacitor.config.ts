import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Shell Android de ZenitStudio.
 *
 * La APK NO empaqueta el sitio: abre la URL publica en vivo. Consecuencia que conviene
 * tener presente antes de prometer nada:
 *
 *   - El CONTENIDO se actualiza solo. Pantallas, logica y datos llegan con cada deploy
 *     de la web. Nadie reinstala nada.
 *   - El CASCARON no. Icono, permisos, plugins y version de Android viven en el binario.
 *     Agregar un plugin exige APK nueva: deployar la web no alcanza, el codigo va a
 *     buscar el plugin y no esta.
 *
 * El dominio queda GRABADO en la APK. Si algun dia cambia, todas las instalaciones
 * siguen apuntando al viejo y hay que repartir una nueva.
 */

const APP_URL = 'https://zenitstudio.evopos.com.ar';
const HOST = APP_URL.replace(/^https?:\/\//, '');

const config: CapacitorConfig = {
  appId: 'com.zenitstudio.app',
  appName: 'ZenitStudio',
  // webDir es solo la pantalla de respaldo sin conexion; el contenido real sale de server.url.
  webDir: 'mobile-www',
  server: {
    // La app es para el barbero: arranca directo en su panel.
    url: `${APP_URL}/barbero`,
    androidScheme: 'https',
    cleartext: false,
    // El WebView solo navega dentro del propio dominio. Lo de afuera va al navegador.
    allowNavigation: [HOST],
    // Sin esto, cuando el sitio no responde el usuario ve el error crudo del WebView
    // ("net::ERR_...") y el fallback se empaqueta pero no se usa nunca.
    errorPath: 'index.html',
  },
  android: {
    loggingBehavior: 'none',
  },
};

export default config;
