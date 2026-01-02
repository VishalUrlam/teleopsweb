"use client";

export function YCBadge() {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#ff6600]/10 border border-[#ff6600]/30">
            <div className="w-4 h-4 bg-[#ff6600] rounded-sm flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">Y</span>
            </div>
            <span className="text-xs font-medium text-[#ff6600]">W26</span>
        </div>
    );
}
