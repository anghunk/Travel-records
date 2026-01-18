export interface CityDetail {
  description: string;
  images: string[];
}

export interface City {
  name: string;
  lng: number;
  lat: number;
  detail: CityDetail;
}
