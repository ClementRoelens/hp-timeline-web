const dataFile = '../assets/data.csv';
const reader = new FileReader();

reader.onload = e => {
        const arrayBuffer = e.target.result;
        const array = new Uint8Array(arrayBuffer);
};

