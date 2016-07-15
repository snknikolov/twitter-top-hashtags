// D3 Word Cloud Implementation by Eric Coopey:
// http://bl.ocks.org/ericcoopey/6382449

var source = new EventSource('/stream');
var hash = {};
var width = 1200;
var height = 700;

source.onmessage = function(event) {
  word = event.data.split("|")[0];
  count = event.data.split("|")[1];
  if (!skip(word)) {
    hash[word] = count;
  }
};

//update function for visualization
var updateViz =  function() {
  //print console message
  console.log("cloudArray-1" + JSON.stringify(d3.entries(hash)));

  var frequency_list = d3.entries(hash);

  d3.layout.cloud().size([800, 500])
  .words(frequency_list)
  .rotate(function() { return (~~(Math.random() * 5) - 2) * 5; })
  .fontSize(function(d) { return d.value; })
  .on("end", draw)
  .start();
};

// run updateViz at #5000 milliseconds, or 5 second
window.setInterval(updateViz, 5000);

//clean list, can be added to word skipping bolt
var skipList = ["https","follow","1","2","please","following","followers", "RT","the","at","a"];

var skip = function(tWord) {
  for (var i = 0; i< skipList.length; i++){
    if (tWord === skipList[i]) {
      return true;
    }
  }
  return false;
};
