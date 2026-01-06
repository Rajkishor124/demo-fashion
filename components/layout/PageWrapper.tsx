
import React from 'react';
// Note: framer-motion would be added here, but for this generator it's mocked
// with a simple div to keep dependencies minimal. In a real project, you would:
// import { motion } from 'framer-motion';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  // Mocking framer-motion's motion.div
  // In a real app, this would be:
  // <motion.div
  //   initial={{ opacity: 0, y: 20 }}
  //   animate={{ opacity: 1, y: 0 }}
  //   exit={{ opacity: 0, y: -20 }}
  //   transition={{ duration: 0.5 }}
  // >
  //   {children}
  // </motion.div>
  
  return <div className="animate-fadeIn">{children}</div>;
};

export default PageWrapper;
