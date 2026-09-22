import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Crop, Loader2 } from 'lucide-react';
import getCroppedImg from '../utils/cropImage';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
  aspectRatio?: number;
}

export default function ImageCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  aspectRatio = 4 / 3, // Default for Home Marquee Carousel
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
      alert('Error cropping image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 text-white">
            <Crop className="w-5 h-5 text-fuchsia-500" />
            <h3 className="font-space font-bold text-lg">Crop Image</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Container */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] bg-black shrink-0">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        {/* Controls */}
        <div className="p-4 sm:p-5 flex flex-col gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-neutral-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white shadow-lg shadow-fuchsia-500/25 transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-70 disabled:active:scale-100"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Crop className="w-4 h-4" />
                  <span>Crop & Upload</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
