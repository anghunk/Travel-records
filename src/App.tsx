import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { SvgMap } from '@/components/map/SvgMap';
import { CityPopup } from '@/components/map/CityPopup';
import citiesData from '@/data/flaggedCities.json';
import type { City } from '@/types';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mapStyle, setMapStyle] = useState<'osm' | 'carto-light' | 'esri-satellite'>('carto-light');

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    setIsDialogOpen(true);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-3 sm:p-4">
          <Card className="w-full max-w-full sm:max-w-[1300px]">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-4 gap-2">
              <CardTitle className="text-2xl font-normal">旅游城市</CardTitle>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="inline-flex flex-wrap rounded-md border bg-muted p-0.5">
                  <Button
                    size="sm"
                    variant={mapStyle === 'osm' ? 'default' : 'ghost'}
                    className="h-8 px-3 text-xs"
                    onClick={() => setMapStyle('osm')}
                  >
                    标准
                  </Button>
                  <Button
                    size="sm"
                    variant={mapStyle === 'carto-light' ? 'default' : 'ghost'}
                    className="h-8 px-3 text-xs"
                    onClick={() => setMapStyle('carto-light')}
                  >
                    灰色
                  </Button>
                  <Button
                    size="sm"
                    variant={mapStyle === 'esri-satellite' ? 'default' : 'ghost'}
                    className="h-8 px-3 text-xs"
                    onClick={() => setMapStyle('esri-satellite')}
                  >
                    卫星
                  </Button>
                </div>
                <ModeToggle />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="relative w-full h-[75vh] sm:h-[450px] md:h-[550px] bg-muted/30 rounded-lg overflow-hidden border border-border">
                <SvgMap
                  cities={citiesData as City[]}
                  onCityClick={handleCityClick}
                  mapStyle={mapStyle}
                />
              </div>
            </CardContent>
          </Card>

          <CityPopup
            city={selectedCity}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
          <Toaster />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
