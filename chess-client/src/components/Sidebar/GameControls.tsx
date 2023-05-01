import { FaFlag, FaAngleLeft, FaAngleRight, FaCog } from 'react-icons/fa';

export function GameControls() {
  const btnClassName =
    'flex-1 text-center px-4 py-2 text-white bg-[#464441] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 font-medium text-sm  mr-1';
  return (
    <div className="sidebar-controls">
      <div className="flex text-center	" role="group">
        <button type="button" className={`${btnClassName}`}>
          <FaFlag style={{ display: 'inline' }} />
        </button>
        <button type="button" className={btnClassName}>
          <FaAngleLeft />
        </button>
        <button type="button" className={btnClassName}>
          <FaAngleRight />
        </button>
        <button type="button" className={btnClassName}>
          <FaCog />
        </button>
      </div>
    </div>
  );
}
