window.onload = function getData(){
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            /**
             * Deserializing the json data to javascript object 
             */
            var data = JSON.parse(xhttp.response);

            /**
             * Sorting the array by writing the compare function
             */

            function compare(a,b){
                if(a.eyeColor < b.eyeColor)return -1;
                else if(a.eyeColor > b.eyeColor) return 1;
                else return 0;
            }
            data.sort(compare);

            /**
             * Count the duplicates and add them to dataEyeColor Array
             */
            var dataEyeColor = [];
            var current = data[0].eyeColor;
            var count = 0;
            for (var i = 0; i < data.length; i++) {

                if(data[i].eyeColor != current){
                    if(count > 0){
                        dataEyeColor.push({
                            x:current,
                            value:count
                        });
                    }
                    current = data[i].eyeColor;
                    count = 1;
                }else{
                    count++;
                }
            }
            /**Add the last element to the array */
            if(count > 0){
                dataEyeColor.push({
                    x:current,
                    value:count
                });
             }
             /**
              * Creating the chart pie
              */
            // create the chart
            var chart = anychart.pie();

            // set the chart title
            chart.title("NST FRONT-END CHALLENGE PIE CHART");

            // add the data
            chart.data(dataEyeColor);

            // set legend position
            chart.legend().position("right");
            // set items layout
            chart.legend().itemsLayout("vertical");

            // display the chart in the container
            chart.container('chartPieContainer');

            chart.draw();

            /**
              * Creating the chart line graph
              */

            
        }
    }
    xhttp.open("GET","generated.json",true);
    xhttp.send();

}
;




