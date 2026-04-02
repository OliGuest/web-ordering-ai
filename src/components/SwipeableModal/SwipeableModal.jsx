import { useRef, useCallback, useEffect } from "react";

/**
 * SwipeableModal — wraps modal content to enable swipe-down-to-close.
 * Works with Bootstrap modals (data-dismiss="modal") and React Bootstrap modals.
 *
 * Usage:
 *   <SwipeableModal modalId="cart-modal" onClose={optionalHandler}>
 *     <div className="modal-content">...</div>
 *   </SwipeableModal>
 */
const SwipeableModal = ({ children, modalId, onClose }) => {
    const startY = useRef(0);
    const currentY = useRef(0);
    const contentRef = useRef(null);
    const isDragging = useRef(false);
    const threshold = 80;

    const closeModal = useCallback(() => {
        if (onClose) {
            onClose();
            return;
        }
        // Bootstrap modal close
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("show");
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            // Remove backdrop
            const backdrops = document.querySelectorAll(".modal-backdrop");
            backdrops.forEach(b => b.remove());
        }
    }, [modalId, onClose]);

    const handleTouchStart = useCallback((e) => {
        const content = contentRef.current;
        if (!content) return;

        const modalBody = content.querySelector(".modal-body");
        const target = e.target;

        // If scrollable area is scrolled, only allow swipe from header/drag handle area
        if (modalBody && modalBody.scrollTop > 5) {
            const header = content.querySelector(".modal-header");
            const dragHandle = content.querySelector("[class*='drag-handle']");
            const isInHeader = header && header.contains(target);
            const isInHandle = dragHandle && dragHandle.contains(target);
            const isOnPseudo = target === content; // ::before drag handle
            if (!isInHeader && !isInHandle && !isOnPseudo) return;
        }

        startY.current = e.touches[0].clientY;
        currentY.current = startY.current;
        isDragging.current = true;
        content.style.transition = "none";
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging.current || !contentRef.current) return;

        currentY.current = e.touches[0].clientY;
        const diff = currentY.current - startY.current;

        if (diff > 0) {
            const dampened = diff * 0.55;
            contentRef.current.style.transform = `translateY(${dampened}px)`;
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging.current || !contentRef.current) return;

        const diff = currentY.current - startY.current;
        const content = contentRef.current;

        content.style.transition = "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)";

        if (diff > threshold) {
            content.style.transform = `translateY(100%)`;
            setTimeout(() => {
                content.style.transform = "";
                content.style.transition = "";
                closeModal();
            }, 280);
        } else {
            content.style.transform = "translateY(0)";
            setTimeout(() => {
                content.style.transform = "";
                content.style.transition = "";
            }, 300);
        }

        isDragging.current = false;
    }, [closeModal]);

    // Attach listeners to the modal content div
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: true });
        el.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
            el.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    return (
        <div ref={contentRef} style={{ width: "100%" }}>
            {children}
        </div>
    );
};

export default SwipeableModal;
