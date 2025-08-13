// components/Star.tsx
const Star = ({ filled }: { filled: boolean }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? '#facc15' : '#e5e7eb'} // Tailwind: yellow-400 or gray-200
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L14.9 8.6L22 9.3L16.5 14.1L18.1 21.1L12 17.8L5.9 21.1L7.5 14.1L2 9.3L9.1 8.6L12 2Z" />
    </svg>
);
  
export default Star;
  