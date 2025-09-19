# Portafolio — Hillary Malespín Ulloa

Sitio estático (HTML + CSS) para el portafolio de trabajos por curso y perfil profesional. Con modo claro/oscuro y la accesibilidad se implementan solo con CSS y HTML (por el momento).

link netlify: portafoliohillarymalespin.netlify.app 

## 🌳 Estructura del proyecto
```
src/
├─ index.html
├─ img/
│  └─ me.png
└─ styles/
   ├─ base.css
   ├─ layout.css
   ├─ components.css
   ├─ overrides.css
   └─ print.css
```
- `index.html`: estructura semántica, metadatos y accesibilidad.
- `base.css`: variables de tema (light/dark), reset y utilidades.
- `layout.css`: layout general (header sticky, tarjetas, grillas).
- `components.css`: navegación, botones, perfil y conmutador de tema.
- `overrides.css`: ajustes de accesibilidad y preferencias del usuario.
- `print.css`: estilos de impresión (exportar a PDF).

## ✨ Características
- **HTML5 semántico + landmarks accesibles**: `header`, `nav`, `main`, `section`, `footer` y jerarquía de títulos clara.
- **Skip link** para saltar al contenido con teclado (`Tab`) y `tabindex="-1"` en `<main>` para recibir el foco.
- **Textos alternativos (`alt`)** significativos en imágenes (retrato).
- **Enlaces externos seguros**: `target="_blank"` + `rel="noopener noreferrer"` con aviso para lectores de pantalla.
- **Responsive “mobile‑first”** con unidades relativas y grillas flexibles.
- **Modo claro/oscuro _sin JS_**:
  - Usa `prefers-color-scheme` para respetar la preferencia del sistema.
  - Conmutador accesible con dos enlaces (`☀️`/`🌙`) que cambian el `hash`: `#theme-light` y `#theme-dark`.
  - Las variables de color se sobreescriben con `:has(#theme-…:target)`.
- **Impresión cuidada** (`print.css`): oculta elementos no necesarios, colores seguros y tipografías para PDF.

## 🎨 Modo claro/oscuro (detalle técnico)
- **Por defecto**: tema claro (`:root`) y `color-scheme: light`.
- **Auto oscuro**: si el SO prefiere oscuro y **no** hay override manual, se aplican las variables dark mediante:
  ```css
  @media (prefers-color-scheme: dark) {
    html:not(:has(#theme-light:target)) { color-scheme: dark; }
    :root:not(:has(#theme-light:target)) { /* variables dark */ }
  }
  ```
- **Override manual** con links:
  ```html
  <a id="theme-light" class="visually-hidden"></a>
  <a id="theme-dark"  class="visually-hidden"></a>
  ```
  ```css
  html:has(#theme-dark:target) { color-scheme: dark; }
  :root:has(#theme-dark:target) { /* variables dark */ }
  ```

## ♿ Checklist rápida de accesibilidad (WCAG 2.1 AA)
- [ ] Títulos en orden (`h1 → h2 → h3`…), una sola etiqueta `<h1>`.
- [ ] **Skip link** visible al enfocar; el foco llega a `<main>`.
- [ ] Imágenes con `alt` significativo o `alt=""` si son meramente decorativas.
- [ ] Enlaces con texto claro; externos con `rel="noopener noreferrer"`.
- [ ] Contraste ≥ AA para texto y UI en ambos temas.
- [ ] Navegación con teclado (focus visible siempre).
- [ ] `prefers-reduced-motion`: sin animaciones críticas.
- [ ] Validación HTML (W3C Validator) sin errores.
- [ ] Pruebas rápidas con Lighthouse.

## 🔧 Personalización
- Tipografías y paleta: edita las variables en `base.css` (`:root` y overrides dark).
- Bordes/sombras de tarjetas: se heredan desde variables (o ajusta en `layout.css`).
- Navegación y botones: estilos en `components.css`.

## 📄 Licencia
© Hillary Malespín Ulloa
