export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<File | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // Set the final target size, downscaling to prevent localStorage / Realtime payload limits
  const MAX_WIDTH = 600;
  let targetWidth = pixelCrop.width;
  let targetHeight = pixelCrop.height;
  if (targetWidth > MAX_WIDTH) {
    const ratio = MAX_WIDTH / targetWidth;
    targetWidth = MAX_WIDTH;
    targetHeight = targetHeight * ratio;
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  // We need an intermediate canvas to handle rotation and flipping easily
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return null;

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);
  tempCanvas.width = bBoxWidth;
  tempCanvas.height = bBoxHeight;

  tempCtx.translate(bBoxWidth / 2, bBoxHeight / 2);
  tempCtx.rotate(getRadianAngle(rotation));
  tempCtx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  tempCtx.translate(-image.width / 2, -image.height / 2);
  tempCtx.drawImage(image, 0, 0);

  // Now draw the cropped region from tempCanvas to the final canvas, scaling it
  ctx.drawImage(
    tempCanvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      if (file) {
        // Create a proper File object instead of just a Blob
        const createdFile = new File([file], 'cropped_image.jpeg', {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(createdFile);
      } else {
        resolve(null);
      }
    }, 'image/jpeg', 0.75); // Lower quality to save space
  });
}
