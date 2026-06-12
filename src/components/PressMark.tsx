/** The print mark: a 12-spoke asterisk, stroked in currentColor. */
export function PressMark({ size = 100, className = "" }: { size?: number; className?: string }) {
    const spokes = Array.from({ length: 6 }, (_, i) => (i * 180) / 6);
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
            className={className}
        >
            {spokes.map((deg) => (
                <line
                    key={deg}
                    x1="50"
                    y1="6"
                    x2="50"
                    y2="94"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                    transform={`rotate(${deg} 50 50)`}
                />
            ))}
        </svg>
    );
}
