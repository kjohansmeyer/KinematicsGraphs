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
function updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal) {

    // ------------------ Update Class Inner HTML at the Bottom --------------------//
    for (let i = 0; i < document.getElementsByClassName('initialPositionVal').length; i++) {
        document.getElementsByClassName('initialPositionVal')[i].innerHTML = initialPositionSliderVal;
    }

    for (let i = 0; i < document.getElementsByClassName('initialVelocityVal').length; i++) {
        document.getElementsByClassName('initialVelocityVal')[i].innerHTML = initialVelocitySliderVal;
    }
    
    for (let i = 0; i < document.getElementsByClassName('initialVelocityVal').length+1; i++) {
        document.getElementsByClassName('constantAccelerationVal')[i].innerHTML = constantAccelerationSliderVal;
    }
    //=============================================================================//
    // ------------------------------ Calculations ------------------------------- //
    //=============================================================================//
    
    //-------------------------------- Time Array ---------------------------------//
    var timeMin = -100;
    var timeMax = 100;
    
    var deltat = 0.01,
        N = (timeMax-timeMin)/deltat;
    
    var t = new Array(N).fill(0); //probably can define with time steps instead of defining with zeros

    t[0] = timeMin; //fills t array with [0, deltat, 2*deltat, 3*deltat...]
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

    // Initially Displayed Domain and Range of Plot:
    var initialTimeMin = 0,
        initialTimeMax = 5,
        
        timeMinIndex = (initialTimeMin - timeMin) / deltat,
        timeMaxIndex = (initialTimeMax + timeMax) / deltat,
        initialPositionMin = Math.min.apply(null, positionValues.slice(timeMinIndex, timeMaxIndex)),
        initialPositionMax = Math.max.apply(null, positionValues.slice(timeMinIndex, timeMaxIndex)),

        initialVelocityMin = Math.min.apply(null, velocityValues.slice(timeMinIndex, timeMaxIndex)),
        initialVelocityMax = Math.max.apply(null, velocityValues.slice(timeMinIndex, timeMaxIndex)),

        constantAccelerationMin = Math.min.apply(null, accelerationValues.slice(timeMinIndex, timeMaxIndex)),
        constantAccelerationMax = Math.max.apply(null, accelerationValues.slice(timeMinIndex, timeMaxIndex));   

    if (initialPositionSliderVal >= 0) {
        var initialDisplayMinPosition = 0,
            initialDisplayMaxPosition = initialPositionMax;
    } else {
        var initialDisplayMinPosition = initialPositionMin,
            initialDisplayMaxPosition = 0;
    }

    if (initialVelocitySliderVal >= 0) {
        var initialDisplayMinVelocity = 0,
            initialDisplayMaxVelocity = initialVelocityMax;
    } else {
        var initialDisplayMinVelocity = initialVelocityMin,
            initialDisplayMaxVelocity = 0;
    }

    if (constantAccelerationSliderVal >= 0) {
        var constantDisplayMinAcceleration = 0,
            constantDisplayMaxAcceleration = constantAccelerationMax+0.2;
    } else if (constantAccelerationSliderVal == 0) {
        var constantDisplayMinAcceleration = -0.5,
            constantDisplayMaxAcceleration = 0.5;
    } else {
        var constantDisplayMinAcceleration = constantAccelerationMax-0.2,
            constantDisplayMaxAcceleration = 0;
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
            range: [0,initialTimeMax]
        },
        yaxis: {
            title: {
                text: 'Position (m)',
                font: {family: 'Helvetica', size: 26,color: 'white'}
            },
            tickfont: {family: 'Helvetica', size: 18,color: 'white'},
            color: 'white',
            range: [initialDisplayMinPosition,initialDisplayMaxPosition]
        },
        margin: {l: 100, r: 50, b: 60, t: 75, pad: 4},
        plot_bgcolor: 'black', //"#383838",
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
            tickfont: {family: 'Helvetica', size: 18,color: 'white'},
            range: [0,initialTimeMax]
        },
        yaxis: {
            title: {text: 'Velocity (m/s)', font: {family: 'Helvetica', size: 26, color: 'white'}},
            color: 'white',
            tickfont: {family: 'Times New Roman', size: 18,color: 'white'},
            range: [initialDisplayMinVelocity,initialDisplayMaxVelocity]
        },
        margin: {l: 100, r: 50, b: 60, t: 75, pad: 4},
        plot_bgcolor: 'black', //"#383838",
        paper_bgcolor: '#181818'
    }

    let trace1 = {
        x: t,
        y: velocityValues,
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
        title: {text: 'Acceleration vs. Time', font: {family: 'Times New Roman', size: 32, color: 'white'}},
        xaxis: {
            title: {text: 'Time (sec)', font: {family: 'Times New Roman', size: 26, color: 'white'}},
            color: 'white',
            ticks: 'outside',
            tickfont: {family: 'Times New Roman', size: 18,color: 'white'},
            range: [0,initialTimeMax]
        },
        yaxis: {
            title: {text: 'Acceleration (m/s<sup>2</sup>)', font: {family: 'Times New Roman', size: 26, color: 'white'}},
            color: 'white',
            ticks: 'outside',
            tickfont: {family: 'Times New Roman', size: 18,color: 'white'},
            range: [constantDisplayMinAcceleration,constantDisplayMaxAcceleration]
        },
        margin: {l: 100, r: 50, b: 60, t: 75, pad: 4},
        plot_bgcolor: 'black', //"#383838",
        paper_bgcolor: '#181818'
    }

    let trace2 = {
        x: t,
        y: accelerationValues,
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

var initialPositionSliderVal = Number(initialPositionSlider.value),
    initialVelocitySliderVal = Number(initialVelocitySlider.value),
    constantAccelerationSliderVal = Number(constantAccelerationSlider.value);

// ----------------------------- Update Slider Values ----------------------------- //
initialPositionSlider.addEventListener('change', function (event) {
    initialPositionSliderVal = Number(initialPositionSlider.value);
    updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal);
})

initialVelocitySlider.addEventListener('change', function (event) {
    initialVelocitySliderVal = Number(initialVelocitySlider.value);
    updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal);
})

constantAccelerationSlider.addEventListener('change', function (event) {
    constantAccelerationSliderVal = Number(constantAccelerationSlider.value);
    updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal);
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
updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal);

// ------------------ Resize plot when window size is changed ------------------ //
addEventListener("resize", (event) => {updateFunction(initialPositionSliderVal, initialVelocitySliderVal, constantAccelerationSliderVal);});
