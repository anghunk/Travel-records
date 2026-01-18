export function lnglatToSvg(lng: number, lat: number) {
  // Mock implementation: map china bounds to 800x600 (approx)
  // China approx bounds: lng 73-135, lat 18-54
  const minLng = 73;
  const maxLng = 135;
  const minLat = 18;
  const maxLat = 54;
  
  const width = 800;
  const height = 600;

  // Simple linear interpolation
  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = height - ((lat - minLat) / (maxLat - minLat)) * height; // Invert Y for SVG

  return { x, y };
}