const stimul = document.getElementById('stimul');
const firstGate = document.getElementById('gate-1');
const secondGate = document.getElementById('gate-2');
const hint = document.getElementById('hint');

const probeOneAvg = document.getElementById('probe-1-avg');
const correctReactionOne = document.getElementById('correct-reaction-1');
const probeNumber = document.getElementById('probe-number');

const ROquantityOne = document.getElementById('ro-quantity-1');
const ROavgTimeOne = document.getElementById('ro-avg-time-1');
const RoMinOne = document.getElementById('ro-min-1');
const RoMaxOne = document.getElementById('ro-max-1');
const RoSkoOne = document.getElementById('ro-sko-1');
const RoRazOne = document.getElementById('ro-razmah-1');
const RoKoefVarOne = document.getElementById('ro-koef-var-1');
const RoQuantityIn = document.getElementById('ro-quantity-in-1');
const RoQuantityOut = document.getElementById('ro-quantity-out-1');
const RoPercentOut = document.getElementById('ro-percent-out-1');


const RZquantityOne = document.getElementById('rz-quantity-1');
const RZavgTimeOne = document.getElementById('rz-avg-time-1');
const RzMinOne = document.getElementById('rz-min-1');
const RzMaxOne = document.getElementById('rz-max-1');
const RzSkoOne = document.getElementById('rz-sko-1');
const RzRazOne = document.getElementById('rz-razmah-1');
const RzKoefVarOne = document.getElementById('rz-koef-var-1');
const RzQuantityIn = document.getElementById('rz-quantity-in-1');
const RzQuantityOut = document.getElementById('rz-quantity-out-1');
const RzPercentOut = document.getElementById('rz-percent-out-1');

const AvgIn = document.getElementById('avg-in');
const KoefVar = document.getElementById('koef-var');

const dataInput = document.querySelectorAll('.data-input');

const tableOne = document.getElementById('data-1');
const tableTwo = document.getElementById('data-2');

// window.addEventListener('keydown', function(e) {
//   if(e.code == 32 && e.target == document.body) {
//     e.preventDefault();
//   }
// });



window.onkeydown = function(e) { 
  return !(e.keyCode == 32 && e.target == document.body);
}; 



var ROquantity = 0;
var RZquantity = 0;
var correctQuantity = 0;
var Qcounter = 0;

var timerId, id1;
var flag = false;
var shift = 0;
// var lever = 0;
var indexCount = 0;
var AvgReationArr = [];
function moving (side) {
  let count = 0; 

  if ( side === 0 ) {
    shift = -600;
    var lever = 1;
    let timerId = setInterval(() => { 
      document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && lever === 1 ) {
          // console.log('2', shift);
          if ( Qcounter === 0 ) {
            if ( shift > 300 && shift <= 600 ) {
              RZquantity++;
              // console.log('000RZ++');
              indexCount++;
            } else if ( shift == 300 ) {
              correctQuantity++;
              // console.log('000correct++');
              indexCount++;
            } else if ( shift > 0 && shift < 300 ) {
              ROquantity++;
              // console.log('000RO++', shift);
              indexCount++;
            } 
            if ( shift > 0 && shift <= 600 ) {
              AvgReationArr.push(((shift-300)/10)*15);
            }
            
            Qcounter++;
          }
          
          lever = 0;
          flag = true;
          clearInterval(timerId);

        }
      });
    count++;
    if ( count <= 120 ) {
      stimul.setAttribute('style', `transform: translate(${shift+10}px) !important;`);
      shift = shift + 10;
    } else {
      clearInterval(timerId);
    }
    },15);






  } else {
    shift = 600;
    var lever = 2;
    timerId = setInterval(() => { 
      
      document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && lever === 2) {
          if ( Qcounter === 0 ) {
            if ( shift < -300 && shift > -600 ) {
              RZquantity++;
              // console.log('111RZ++');
              indexCount++;
            } else if ( shift === -300) {
              correctQuantity++;
              indexCount++;
              // console.log('111correct++');
            } else if ( shift < 0 && shift > -300 ) {
              ROquantity++;
              indexCount++;
              // console.log('111RO++');

            }
            if ( shift < 0 && shift >= -600 ) {
              AvgReationArr.push(((0-shift-300)/10)*15);
            }
            Qcounter++;
            
          }
          lever = 0;
          flag = true;
          clearInterval(timerId);      
        }
      });
    count++;
    if ( count <= 120 ) {
      stimul.setAttribute('style', `transform: translate(${shift-10}px) !important;`);
      shift = shift - 10;
    } else {
      clearInterval(timerId);
    }
    },15);
  }


}
document.addEventListener('keyup', function(event) {
  if (event.code === 'Space') {
    if ( flag === true ) {
      flag = false;
      Qcounter = 0;
      firstGate.classList.remove('gate-right');
      secondGate.classList.remove('gate-right');
      firstGate.classList.remove('gate-left');
      secondGate.classList.remove('gate-left');
      start(getRandomSide());
    }    
  }
})



function getRandomSide() {
  // return 0
  return Math.floor(Math.random() * 2);
}

function start(side) {

  if ( indexCount < 6 ) {
    if ( side === 0 ) { // RIGHT
      firstGate.classList.add('gate-right');
      secondGate.classList.add('gate-right');
      stimul.setAttribute('style', 'transform:translate(-600px) !important; ');
      moving(side);
    } else { // LEFT
      firstGate.classList.add('gate-left');
      secondGate.classList.add('gate-left');
      stimul.setAttribute('style', 'transform:translate(600px) !important; ');
      moving(side);
    }
  } else {
    stimul.setAttribute('style', 'transform:translate(0px) !important; ');

    console.log('arr', AvgReationArr);

    let tmp = 0; let zeros = 0; let RoTime = [];
    for(let i = 0 ; i < AvgReationArr.length; i++){
      tmp += AvgReationArr[i];
      if ( AvgReationArr[i] === 0 ) zeros++;
      if ( AvgReationArr[i] < 0 ) {
        RoTime.push(AvgReationArr[i]);
      }

    }
    correctReactionOne.innerHTML = zeros;
    probeOneAvg.innerHTML = Math.abs(tmp/AvgReationArr.length);
    ROquantityOne.innerHTML = ROquantity;
    ROavgTimeOne.innerHTML = Math.abs(RoTime.reduce((a,b) => a + b, 0) / RoTime.length);
    RoMinOne.innerHTML = Math.abs(Math.max(...RoTime));
    RoMaxOne.innerHTML = Math.abs(Math.min(...RoTime));
    RoRazOne.innerHTML = Math.abs(Math.abs(Math.max(...RoTime))-Math.abs(Math.min(...RoTime)));
   

    let mut = 0; let ROinDia = 0;
      for(let i = 0; i < RoTime.length; i++) {
        mut += Math.pow(RoTime[i]-RoTime.reduce((a,b) => a + b, 0) / RoTime.length, 2) ;
        
      }
      mut = Math.sqrt(mut / RoTime.length);
    RoSkoOne.innerHTML = mut.toFixed(5);
    RoKoefVarOne.innerHTML = ((mut/Math.abs(RoTime.reduce((a,b) => a + b, 0) / RoTime.length)*100)).toFixed(2);

    for(let i = 0; i < RoTime.length; i++) {
      if ( parseInt(Math.abs(RoTime.reduce((a,b) => a + b, 0) / RoTime.length)+mut) > 0-RoTime[i] && 0-RoTime[i] > Math.abs(Math.abs(RoTime.reduce((a,b) => a + b, 0) / RoTime.length)-mut.toFixed(5))) {
        ROinDia++;
      } 
      // console.log(parseInt(Math.abs(RoTime.reduce((a,b) => a + b, 0) / RoTime.length)+mut.toFixed(5)));
      // console.log(0-RoTime[i]);
      // console.log(Math.abs(Math.abs(RoTime.reduce((a,b) => a + b, 0) / RoTime.length)-mut.toFixed(5)));
    }
    RoQuantityIn.innerHTML = ROinDia;
    RoQuantityOut.innerHTML = ROquantity-ROinDia;

    RoPercentOut.innerHTML = (((ROquantity-ROinDia)/ROquantity)*100).toFixed(2);
    /*------------------------------------------------------------------------*/
    tmp = 0;  let RzTime = [];
    for(let i = 0 ; i < AvgReationArr.length; i++){
      tmp += AvgReationArr[i];
      if ( AvgReationArr[i] > 0 ) {
        RzTime.push(AvgReationArr[i]);
      }

    }

    probeOneAvg.innerHTML = Math.abs(tmp/AvgReationArr.length);
    RZquantityOne.innerHTML = RZquantity;
    RZavgTimeOne.innerHTML = Math.abs(RzTime.reduce((a,b) => a + b, 0) / RzTime.length);
    RzMinOne.innerHTML = Math.abs(Math.min(...RzTime));
    RzMaxOne.innerHTML = Math.abs(Math.max(...RzTime));
    RzRazOne.innerHTML = Math.abs(Math.abs(Math.max(...RzTime))-Math.abs(Math.min(...RzTime)));
   

    mut = 0; let RZinDia = 0;
      for(let i = 0; i < RzTime.length; i++) {
        mut += Math.pow(RzTime[i]-RzTime.reduce((a,b) => a + b, 0) / RzTime.length, 2) ;
        
      }
      mut = Math.sqrt(mut / RzTime.length);
    RzSkoOne.innerHTML = mut.toFixed(5);
    RzKoefVarOne.innerHTML = ((mut.toFixed(5)/Math.abs(RzTime.reduce((a,b) => a + b, 0) / RzTime.length))*100).toFixed(2);

    for(let i = 0; i < RzTime.length; i++) {
      if ( parseInt(Math.abs(RzTime.reduce((a,b) => a + b, 0) / RzTime.length)+mut) > RzTime[i] && RzTime[i] > Math.abs(Math.abs(RzTime.reduce((a,b) => a + b, 0) / RzTime.length)-mut.toFixed(5))) {
        RZinDia++;
      } 

    }
    RzQuantityIn.innerHTML = RZinDia;
    RzQuantityOut.innerHTML = RZquantity-RZinDia;

    RzPercentOut.innerHTML = (((RZquantity-RZinDia)*100)/RZquantity).toFixed(2);
    /*-----*/
    AvgIn.innerHTML = (((ROinDia/ROquantity) + (RZinDia/RZquantity))/2)*100;
    KoefVar.innerHTML = (parseInt(RoKoefVarOne.innerText)+parseInt(RzKoefVarOne.innerText))/2;

    

    for(let i = 0; i < AvgReationArr.length; i++) {
      tableTwo.innerHTML += `<tr>
      <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="21" align="center" valign=middle sdval="1" sdnum="1033;"><font color="#000000">${i+1}</font></td>
      <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle class="data-input"><font color="#000000"><br></font></td>
      </tr>
      `;
      document.querySelectorAll('.data-input')[i].innerHTML = AvgReationArr[i];
    }

    probeNumber.innerText = AvgReationArr.length;
    tableOne.classList.remove('hid');
    tableTwo.classList.remove('hid');

  }

  return
  
}




var counter = 0;

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    hint.classList.add('hidden');
    if ( counter === 0 ){
      counter++;
      start(getRandomSide());

      
    }
  }
});


