import { motion, AnimatePresence } from "framer-motion";
import { Loader2Icon, RocketIcon } from "lucide-react";

type Props = {
  visible: boolean;
  onRecall: () => void;
};

export function BeyondRecallButton({ visible, onRecall }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="recall-btn"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={onRecall}
          className="absolute z-40 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer select-none bottom-8 left-1/2 -translate-x-1/2 text-[#c4b5fd]"
          style={{
            background: "rgba(20,16,50,0.92)",
            border: "1px solid rgba(167,139,250,0.45)",
            boxShadow: "0 0 18px rgba(167,139,250,0.25)",
          }}
        >
          <Loader2Icon size={14} />
          Recall <RocketIcon size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
