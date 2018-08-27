window.onload = function() {
    var clocksDiv = document.getElementById('clocks');
    var wrapper = document.createElement('div');
    var canvas = document.createElement('canvas');
    var canvas2 = document.createElement('canvas');
    clocksDiv.appendChild(wrapper);
    wrapper.appendChild(canvas);
    wrapper.appendChild(canvas2);
    wrapper.class = 'wrapper';
    
    var context = canvas.getContext('2d');
    var context2 = canvas2.getContext('2d');
    
    var size = 500;
    var cSize = size * 1.1; // canvas size
    var center = cSize / 2;
    var radByMin = 2*Math.PI/60;
    var hands = {
        'hour': new hand('hour', size / 4, 5, 'black', radByMin * 5, center),
        'min': new hand('min', size / 2, 2, 'black', radByMin, center),
        'sec': new hand('sec', size / 2, 2, 'red', radByMin, center),
    };
    
    canvas.width = cSize;
    canvas.height = cSize;
    canvas2.width = cSize;
    canvas2.height = cSize;
    
    for (var i = 0; i < 60; i++) {
        angle = i * radByMin;
        if(i % 5 == 0) {
            length_in = center * .9;
            context2.lineWidth = 2;
        }
        else {
            length_in = center * .95;
            context2.lineWidth = 1;
        }
        coords_in = getCoords(center, center, angle, length_in)
        length_out = center;
        coords_out = getCoords(center, center, angle, length_out)
        context2.beginPath();
        context2.moveTo(coords_in.x, coords_in.y);
        context2.lineTo(coords_out.x, coords_out.y);
        context2.stroke();
    };
    
    var interval = setInterval(animate, 1000/30);
    function animate() {
        now = new Date();
        ms = now.getMilliseconds();
        s = now.getSeconds() + ms/1000;
        m = now.getMinutes() + s/60;
        h = now.getHours() + m/60;
        now = {
            'hour': h,
            'min': m,
            'sec': s,
        }
        
        context.clearRect(0,0, cSize,cSize);
        
        for (var aHand in hands) {
            hands[aHand].draw(context, now[aHand]);
        };
    }
};

function hand(name, length, width, color, radByUnit, center) {
    this.name = name;
    this.length = length;
    this.width = width;
    this.color = color;
    this.radByUnit = radByUnit;
    this.center = center;
    
    this.draw = function(context, unit) {
        angle = unit * this.radByUnit;
        coords = getCoords(this.center, this.center, angle, this.length);
        
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.beginPath();
        context.moveTo(this.center, this.center);
        context.lineTo(coords.x,coords.y);
        context.stroke();
    };
}

function getCoords(x,y, angle, length) {
    return {
        'x': x + length * Math.sin(angle),
        'y': y - length * Math.cos(angle),
    }
}