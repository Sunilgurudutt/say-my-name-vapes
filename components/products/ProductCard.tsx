import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types";
import type { Product } from "@/types";

const PLACEHOLDER: Record<string, string> = {
  "lab-series": "/images/placeholder-eliquid.svg",
  "gear-lab": "/images/placeholder-device.svg",
  "component-lab": "/images/placeholder-eliquid.svg",
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const src = product.imageUrl || PLACEHOLDER[product.category] || "/images/placeholder-eliquid.svg";
  const isSvg = src.endsWith(".svg");

  return (
    <div className={cn("bg-white rounded-xl overflow-hidden border border-[#e5e4e2] card-hover group", className)}>
      {/* Image */}
      <div className="relative aspect-square bg-[#f8f7f5] overflow-hidden">
        {!isSvg ? (
          <Image
            src={src}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f7f5]/30 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge className="text-xs font-semibold tracking-wider uppercase bg-white border border-[#e5e4e2] text-violet-600 shadow-sm">
            {CATEGORY_LABELS[product.category]}
          </Badge>
        </div>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
            <span className="text-gray-500 text-sm font-semibold tracking-widest uppercase px-3 py-1 border border-gray-300 rounded bg-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-[#1c1c1e] font-semibold text-sm leading-tight mb-1 group-hover:text-violet-700 transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-[#e5e4e2]">
          <span className="text-violet-600 font-bold text-base">{formatPrice(product.price)}</span>
          {product.inStock && (
            <span className="text-xs text-emerald-600 font-medium">In Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
