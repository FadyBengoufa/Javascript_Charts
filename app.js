window.onload = function getData(){
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            /**
             * Deserializing the json data to javascript object 
             */
            var data = JSON.parse(xhttp.response);

            /** 
             * LINE CHART DATA 
             */
            var dataAgeSalary = [];
            var salaryStringDollar,salaryString,salary;

             for (let i = 0; i < data.length; i++) {
                 const element = data[i];
                //remove the $ from the string
                 salaryStringDollar = element.balance.replace('$','');
                 //remove the , from the string
                 salaryString = salaryStringDollar.replace(',','');
                //change from string to float
                 salary = parseFloat(salaryString);
                //Add the data to the array after cleaning it
                dataAgeSalary.push({
                    x:element.age,
                    y:salary
                });
                 
             }
              /**
              * Sorting the array by writing the compare function for the Age
              */
                function compareAge(a,b){
                    if(a.x < b.x)return -1;
                    else if(a.x > b.x) return 1;
                    else return 0;
                }

             dataAgeSalary.sort(compareAge);
             
             console.log(dataAgeSalary);
             
             /**
              * Calculate the Average Age
              */
                var dataAgeSalaryAverage = [];
                var sum = 0;
                var count = 0;
                var average;
                var j = 0;
              for (let i = 0; i < dataAgeSalary.length; i++) {
                if(dataAgeSalary[i].x == dataAgeSalary[j].x){
                    sum = sum + dataAgeSalary[i].y;
                    count++;
                }else{
                    average = sum/count;
                    console.log("Age "+dataAgeSalary[j].x+"is declared"+count+" times");
                    
                    /**
                     * New Array with Average Salary according to Age
                     */
                    dataAgeSalaryAverage.push({
                        x:dataAgeSalary[j].x,
                        y:average
                    });

                    j=i;
                    //we decrement the i so both of the i and j starts at the same time
                    i--;
                    /**
                     * Restart the Average Count
                     */
                    average = 0; 
                    count = 0;
                    sum = 0;  
                }
              }
              console.log(dataAgeSalaryAverage);  

            /**
              * Creating the chart line graph
              */

             var chart = new CanvasJS.Chart("chartGraphContainer", {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "NST FRONT-END CHALLENGE LINE CHART"
                },
                axisX:{
                    title: "Age",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
                },
                axisY: {
                    title: "Salaries",
                    crosshair: {
                        enabled: true
                    }
                },
                data: [{        
                    type: "line",       
                    dataPoints: dataAgeSalaryAverage
                }]
            });
            chart.render();
            
              
            /**
             * Sorting the array by writing the compare function for the EyeColor
             */

            function compareEyeColor(a,b){
                if(a.eyeColor < b.eyeColor)return -1;
                else if(a.eyeColor > b.eyeColor) return 1;
                else return 0;
            }
            data.sort(compareEyeColor);


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
             //console.log(dataEyeColor);
             
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
        }
    }
    xhttp.open("GET","generated.json",true);
    xhttp.send();

}
;




