# @mohasinac/feat-media

> **Layer 4** — All media rendering and upload components. Every `<img>`, `<video>`, and file input in the app should go through this package.

## Install

```bash
npm install @mohasinac/feat-media
```

Peer dependencies: React ≥ 18, Next.js ≥ 14.

---

## Display components

### `MediaImage`

```tsx
import { MediaImage } from "@mohasinac/feat-media";

// Always wrap in an aspect-ratio container — never fixed height
<div className="aspect-square">
  <MediaImage src={product.imageUrl} alt={product.name} size="md" fill />
</div>
```

Sizes: `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"` | `"full"`

### `MediaVideo`

```tsx
import { MediaVideo } from "@mohasinac/feat-media";

<div className="aspect-video">
  <MediaVideo src={video.url} poster={video.thumbnailUrl} controls />
</div>
```

### `MediaAvatar`

```tsx
import { MediaAvatar } from "@mohasinac/feat-media";

<MediaAvatar src={user.avatarUrl} name={user.displayName} size="md" />
```

### `MediaLightbox` / `MediaSlider`

```tsx
import { MediaLightbox, MediaSlider } from "@mohasinac/feat-media";

<MediaLightbox
  items={product.images.map(img => ({ src: img.url, alt: img.alt }))}
  open={lightboxOpen}
  onClose={() => setLightboxOpen(false)}
/>

<MediaSlider images={product.images} perView={{ mobile: 1, tablet: 2, desktop: 3 }} />
```

---

## Upload components

### `ImageUpload`

```tsx
import { ImageUpload } from "@mohasinac/feat-media";

<ImageUpload
  onFile={(file) => setSelectedFile(file)}
  maxSizeMB={5}
  accept={["image/jpeg", "image/png", "image/webp"]}
/>
```

### `MediaUploadField`

Drop-in `react-hook-form` field that handles preview + crop.

### `CameraCapture`

Triggers the device camera for photo capture.

---

## Upload hooks

```ts
import { useMediaUpload, useMediaCrop, useMediaTrim } from "@mohasinac/feat-media";

// Upload flow: select → crop → POST to /api/upload → get URL
const { upload, isUploading, url, error } = useMediaUpload({
  endpoint: "/api/upload/product-image",
});
```

---

## Crop / trim modals

```tsx
import { ImageCropModal, VideoTrimModal, VideoThumbnailSelector } from "@mohasinac/feat-media";
```

---

## Full export list

**Display:** `MediaImage`, `MediaVideo`, `MediaAvatar`, `MediaLightbox`, `MediaSlider`  
**Upload:** `ImageUpload`, `MediaUploadField`, `CameraCapture`  
**Modals:** `ImageCropModal`, `VideoTrimModal`, `VideoThumbnailSelector`  
**Hooks:** `useMediaUpload()`, `useMediaCrop()`, `useMediaTrim()`

Types: `MediaImageProps`, `MediaImageSize`, `MediaVideoProps`, `MediaAvatarProps`, `MediaLightboxProps`, `LightboxItem`, `MediaSliderProps`, `MediaUploadResult`, `ImageCropModalProps`, `VideoTrimModalProps`, `ImageUploadProps`, `MediaUploadFieldProps`, `CameraCaptureProps`

---

## Upload rule

Files are **never** uploaded from the browser directly to Firebase Storage. The upload flow is:

1. User selects/captures file in component
2. Optional crop/resize via `ImageCropModal`
3. Component sends `FormData` → Next.js API route
4. API route validates magic bytes, MIME, size → calls `storage.upload()` server-side
5. Returns public URL to component

---

## License

MIT — part of the `@mohasinac/*` monorepo.
