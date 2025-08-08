"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { StaticImageData } from "next/image";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface IOpenStreetMapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  markerImage?: StaticImageData;
}

export const OpenStreetMap = (props: IOpenStreetMapProps) => {
  const { center, zoom, className = "h-full w-full", markerImage } = props;

  useEffect(() => {
    try {
      // Fix for default markers in react-leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    } catch (error) {
      console.error("Failed to configure default Leaflet icons:", error);
      // Continue without custom icon configuration - Leaflet will use fallbacks
    }
  }, []);

  // Validate input props after hooks
  if (
    !center ||
    center.length !== 2 ||
    typeof center[0] !== "number" ||
    typeof center[1] !== "number"
  ) {
    console.error("Invalid center coordinates provided:", center);
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-800 text-white">
        <div className="text-center">
          <div className="mb-2 text-2xl">🗺️</div>
          <div className="text-sm font-medium">Invalid map coordinates</div>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-2 text-xs text-gray-400">
              Center coordinates must be [latitude, longitude]
            </div>
          )}
        </div>
      </div>
    );
  }

  if (typeof zoom !== "number" || zoom < 0 || zoom > 20) {
    console.error("Invalid zoom level provided:", zoom);
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-800 text-white">
        <div className="text-center">
          <div className="mb-2 text-2xl">🗺️</div>
          <div className="text-sm font-medium">Invalid zoom level</div>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-2 text-xs text-gray-400">Zoom must be between 0 and 20</div>
          )}
        </div>
      </div>
    );
  }

  // Create custom marker with SmileMemoji if provided
  const createCustomMarker = () => {
    if (!markerImage) return undefined;

    try {
      return L.divIcon({
        html: `
          <div class="relative">
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping" style="animation-duration: 2s; width: 80px; height: 80px; left: -10px; top: -10px;"></div>
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10" style="width: 80px; height: 80px; left: -10px; top: -10px;"></div>
            <div class="bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center relative" style="width: 60px; height: 60px;">
              <img src="${markerImage.src}" alt="Map marker indicating Muhammad Ahmed's location in Pakistan" style="width: 60px; height: 60px;" class="rounded-full" />
              <div class="absolute inset-0 outline-2 outline-offset-2 outline-gray-950/30 rounded-full" style="outline: 2px solid rgba(3, 7, 18, 0.3);"></div>
            </div>
          </div>
        `,
        className: "",
        iconSize: [60, 60],
        iconAnchor: [30, 30],
      });
    } catch (error) {
      console.error("Failed to create custom marker icon:", error);
      // Return undefined to fall back to default marker
      return undefined;
    }
  };

  const customIcon = createCustomMarker();

  try {
    return (
      <MapContainer
        center={center}
        zoom={zoom}
        className={className}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        zoomSnap={0.5}
        zoomDelta={0.5}
        minZoom={3}
        maxZoom={18}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} icon={customIcon} />
      </MapContainer>
    );
  } catch (error) {
    // Implement specific error handling for different types of errors
    let errorMessage = "Map temporarily unavailable";
    let errorDetails = "";

    if (error instanceof Error) {
      // Handle specific error types
      switch (error.name) {
        case "NetworkError":
        case "TypeError":
          if (error.message.includes("fetch") || error.message.includes("network")) {
            console.error("Map network error:", error);
            errorDetails = "Network connection issue";
            errorMessage = "Unable to load map tiles";
          }
          break;

        case "ReferenceError":
        case "InvalidDataError":
          console.error("Map data error:", error);
          errorDetails = "Invalid map data or configuration";
          errorMessage = "Map configuration error";
          break;

        case "InitializationError":
          console.error("Map initialization error:", error);
          errorDetails = "Failed to initialize map components";
          errorMessage = "Map failed to initialize";
          break;

        default:
          console.error("Map rendering error:", error);
          errorDetails = `Error: ${error.name} - ${error.message}`;
          break;
      }
    } else {
      // Handle non-Error objects
      console.error("Unknown map error:", error);
      errorDetails = "Unknown error occurred";
    }

    // Log additional context for debugging
    console.error("Map error context:", {
      center,
      zoom,
      className,
      hasMarkerImage: !!markerImage,
      errorType: error instanceof Error ? error.name : typeof error,
      timestamp: new Date().toISOString(),
    });

    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-800 text-white">
        <div className="text-center">
          <div className="mb-2 text-2xl">🗺️</div>
          <div className="text-sm font-medium">{errorMessage}</div>
          {process.env.NODE_ENV === "development" && errorDetails && (
            <div className="mt-2 text-xs text-gray-400">{errorDetails}</div>
          )}
        </div>
      </div>
    );
  }
};
