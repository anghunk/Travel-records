import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { City } from '@/types';

interface CityPopupProps {
  city: City | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CityPopup = ({ city, open, onOpenChange }: CityPopupProps) => {
  if (!city) return null;

  const description = city.detail?.description ?? '暂无城市描述';
  const images = city.detail?.images ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[80vw] sm:max-w-[80vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{city.name}</DialogTitle>
          <DialogDescription>城市描述与照片</DialogDescription>
        </DialogHeader>
        <Separator />
        <ScrollArea className="max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm p-1">
            <div className="md:col-span-1 flex flex-col gap-2">
              <div className="text-muted-foreground">描述</div>
              <p className="leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
            {images.length > 0 && (
              <div className="md:col-span-2">
                <div className="mb-2 text-muted-foreground">照片</div>
                <div className="flex flex-wrap gap-3">
                  {images.map((src, index) => (
                    <img
                      key={`${city.name}-${index}-${src}`}
                      src={src}
                      alt={`${city.name} 图片 ${index + 1}`}
                      className="h-48 w-auto rounded-md object-contain bg-background"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
