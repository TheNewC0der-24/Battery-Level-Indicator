initBattery();

function initBattery() {
    const batteryLiquid = document.querySelector('.battery-liquid'),
        batteryStatus = document.querySelector('.battery-status'),
        batteryPercentage = document.querySelector('.battery-percentage');

    navigator.getBattery().then((battery) => {
        updateBattery = () => {
            //! Update the number of battery percentage
            let level = Math.floor(battery.level * 100);
            batteryPercentage.innerHTML = level + '%';

            //! Update the background color of the battery
            batteryLiquid.style.height = `${parseInt(battery.level * 100)}%`;

            //! Validate full battery, low battery and charging

            //~ When the battery is full 
            if (level === 100) {
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`;
                batteryLiquid.style.height = '103%';
            } else if (level <= 20 & !battery.charging) {
                //~ When the battery is low
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
            } else if (battery.charging) {
                //~ When the battery is charging
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
            } else {
                //~ When the battery is normal
                batteryStatus.innerHTML = '';
            }

            //! Change the color of the battery and remove other colors
            if (level <= 20) {
                batteryLiquid.classList.add('gradient-color-red');
                batteryLiquid.classList.remove('gradient-color-orange', 'gradient-color-yellow', 'gradient-color-green');
            } else if (level <= 40) {
                batteryLiquid.classList.add('gradient-color-orange');
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-yellow', 'gradient-color-green');
            } else if (level <= 80) {
                batteryLiquid.classList.add('gradient-color-yellow');
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-green');
            } else {
                batteryLiquid.classList.add('gradient-color-green');
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-yellow');
            }
        }
        updateBattery();

        //& Battery events
        battery.addEventListener('chargingchange', () => { updateBattery(); });
        battery.addEventListener('levelchange', () => { updateBattery(); });
    });
}
