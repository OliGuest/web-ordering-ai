import { useRef, useCallback } from "react";

/**
 * Hook that adds swipe-down-to-close on a bottom sheet modal.
 * Returns { onTouchStart, onTouchMove, onTouchEnd } to spread on the modal content element.
 *
 * @param {Function} onClose - function to call when user swipes down far enough
 * @param {number} threshold - pixels to swipe before triggering close (default 80)
 */
export const useSwipeDown = (onClose, threshold = 80) => {
    const startY = useRef(0);
    const currentY = useRef(0);
    const sheetRef = useRef(null);
    const isDragging = useRef(false);

    const onTouchStart = useCallback((e) => {
        // Only allow swipe from the top area (header/drag handle)
        const target = e.target;
        const modalContent = e.currentTarget;
        const scrollable = modalContent.querySelector(".modal-body") || modalContent;

        // If the scrollable area is scrolled down, don't start swipe
        if (scrollable.scrollTop > 0 && !target.closest(".modal-header") && !target.closest(".pds-drag-handle")) {
            return;
        }

        startY.current = e.touches[0].clientY;
        currentY.current = startY.current;
        sheetRef.current = modalContent;
        isDragging.current = true;
        modalContent.style.transition = "none";
    }, []);

    const onTouchMove = useCallback((e) => {
        if (!isDragging.current || !sheetRef.current) return;

        currentY.current = e.touches[0].clientY;
        const diff = currentY.current - startY.current;

        // Only allow downward drag
        if (diff > 0) {
            // Add resistance as you drag further
            const dampened = diff * 0.6;
            sheetRef.current.style.transform = `translateY(${dampened}px)`;

            // Fade backdrop
            const opacity = Math.max(0, 1 - diff / 300);
            const backdrop = sheetRef.current.closest(".modal")?.querySelector(".modal-backdrop")
                || document.querySelector(".modal-backdrop.show");
            if (backdrop) {
                backdrop.style.opacity = opacity * 0.5;
            }
        }
    }, []);

    const onTouchEnd = useCallback(() => {
        if (!isDragging.current || !sheetRef.current) return;

        const diff = currentY.current - startY.current;
        const sheet = sheetRef.current;

        sheet.style.transition = "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)";

        if (diff > threshold) {
            // Swipe far enough — close
            sheet.style.transform = `translateY(100%)`;
            setTimeout(() => {
                sheet.style.transform = "";
                sheet.style.transition = "";
                onClose();
            }, 300);
        } else {
            // Snap back
            sheet.style.transform = "translateY(0)";
            setTimeout(() => {
                sheet.style.transform = "";
                sheet.style.transition = "";
            }, 300);
        }

        // Reset backdrop
        const backdrop = sheet.closest(".modal")?.querySelector(".modal-backdrop")
            || document.querySelector(".modal-backdrop.show");
        if (backdrop) {
            backdrop.style.opacity = "";
        }

        isDragging.current = false;
        sheetRef.current = null;
    }, [onClose, threshold]);

    return { onTouchStart, onTouchMove, onTouchEnd };
};
