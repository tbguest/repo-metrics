import { useState } from "react";

const useInput = (opts: any) => {
  const [value, setValue] = useState("");
  const input = (
    <input value={value} onChange={(e) => setValue(e.target.value)} {...opts} />
  );

  return [value, input];
};

export { useInput };
