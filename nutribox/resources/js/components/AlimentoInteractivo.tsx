import React, { useRef, useState } from 'react';

interface AlimentoInteractivoProps {
    nombre: string;
    imgUrl: string;
    onDropInInput?: (nombre: string) => void;
    inputRect?: DOMRect | null; // Para saber si estamos sobre el input al soltar
    initialPosition?: { top: number; left: number };
}

const AlimentoInteractivo: React.FC<AlimentoInteractivoProps> = ({
    nombre,
    imgUrl,
    onDropInInput,
    inputRect,
    initialPosition = { top: 90, left: 40 },
}) => {
    const [pos, setPos] = useState(initialPosition);
    const [dragging, setDragging] = useState(false);
    const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hover, setHover] = useState(false);

    // MOUSE
    // MouseDown: Posición e icono del ratón
    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        offset.current = {
            x: e.clientX - pos.left,
            y: e.clientY - pos.top,
        };
        document.body.style.cursor = 'grabbing';

        // Mover mientras arrastras
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        setPos({
            left: e.clientX - offset.current.x,
            top: e.clientY - offset.current.y,
        });
    };

    const handleMouseUp = (e: MouseEvent) => {
        setDragging(false);
        document.body.style.cursor = '';

        // ¿Está sobre el input?
        if (inputRect) {
            const { left, top, right, bottom } = inputRect;
            if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) {
                onDropInInput?.(nombre);
            }
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    // MÓVILES
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return;
        setDragging(true);
        const touch = e.touches[0];
        offset.current = {
            x: touch.clientX - pos.left,
            y: touch.clientY - pos.top,
        };
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        const touch = e.touches[0];
        setPos({
            left: touch.clientX - offset.current.x,
            top: touch.clientY - offset.current.y,
        });
    };

    const handleTouchEnd = (e: TouchEvent) => {
        setDragging(false);
        document.body.style.cursor = '';
        // último touch para ver dónde se soltó
        if (e.changedTouches.length > 0) {
            const touch = e.changedTouches[0];
            checkDrop(touch.clientX, touch.clientY);
        }
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
    };

    // ¿Está sobre el input?
    const checkDrop = (x: number, y: number) => {
        if (inputRect) {
            const { left, top, right, bottom } = inputRect;
            if (x > left && x < right && y > top && y < bottom) {
                onDropInInput?.(nombre);
            }
        }
    };

    return (
        <img
            className={
                'hover:shadow-primary transform-gpu select-none ' +
                (dragging
                    ? 'drag-shake hover:brightness-125 hover:drop-shadow-[0_0_25px_#45c3bc]'
                    : 'hover:scale-[1.1] hover:brightness-112 hover:drop-shadow-[0_0_8px_#45c3bc]')
            }
            src={imgUrl}
            alt={nombre}
            title={`Puedes arrastrar este alimento al cuadro de búsqueda`}
            style={{
                position: 'fixed',
                left: pos.left,
                top: pos.top,
                width: 70,
                height: 70,
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                zIndex: 50,
            }}
            draggable={false} // Se comporta mejor con false
            // Mouse
            onMouseDown={handleMouseDown}
            // Móviles
            onTouchStart={handleTouchStart}
            // Para tooltip
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        />
    );
};

export default AlimentoInteractivo;
