const canvasPlot = document.getElementById('canvas');
const ctx = canvasPlot.getContext('2d');
const createGraf = document.getElementById('create')
const graf = document.getElementById('graf');
const colorAxisBtn = document.getElementById('color-axis');
const colorGrafBtn = document.getElementById('color-graf');
const funcGraf  = document.getElementById('graf');
const downloadBtn = document.getElementById('download');

let colorAxis = "black";
let colorGraf = "red";
colorAxisBtn.addEventListener('change', () => {
    colorAxis = colorAxisBtn.value;
});
colorGrafBtn.addEventListener('change', () => {
    colorGraf = colorGrafBtn.value;
});

function createGrafic () {
//Сетка
ctx.clearRect(0, 0 , 700, 500);
const canvasPlotWidth = canvasPlot.clientWidth;
const canvasPlotHeight = canvasPlot.clientHeight;
const scaleX = 50;
const scaleY = 50;
const xAxis = Math.round(canvasPlotWidth/ 2);
const yAxis = Math.round(canvasPlotHeight/ 2);
ctx.font = `${Math.round(scaleX / 5)}px Arial`

ctx.beginPath();
for (let i = 0; i <= canvasPlotWidth; i=i + scaleX) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasPlotHeight);
    ctx.fillText((i - xAxis) / scaleX, i + 10, yAxis + 10);
}
for (let i = 0; i <= canvasPlotHeight; i=i + scaleX) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvasPlotWidth,i);
    ctx.fillText((yAxis - i) / scaleY, xAxis + 5, i + 5);
}
ctx.stroke();
ctx.closePath();



//Оси графика
ctx.beginPath();
ctx.strokeStyle = colorAxis;
ctx.moveTo(xAxis, 0);
ctx.lineTo(xAxis, canvasPlotHeight);
ctx.fillText('y', xAxis - 20, 20);
ctx.moveTo(0, yAxis);
ctx.lineTo(canvasPlotWidth, yAxis);
ctx.fillText('x', canvasPlotWidth - 20, yAxis - 20);
ctx.stroke();
ctx.closePath();

//График
ctx.fillStyle = colorGraf;
for (let i = 0; i <= canvasPlotWidth; i++) {
    const x = (i - xAxis) / scaleX;
    const y = eval(funcGraf.value);
    ctx.fillRect(x * scaleX + xAxis, yAxis - scaleY * y, 5, 5);
}


}
createGraf.addEventListener('click', createGrafic);
downloadBtn.addEventListener('click', () => {
    downloadBtn.href = canvasPlot.toDataURL('image/jpg', 1);
    downloadBtn.download = 'paint-example.jpeg';
});
