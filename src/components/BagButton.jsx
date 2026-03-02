export default function BagButton({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black text-white px-2 py-2 rounded-lg hover:bg-gray-800 transition-all"
    >
      {text}
    </button>
  );
}
