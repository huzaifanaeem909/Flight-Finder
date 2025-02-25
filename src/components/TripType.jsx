import { useState, useRef, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { Check } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const tripTypes = [
  { id: 1, name: "Round Trip", value: "round-trip" },
  { id: 2, name: "One-Way", value: "one-way" },
];

const TripTypeSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Listbox
      value={value}
      onChange={(val) => {
        onChange(val);
        setIsOpen(false); // Close dropdown on selection
      }}
    >
      <div className="relative z-20" ref={dropdownRef}>
        {/* Selected Button */}
        <Listbox.Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full bg-[#36373A] text-[#9aa0a6] hover:bg-[#9aa0a61d] hover:rounded p-2 text-left rounded-md"
        >
          {tripTypes.find((type) => type.value === value)?.name}
          {/* Animated Dropdown Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <IoMdArrowDropdown />
          </motion.div>
        </Listbox.Button>

        {/* Dropdown Options with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-56 mt-2 bg-[#2C2F34] text-[#9aa0a6] rounded-md shadow-lg overflow-hidden"
            >
              <Listbox.Options>
                {tripTypes.map((type) => (
                  <Listbox.Option
                    key={type.id}
                    value={type.value}
                    className={({ active }) =>
                      `cursor-pointer select-none p-2 flex items-center space-x-2 ${
                        active ? "bg-[#3B4048]" : ""
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center w-full">
                        {selected && <Check className="w-5 h-5 text-white mr-2" />}
                        <span className={`${selected ? "font-medium" : "pl-7"}`}>
                          {type.name}
                        </span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Listbox>
  );
};

export default TripTypeSelect;
