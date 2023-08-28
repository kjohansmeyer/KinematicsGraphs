//=============================================================================//
// --------------------------------- Header ---------------------------------- //
//=============================================================================//
//                      Created by Kevin Johansmeyer                           //
//                    Email: kevinjohansmeyer@gmail.com                        //
//=============================================================================//

'use strict'

//=============================================================================//
// ----------------------------- Update function ----------------------------- //
//=============================================================================//
// This entire function updates every time a slider is changed
function updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal, timeMaxSliderVal) {

    //=============================================================================//
    // ------------------------------ Calculations ------------------------------- //
    //=============================================================================//

    document.getElementsByClassName('initialPositionVal').innerHTML = initialPositionSliderVal;
    document.getElementsByClassName('initialVelocityVal').innerHTML = initialVelocitySliderVal;
    document.getElementsByClassName('constantAccelerationVal').innerHTML = constantAccelerationSliderVal;

    //-------------------------------- Time Array ---------------------------------//
    var deltat = 0.01,
        N = timeMaxSliderVal/deltat;
    
    var t = new Array(N).fill(0); //probably can define with time steps instead of defining with zeros

    t[0] = 0; //fills t array with [0, deltat, 2*deltat, 3*deltat...]
    for (let i = 1; i < N; i++) {
        t[i] = t[i - 1] + deltat;
    }

    //----------------------------- Defining Arrays -----------------------------//
    var positionValues = new Array(N).fill(0),
        velocityValues = new Array(N).fill(0),
        accelerationValues = new Array(N).fill(0);

    for (let n = 0; n < N; n++) {
        positionValues[n] = initialPositionSliderVal + initialVelocitySliderVal*t[n] + (1/2)*constantAccelerationSliderVal*Math.pow(t[n], 2),
        velocityValues[n] = initialVelocitySliderVal + constantAccelerationSliderVal*t[n],
        accelerationValues[n] = constantAccelerationSliderVal;
    }

    //=============================================================================//
    // ----------------------------- Generating Plots ---------------------------- //
    //=============================================================================//
    // ----------------------- Position vs. Time Plot ---------------------- //
    let layout0 = {
        title: {text: 'Position vs. Time', font: {family: 'Helvetica', size: 32, color: 'white'}},
        xaxis: {
            title: {
                text: 'Time (sec)',
                font: {family: 'Helvetica', size: 26,color: 'white'}
            },
            tickfont: {family: 'Helvetica', size: 18, color: 'white'},
            color: 'white',
            rangemode: 'nonnegative', // does this work?
            showgrid: true,
            ticks: 'outside'
        },
        yaxis: {
            title: {
                text: 'Position (m)',
                font: {family: 'Helvetica', size: 26,color: 'white'}
            },
            tickfont: {family: 'Helvetica', size: 18,color: 'white'},
            color: 'white',
            showgrid: true,
            ticks: 'outside'
        },
        margin: {l: 100, r: 50, b: 60, t: 75, pad: 4},
        plot_bgcolor: 'white', //"#383838",
        paper_bgcolor: '#181818'
    }

    let trace0 = {
        x: t,
        y: positionValues,
        name: 'Position vs. Time',
        type: 'scatter',
        line: {
            color: '#ff3d3d',//'#282828',
            width: 3,
            shape: 'spline', // Spline used to smooth curve between points
            smoothing: 1.3 // Smoothing value between 0 and 1
          }
    };

    var config0 = {
        toImageButtonOptions: {
          format: 'png', // one of png, svg, jpeg, webp
          filename: 'positionVsTimePlot',
          height: 500,
          width: 1754,
          scale: 2 // Multiply title/legend/axis/canvas sizes by this factor
        },
        modeBarButtonsToRemove: ['autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian']
    };

    let data0 = [trace0];
    Plotly.newPlot('positionVsTimePlot', data0, layout0, config0);
    
    // ----------------------- Velocity vs. Time Plot ---------------------- //
    let layout1 = {
        title: {text: 'Velocity vs. Time', font: {family: 'Helvetica', size: 32, color: 'white'}},
        xaxis: {
            title: {text: 'Time (sec)', font: {family: 'Helvetica', size: 26, color: 'white'}},
            color: 'white',
            showgrid: true,
            ticks: 'outside',
            tickfont: {family: 'Helvetica', size: 18,color: 'white'},
        },
        yaxis: {
            title: {text: 'Velocity (m/s)', font: {family: 'Helvetica', size: 26, color: 'white'}},
            color: 'white',
            showgrid: true,
            ticks: 'outside',
            tickfont: {family: 'Times New Roman', size: 18,color: 'white'},
        },
        margin: {l: 100, r: 50, b: 60, t: 75, pad: 4},
        plot_bgcolor: 'white', //"#383838",
        paper_bgcolor: "#181818"
    }

    let trace1 = {
        x: t,
        y: velocityValues,
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter',
        line: {
            color: '#ff3d3d',
            width: 3
          }
    };

    var config1 = {
        toImageButtonOptions: {
          format: 'png', // one of png, svg, jpeg, webp
          filename: 'velocityVsTimePlot',
          height: 500,
          width: 1754,
          scale: 2 // Multiply title/legend/axis/canvas sizes by this factor
        },
        modeBarButtonsToRemove: ['autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian']
    };

    let data1 = [trace1];
    Plotly.newPlot('velocityVsTimePlot', data1, layout1, config1, {modeBarButtonsToRemove: ['autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian']});

    // ----------------------- Acceleration vs. Time Plot ---------------------- //
    let layout2 = {
        title: {text: 'Accleration vs. Time', font: {family: 'Times New Roman', size: 32, color: 'white'}},
        xaxis: {
            title: {text: 'Time (sec)', font: {family: 'Times New Roman', size: 26, color: 'white'}},
            color: 'white',
            showgrid: false,
            ticks: 'outside',
            tickfont: {family: 'Times New Roman', size: 18,color: 'white'},
        },
        yaxis: {
            title: {text: 'Acceleration (m/s^2)', font: {family: 'Times New Roman', size: 26, color: 'white'}},
            color: 'white',
            showgrid: false,
            ticks: 'outside',
            tickfont: {family: 'Times New Roman', size: 18,color: 'white'},
        },
        margin: {l: 100, r: 50, b: 60, t: 75, pad: 4},
        plot_bgcolor: 'white', //"#383838",
        paper_bgcolor: "#181818"
    }

    let trace2 = {
        x: t,
        y: accelerationValues,
        xaxis: 'x3',
        yaxis: 'y3',
        type: 'scatter',
        line: {
            color: '#ff3d3d',
            width: 3
            }
    };

    var config2 = {
        toImageButtonOptions: {
            format: 'png', // one of png, svg, jpeg, webp
            filename: 'accelerationVsTime',
            height: 500,
            width: 1754,
            scale: 2 // Multiply title/legend/axis/canvas sizes by this factor
        },
        modeBarButtonsToRemove: ['autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian']
    };

    let data2 = [trace2];
    Plotly.newPlot('accelerationVsTimePlot', data2, layout2, config2, {modeBarButtonsToRemove: ['autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian']});
    
    console.log({initialPositionSliderVal});
    console.log({initialVelocitySliderVal});
    console.log({constantAccelerationSliderVal});
    console.log({timeMaxSliderVal});

    // Subplot Version:
    // var data = [trace0, trace1, trace2];

    // var layout = {
    // grid: {rows: 1, columns: 3, pattern: 'independent',ticks: 'outside'},
    // };

    // Plotly.newPlot('multiPlot', data, layout);

} // ----------------------- End of Update Function ---------------------- //

// ----------------------------- UI Elements ----------------------------- //
const initialPositionSlider = document.getElementById("initialPositionSlider");
const initialVelocitySlider = document.getElementById("initialVelocitySlider");
const constantAccelerationSlider = document.getElementById("constantAccelerationSlider");
const timeMaxSlider = document.getElementById("timeMaxSlider");

var initialPositionSliderVal = Number(initialPositionSlider.value),
    initialVelocitySliderVal = Number(initialVelocitySlider.value),
    constantAccelerationSliderVal = Number(constantAccelerationSlider.value),
    timeMaxSliderVal = Number(timeMaxSlider.value);


// ----------------------------- Update Slider Values ----------------------------- //
initialPositionSlider.addEventListener('change', function (event) {
    initialPositionSliderVal = Number(initialPositionSlider.value);
    updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal, timeMaxSliderVal);
})

initialVelocitySlider.addEventListener('change', function (event) {
    initialVelocitySliderVal = Number(initialVelocitySlider.value);
    updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal, timeMaxSliderVal);
})

constantAccelerationSlider.addEventListener('change', function (event) {
    constantAccelerationSliderVal = Number(constantAccelerationSlider.value);
    updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal, timeMaxSliderVal);
})

timeMaxSlider.addEventListener('change', function (event) {
    timeMaxSliderVal = Number(initialPositionSlider.value);
    updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal, timeMaxSliderVal);
})
// --------------------------- Toggle Plots --------------------------- //
//Citation: https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
function togglePositionVsTimePlot() {
    var x = document.getElementById("positionVsTimePlot");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function toggleVelocityVsTimePlot() {
    var x = document.getElementById("velocityVsTimePlot");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function toggleAccelerationVsTimePlot() {
    var x = document.getElementById("accelerationVsTimePlot");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// ------------------ Execute update Function for initial time ------------------ //
updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal, timeMaxSliderVal);

// ------------------ Resize plot when window size is changed ------------------ //
addEventListener("resize", (event) => {updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal, timeMaxSliderVal);});