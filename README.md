# ZenitStudio — APK

Instaladores de la app Android de ZenitStudio y el shell de Capacitor que los genera.

## Descargar la app

En **[Releases](../../releases)** está el `.apk` más reciente. Se descarga desde el celular,
se abre, y si Android lo pide hay que permitir instalar desde orígenes desconocidos.

La primera vez la app pide permiso para enviar notificaciones. **Hay que aceptarlo**: sin eso
Android descarta los avisos de turnos y mensajes en silencio.

## Qué es esta app

Un envoltorio que abre `https://zenit-studio.sillonbarber.com.ar/barbero` (el panel del
barbero de Zenit Studio en Sillón Barber) en pantalla completa y le suma notificaciones
nativas. Hasta la v1.0.1 abría el dominio viejo, `zenitstudio.evopos.com.ar`. No empaqueta el sitio, así que:

- **El contenido se actualiza solo.** Pantallas, lógica y datos llegan con cada deploy de la
  web. Nadie reinstala nada.
- **La app nativa no.** Ícono, permisos y plugins viven en el binario. Cambiar eso pide una
  APK nueva.

El código de la web y de la API vive en un repo privado aparte. Acá solo está el cascarón.

## Publicar una versión

```bash
git tag v1.0.0 && git push origin v1.0.0
```

El workflow compila, firma y publica la release. También se puede disparar a mano desde la
pestaña Actions.

## Secrets necesarios

| Secret | Para qué |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | keystore `.jks` en base64 |
| `ANDROID_KEYSTORE_PASSWORD` | contraseña del keystore |
| `ANDROID_KEY_ALIAS` | alias de la clave |
| `ANDROID_KEY_PASSWORD` | contraseña de la clave |

**El keystore no se puede perder.** Android exige que todas las actualizaciones estén firmadas
con la misma clave: si desaparece, no hay forma de actualizar las apps ya instaladas — hay que
desinstalar y reinstalar en cada teléfono.

Sin esos secrets el workflow compila una APK *debug*. Se instala y se ve idéntica, pero está
firmada con otra clave, así que después Android rechaza la actualización. Por eso a Releases
solo sube la firmada; la debug queda como artefacto del run.
