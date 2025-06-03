// p5.js Setup for Trajectory
        let trajectory = [];
        let simulationRunning = false;
        let time = 0;
        let ballX = 46;
        let ballY = 46;
        let tableImg;
        const tableImgElement = document.getElementById('table');
        const height1 = tableImgElement.clientHeight;
        let ballImg;
        const ballImgElement = document.getElementById('ball');
        const ballheight = ballImgElement.clientHeight;
        const ballwidth = ballImgElement.clientWidth;
        let g = 9.81; // Gravity (m/s²)

        function setup() {
            let canvas = createCanvas(300, 280);
            canvas.parent('graph-canvas');
            tableImg = select('#table'); 
            ballImg = select('#ball');
            background(255);
            
        }

        function draw() {
            background(255);
            stroke(0);
            fill(0);
            textSize(10);
            text('Projectile Trajectory', 150, 10);
            text('Distance(m)', 150, height/1);
            push();
            translate(10,150);
            rotate(-PI / 2);
            textAlign(CENTER, CENTER);
            text('Height(m)', 0, 0);
            pop();
            push();
            stroke(0, 0, 255);
            noFill();
            beginShape();
            for (let pos of trajectory) {
                vertex( 20+ pos.x * 10, 300 - pos.y * 40);
            }
            endShape();

            if (simulationRunning) {
                let v0 = parseFloat($('#velocity').val());
                let theta = parseFloat($('#angle').val()) * PI / 180;
                let h0 = parseFloat($('#height').val());
                let vx = v0 * cos(theta);
                let vy = v0 * sin(theta);

                time += 0.02;
                let x = vx * time;
                let y = h0 + vy * time - 0.5 * g * time * time;

                ballX = 0 + x * 10;
                ballY = 13 - (20 + h0 * 20 + y * 15);
                $('#ball').css({ left: ballX + 'px', top: ballY + 'px' });

                trajectory.push({ x, y });

                if (y <= 0) {
                    simulationRunning = false;
                    $('#ball').addClass('hidden');
                    let totalTime = (vy + sqrt(vy * vy + 2 * g * h0)) / g;
                    let range = vx * totalTime;
                    let maxHeight = h0 + (vy * vy) / (2 * g);
                    $('#results-content').show();
                    $('#time-taken').text(totalTime.toFixed(2));
                    $('#distance').text(range.toFixed(2));
                    $('#max-height').text(maxHeight.toFixed(2));
                }
            }
        }

        $(document).ready(function() {
            // Toggle Checkboxes
            $('#variables-toggle').change(function() {
                $('#variables-content').toggle(this.checked);
            });
           $('#graphs-toggle').change(function() {
                $('#graphs-content').toggle(this.checked);
            });
            $('#results-toggle').change(function() {
                $('#results-content').toggle(this.checked);
            });

            // Update Slider Values
            $('#velocity').on('input', function() {
                $('#velocity-value').text(this.value);
            });
            $('#angle').on('input', function() {
                $('#angle-value').text(this.value);
                $('#cannon').css('transform', `rotate(${+20-this.value}deg)`);
                $('#ball').css('transform', `rotate(${-this.value}deg)`);
            });
            $('#height').on('input', function() {
                $('#height-value').text(this.value);
                let tableY = 10 - (5 + this.value * 15);
                let cannonY = tableY - 16;
                ballX = 0;
                ballY = 13 - (20 + this.value * 10);
                //tableImg.position(1,0);
                //tableImg.size(1,height1+(tableY));
                
                //$('#table').css('bottom', (20 + this.value * 5) + 'px');
                 $('#cannon').css('bottom', (46 + this.value * 10) + 'px');
               // $('#ball').css('bottom', (75 + this.value * 10) + 'px');
                //$('#cannon').css({ left: ballX + 'px', top: ballY + 'px' });
                $('#ball').css({ left: ballX + 'px', top: ballY + 'px' });
            });

            // Start and Reset Buttons
            $('#start-btn').click(function() {
                if (!simulationRunning) {
                    simulationRunning = true;
                    trajectory = [];
                    time = 0;
                    ballX = 0;
                    ballY = 13 - (20 + parseFloat($('#height').val()) * 10);
                    $('#ball').removeClass('hidden').css({ left: ballX + 'px', top: ballY + 'px' });
                    //$('#ball').css({ left: ballX + 'px', top: ballY + 'px' });
                
                }
            });
            $('#reset-btn').click(function() {
                simulationRunning = false;
                trajectory = [];
                time = 0;
                ballX = 0;
                ballY = 15 - (20 + parseFloat($('#height').val()) * 10);
               $('#ball').addClass('hidden').css({ left: ballX + 'px', top: ballY + 'px' });
                //$('#ball').css({ left: ballX + 'px', top: ballY + 'px' });
                 //ballImg.position(ballX,ballY);
                 //ballImg.size(ballwidth,ballheight);
                //tableImg.size(1,height1+(tableY));
                //tableImg.size(1,height1+(tableY));
                $('#results-content').hide();
                $('#results-content').hide();
                $('#time-taken').text('0');
                $('#distance').text('0');
                $('#max-height').text('0');
                background(255);
            });
        });