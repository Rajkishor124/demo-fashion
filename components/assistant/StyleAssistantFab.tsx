
import React from 'react';
import { useStyleAssistant } from '../../context/StyleAssistantContext';

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M12 2a1 1 0 0 1 .993.883L13 3v2.585l2.828 2.829 1.415-1.414a1 1 0 0 1 1.414 1.414l-1.414 1.415L20.243 13H23a1 1 0 0 1 .117 1.993L23 15h-2.585l-2.829 2.828 1.414 1.415a1 1 0 0 1-1.414 1.414l-1.415-1.414L13 22.243V25a1 1 0 0 1-1.993.117L11 25v-2.757l-2.828-2.829 1.414-1.415a1 1 0 0 1-1.414-1.414l-1.415 1.414L3.757 15H1a1 1 0 0 1-.117-1.993L1 13h2.757l2.829-2.828-1.414-1.415a1 1 0 0 1 1.414-1.414l1.415 1.414L11 6.585V4a1 1 0 0 1 1-2zm-5 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-5 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg>
);


const StyleAssistantFab: React.FC = () => {
    const { openAssistant } = useStyleAssistant();

    return (
        <button
            onClick={openAssistant}
            className="fixed bottom-6 right-6 z-30 bg-rose text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-rose/90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose"
            aria-label="Open Style Assistant"
        >
            <SparkleIcon />
        </button>
    );
}

export default StyleAssistantFab;