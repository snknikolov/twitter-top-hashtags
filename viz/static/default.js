var frequency_list = [d3.entries(hash)];

// var colors = d3.scale.category10();
var colors = ["#ABAA98", "#F9F5C2", "#00B9D7", 
			"#FF3D73", "#F37259", "#82CDB9", 
			"#FDF5A9", "#F7208B", "#FFF7FB"];
console.log(colors);

var groupG = d3.select("#container").append("svg")
	.attr("width", 1000)
	.attr("height", 850)
	.attr("class", "wordcloud")
	.append("g")
	.attr("transform", "translate(320,200)");

d3.layout.cloud().size([1000, 850])
	.words(frequency_list)
	.rotate(0)
	.fontSize(function(d) {
		return d.value;
	})
	.on("end", draw)
	.start();

function draw(words) {
	var textContainer = groupG
		.selectAll("text")
		.data(words);

	textContainer.enter().append("text");

	textContainer.style("font-size", function(d) {
			return d.value < 4 ? 4 + "px" : d.value + "px";
		})
		.style("fill", function(d, i) {
			return colors[i % colors.length];
		})
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) {
			return d.key;
		})
		// add tooltip for mouseover count info
		.append("text:title")
		.text(function(d) {
			return d.value;
		});
}