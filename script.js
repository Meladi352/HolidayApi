function calculatePay() {
    const hourlyRate = parseFloat(document.getElementById('salary').value);
    const hoursWorked = parseInt(document.getElementById('hour').value);
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const country = document.getElementById('country').value;

   
    const userFormattedDate = `${month}/${day}/${year}`;

   
    const apiUrl = `https://holidays.abstractapi.com/v1/?api_key=0309b2c40d2e47828e24f2db3cc6925f&country=${country}&year=${year}&month=${month}&day=${day}`;

   
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {

            const isHoliday = data.some(event => event.date === userFormattedDate);
            const payMultiplier = isHoliday ? 2 : 1; 

            const totalPay = hourlyRate * hoursWorked * payMultiplier;
            document.getElementById('result').innerText = `Maximum salary: ${totalPay} `;
        })
        .catch(error => {
            console.error('Error when retrieving holiday data:', error);
            document.getElementById('result').innerText = 'Error when retrieving holiday data.';
        });
}
