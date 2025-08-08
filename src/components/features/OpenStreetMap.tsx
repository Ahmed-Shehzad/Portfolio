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
    // Fix for default markers in react-leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  // Create custom marker with SmileMemoji if provided
  const createCustomMarker = () => {
    if (!markerImage) return undefined;

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
    console.error("Map rendering error:", error);
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-800 text-white">
        <div className="text-center">
          <div className="mb-2 text-2xl">🗺️</div>
          <div className="text-sm">Map temporarily unavailable</div>
        </div>
      </div>
    );
  }
};
