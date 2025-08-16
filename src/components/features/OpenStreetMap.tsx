"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { StaticImageData } from "next/image";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { escapeHtmlAttribute, sanitizeImageSrc } from "@/shared/utils";
import { secureLog } from "@/shared/utils/logging";

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
      const iconDefault = L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown };
      delete iconDefault._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    } catch (error) {
      secureLog.error(
        "Failed to configure default Leaflet icons:",
        error instanceof Error ? error.message : "Unknown error"
      );
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
    secureLog.error("Invalid center coordinates provided", "Invalid coordinates format");
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
    secureLog.error("Invalid zoom level provided", `Zoom: ${zoom}`);
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
      // Sanitize the image source to prevent XSS
      const sanitizedSrc = sanitizeImageSrc(markerImage.src);
      if (!sanitizedSrc) {
        secureLog.warn("Invalid or unsafe image source, falling back to default marker", "");
        return undefined;
      }

      // Escape HTML attributes to prevent injection
      const escapedSrc = escapeHtmlAttribute(sanitizedSrc);

      return L.divIcon({
        html: `
          <div class="relative">
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping" style="animation-duration: 2s; width: 80px; height: 80px; left: -10px; top: -10px;"></div>
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10" style="width: 80px; height: 80px; left: -10px; top: -10px;"></div>
            <div class="bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center relative" style="width: 60px; height: 60px;">
              <img src="${escapedSrc}" alt="Map marker indicating Muhammad Ahmed's location in Pakistan" style="width: 60px; height: 60px;" class="rounded-full" />
              <div class="absolute inset-0 outline-2 outline-offset-2 outline-gray-950/30 rounded-full" style="outline: 2px solid rgba(3, 7, 18, 0.3);"></div>
            </div>
          </div>
        `,
        className: "",
        iconSize: [60, 60],
        iconAnchor: [30, 30],
      });
    } catch (error) {
      secureLog.error(
        "Failed to create custom marker icon:",
        error instanceof Error ? error.message : "Unknown error"
      );
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
        scrollWheelZoom
        zoomControl
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
            secureLog.error("Map network error:", error.message);
            errorDetails = "Network connection issue";
            errorMessage = "Unable to load map tiles";
          }
          break;

        case "ReferenceError":
        case "InvalidDataError":
          secureLog.error("Map data error:", error.message);
          errorDetails = "Invalid map data or configuration";
          errorMessage = "Map configuration error";
          break;

        case "InitializationError":
          secureLog.error("Map initialization error:", error.message);
          errorDetails = "Failed to initialize map components";
          errorMessage = "Map failed to initialize";
          break;

        default:
          secureLog.error("Map rendering error:", error.message);
          errorDetails = `Error: ${error.name} - ${error.message}`;
          break;
      }
    } else {
      // Handle non-Error objects
      secureLog.error("Unknown map error:", "Non-Error object thrown");
      errorDetails = "Unknown error occurred";
    }

    // Log additional context for debugging
    secureLog.error(
      "Map error context",
      `center: ${center}, zoom: ${zoom}, hasMarkerImage: ${!!markerImage}`
    );

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
