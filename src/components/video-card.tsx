import { Card, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  channel: string;
  views: number;
  createdAt: string;
}

export function VideoCard({
  thumbnail,
  title,
  channel,
  views,
  createdAt,
}: VideoCardProps) {
  return (
    <Card className="w-full cursor-pointer hover:scale-[1.01] transition">
      <img src={thumbnail} alt="video thumbnail" className="w-full rounded-lg" />

      <CardContent className="p-3">
        <h3 className="text-md font-semibold line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{channel}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {views} views • {createdAt}
        </p>
      </CardContent>
    </Card>
  );
}
