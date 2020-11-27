import React from "react";

interface IProps {
  width?:
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64;
  height?:
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64;
  minWidth?:
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64;

  minHeight?:
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64;
  maxWidth?:
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64;
  maxHeight?:
    | "auto"
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64;
}

export const SizedBox: React.FC<IProps> = function ({
  children,
  width = "auto",
  height = "auto",
  minWidth = "auto",
  minHeight = "auto",
  maxWidth = "auto",
  maxHeight = "auto",
}) {
  return (
    <div
      className={`w-${width} h-${height} min-w-${minWidth} min-h-${minHeight} max-w-${maxWidth} max-h-${maxHeight}`}
    >
      {children}
    </div>
  );
};
