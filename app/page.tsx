"use client";

import { canvasGridManager, canvasLinesManager } from "@/utils/canvas-manager";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasGridRef = useRef(null);
  const canvasLinesRef = useRef(null);
  const [dataInput, setDataInput] = useState<string>("");
  const [data, setData] = useState<(string | number)[][]>([]);
  const [errorData, setErrorData] = useState<boolean>(false);

  const inputError = () => {
    setErrorData(true);
    setTimeout(() => {
      setErrorData(false);
    }, 5000);

    return setData([]);
  };

  const checkDataInput = () => {
    setDataInput("");
    try {
      const lines = dataInput.trim().split("\n");
      let error = false;
      const result = lines.map((line) => {
        const values = line.split(" ");
        return values.map((value: string | number) => {
          if (isNaN(value as number)) {
            error = true;
          }
          return isNaN(value as number) ? value : parseFloat(value as string);
        });
      });
      if (error) return inputError();
      return setData(result);
    } catch (error) {
      console.log(error);
      inputError();
    }
  };

  useEffect(() => {
    if (canvasGridRef.current) canvasGridManager(canvasGridRef.current);
    if (canvasLinesRef.current)
      canvasLinesManager(canvasLinesRef.current, data);
  }, [canvasGridRef, data]);

  return (
    <div className="max-w-[98%] mx-auto my-2 space-y-4 ">
      <div className="flex flex-col w-full gap-2">
        <label>
          ECG Recording Value{" "}
          {errorData && (
            <span className="text-red-600">
              The data was not in the correct format
            </span>
          )}
        </label>
        <div className="w-full flex gap-2">
          <textarea
            style={{ resize: "none" }}
            placeholder="ECG Recording"
            className="w-full text-black px-2 text-xs h-12"
            value={dataInput}
            onChange={({ target }) => setDataInput(target.value)}
          />
          <button
            className="bg-white text-black p-2 rounded-md"
            onClick={() => checkDataInput()}
          >
            Check
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <canvas
          ref={canvasGridRef}
          // className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
        <canvas
          ref={canvasLinesRef}
          className="z-10 absolute"
          // className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
      </div>
    </div>
  );
}
