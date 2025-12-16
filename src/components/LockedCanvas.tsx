import ResponsiveCanvas from "@/components/ResponsiveCanvas";
import { useAppLayout } from "@/hooks/useAppLayout";

export default function LockedCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const { topOffset } = useAppLayout();

  return (
    <ResponsiveCanvas width={1512} height={982} minScale={0.75} maxScale={1}>
      <div
        style={{
          position: "relative",
          transform: `translateY(${topOffset}px)`,
        }}
      >
        {children}
      </div>
    </ResponsiveCanvas>
  );
}
