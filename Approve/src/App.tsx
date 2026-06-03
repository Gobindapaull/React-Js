import { useState } from "react";
import ApproveModal from "./components/ApproveModal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-green-500 px-6 py-3 font-semibold"
      >
        Open Approval Modal
      </button>

      <ApproveModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App;
