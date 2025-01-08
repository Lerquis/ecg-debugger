const width = 600;
const height = 600;

export const canvasGridManager = (canvas: HTMLCanvasElement) => {
  if (!canvas) return;
  const context = getContext(canvas);
  if (!context) return;

  // set height and width
  canvas.width = width;
  canvas.height = height;

  // background function
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const gridPink = "#EFB6C1";
  const gridDarkPink = "#EF69B4";
  const gridDarkPink2 = "#EF1070";

  context.setTransform(1, 0, 0, 1, 0, 0);

  let xPos = 0;
  let lineNum = 0;

  while (xPos < canvas.width) {
    context.beginPath();

    if (lineNum % 5 === 1) {
      if (lineNum % 25 === 11) {
        context.strokeStyle = gridDarkPink2;
      } else {
        context.strokeStyle = gridDarkPink;
      }
    } else {
      context.strokeStyle = gridPink;
    }

    context.moveTo(xPos, 0);
    context.lineTo(xPos, canvas.height);
    context.stroke();

    // Increment xPosition and lineNumber
    xPos += 3;
    lineNum++;
  }

  let yPos = 0;
  lineNum = 0;

  // draw horizontal grid lines

  while (yPos < canvas.height) {
    context.beginPath();
    if (lineNum % 5 === 0) {
      if (lineNum % 40 === 25) {
        context.strokeStyle = gridDarkPink2;
      } else {
        context.strokeStyle = gridDarkPink;
      }
    } else {
      context.strokeStyle = gridPink;
    }
    context.moveTo(0, yPos);
    context.lineTo(canvas.width, yPos);
    context.stroke();

    yPos += 3;
    lineNum++;
  }
};

export const canvasLinesManager = (
  canvas: HTMLCanvasElement,
  data: (string | number)[][]
) => {
  if (!canvas) return;
  const context = getContext(canvas);
  if (!context) return;

  // set height and width
  canvas.width = width;
  canvas.height = height;

  const leadA: number[] = [];
  const leadB: number[] = [];
  const leadC: number[] = [];

  console.log(data);

  data.map((val) => {
    console.log(val[1]);
    leadA.push(val[1] as number);
    leadB.push(val[2] as number);
    leadC.push(val[3] as number);
  });

  plotLead(leadA, 0, canvas.height / 3, context, canvas.width);
  plotLead(leadB, 1, canvas.height / 3, context, canvas.width);
  plotLead(leadC, 2, canvas.height / 3, context, canvas.width);
};

const plotLead = (
  data: number[],
  sectionIndex: number,
  sectionHeight: number,
  ctx: CanvasRenderingContext2D,
  cWidth: number
) => {
  const sectionTop = sectionIndex * sectionHeight;
  ctx.beginPath();
  ctx.moveTo(0, sectionTop + sectionHeight / 2);
  data.forEach((val, idx) => {
    const x = (idx / (data.length - 1)) * cWidth;
    const y = sectionTop + sectionHeight / 2 - val * (sectionHeight / 8);
    ctx.lineTo(x, y);

    if (idx % 100 === 0 && sectionIndex === 0) {
      ctx.fillStyle = "black";
      ctx.font = "10px serif";
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.fillText(idx.toString(), x, y - 50);

      ctx.fillRect(x, y - 0, 2, -40);
    }
  });

  ctx.strokeStyle = ["blue", "green", "red"][sectionIndex];

  ctx.stroke();
};
const getContext = (canvas: HTMLCanvasElement) => {
  return canvas.getContext("2d");
};
