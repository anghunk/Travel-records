import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import type { City } from '@/types';
import { lnglatToSvg } from '@/lib/map-utils';

interface RedFlagProps {
  city: City;
  onClick: () => void;
}

export const RedFlag = ({ city, onClick }: RedFlagProps) => {
  const { x, y } = lnglatToSvg(city.lng, city.lat);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute h-6 w-6 p-0 border-0 shadow-none hover:bg-transparent focus:ring-0" 
          style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -100%)' }}
          onClick={onClick}
        >
          <MapPin className="h-5 w-5 text-destructive fill-current" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{city.name}</TooltipContent>
    </Tooltip>
  );
};
