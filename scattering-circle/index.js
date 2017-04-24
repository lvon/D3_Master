//圆心数据
var center = [
    [0.5, 0.5],
    [0.7, 0.8],
    [0.4, 0.9],
    [0.11, 0.32],
    [0.88, 0.25],
    [0.75, 0.12],
    [0.5, 0.1],
    [0.2, 0.3],
    [0.4, 0.1],
    [0.6, 0.7]
];

var width = 800; //SVG绘制区域的宽度
var height = 800; //SVG绘制区域的高度

var svg = d3.select("body") //选择<body>
    .append("svg") //在<body>中添加<svg>
    .attr("width", width) //设定<svg>的宽度属性
    .attr("height", height); //设定<svg>的高度属性
var defs = svg.append("defs");

var getRandomR = (min = 30, max = 60, int = false) => {
    var num = d3.randomUniform(min, max)();
    if (int) {
        num = parseInt(num);
    }
    return num
}

var getRandomColor = (opa = 1) => {
    var color = `rgba(${getRandomR(0, 255,true)},${getRandomR(0, 255,true)},${getRandomR(0, 255,true)},${opa})`;
    return d3.color(color);
}

function createRadialGradient(id) {
    var radialGradient = defs.append("radialGradient")
        .attr("id", id)

    radialGradient.append("stop")
        .attr("offset", "0%")
        .style("stop-color", getRandomColor().toString());
    radialGradient.append("stop")
        .attr("offset", "95%")
        .style("stop-color", getRandomColor(0.7).toString());
    radialGradient.append("stop")
        .attr("offset", "100%")
        .style("stop-color", getRandomColor(0).toString());
}
var max_x = 1;
var max_y = 1;
//x轴宽度
var xAxisWidth = 700;

//y轴宽度
var yAxisWidth = 700;

//x轴比例尺
var xScale = d3.scaleLinear()
    .domain([0, max_x]) // 设定x轴范围
    .range([0, xAxisWidth]); // 设定x轴宽度

//y轴比例尺
var yScale = d3.scaleLinear()
    .domain([0, max_y])
    .range([0, yAxisWidth]);

//外边框
var padding = { top: 30, right: 30, bottom: 30, left: 30 };



//绘制圆
var cirlce = svg.selectAll("circle")
    .data(center) //绑定数据
    .enter() //获取enter部分
    .append("circle") //添加circle元素，使其与绑定数组的长度一致
    .attr("fill", "black") //设置颜色为black
    .attr("cx", function(d) { //设置圆心的x坐标
        return padding.left + xScale(d[0]);
    })
    .attr("cy", function(d) { //设置圆心的y坐标
        return height - padding.bottom - yScale(d[1]);
    })
    .attr('style', function() {
        var id = 'a' + getRandomR(0, 999999, true);
        createRadialGradient(id);
        d3.select(this).attr('radiaId', id)
        return 'fill:url(#' + id + ')';
    })
    .attr("r", () => { return getRandomR() });


var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);

yScale.range([yAxisWidth, 0]);

var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(5).tickFormat(count => (count ? count : ''));

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom - yAxisWidth) + ")")
    .call(yAxis);


function breath() {
    cirlce
        .attr("r", function() {
            let r = d3.select(this).attr('r')
            let nextR = getRandomR();

            d3.select(this).attr('nextR', nextR);
            return r;
        })
        .transition()
        .on('end', function() {
            breath();
        })
        .duration(3000)
        .ease((d) => {
            return Math.abs(d3.easeLinear(d))
        })
        .attr("r", function() {
            let nextR = d3.select(this).attr('nextR') - 0;
            return nextR;
        })

}