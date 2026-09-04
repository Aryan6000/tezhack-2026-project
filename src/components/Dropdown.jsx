import { useState, useEffect, useRef } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const Dropdown = ({ options, value, onChange, placeholder = "Select an option..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 group"
      >
        <span className="flex items-center gap-3">
          {value?.icon && <value.icon size={20} className="text-blue-600 shrink-0" />}
          <span className={`block truncate ${value ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
            {value ? value.label : placeholder}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown size={18} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      
      {/* Dropdown Menu */}
      <ul className={`absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm origin-top transition-all duration-200 ease-out ${isOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        {options.map((option) => (
          <li 
            key={option.id}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
            className={`relative cursor-default select-none py-2.5 pl-4 pr-9 text-gray-900 hover:bg-gray-50 transition-colors group ${value?.id === option.id ? 'bg-blue-50/50' : ''}`}
          >
            <div className="flex items-center gap-3">
              {option.icon && (
                <option.icon size={20} className={`shrink-0 transition-colors ${value?.id === option.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
              )}
              <span className={`block truncate ${value?.id === option.id ? 'font-medium' : 'font-normal'}`}>
                {option.label}
              </span>
            </div>
            {value?.id === option.id && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                <CheckCircle2 size={18} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;

