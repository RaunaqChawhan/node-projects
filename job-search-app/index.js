// General job search --> https://jobs.github.com/positions.json?markdown=true
// job search through location --> https://jobs.github.com/positions.json?markdown=true&location=usa
// job related to particular technology --> https://jobs.github.com/positions.json?markdown=true&search=node

const Table = require("cli-table");
const axios = require("axios");
const yargs = require('yargs');

const table = new Table({
    head: ["Company Name", "Job Role", "Location", "Full Time", "Job Description"],
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': '|' },
    colWidths: [25, 30, 20, 11, 72],
    style: {
        head: ['bgBlue', 'white', 'bold'],
        border: ['yellow']
    }
});

// Create a default search command
yargs.command({
    command: 'searchAll',
    describe: 'Default search',
    handler() {
        axios.get("https://jobs.github.com/positions.json?markdown=true").
        then(response => {
            response.data.forEach(jobData => {
                table.push(
                    [jobData.company, jobData.title, jobData.location, jobData.type, jobData.url]
                    );
                });
                
                console.log(table.toString());
            });
    }
});

//Create a searchByLocation command
yargs.command({
    command: "searchByLocation",
    describe: "Job search by location",
    builder: {
        location: {
            describe: "Location",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        axios.get(`https://jobs.github.com/positions.json?markdown=true&location=${argv.location}`).
        then(response => {
            response.data.forEach(jobData => {
                table.push(
                    [jobData.company, jobData.title, jobData.location, jobData.type, jobData.url]
                    );
                });

                console.log(table.toString());
            });
    }
});

// Create a searchByTech command
yargs.command({
    command: "searchByTech",
    describe: "Job search by technology",
    builder: {
        technology: {
            describe: "Technology",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        axios.get(` https://jobs.github.com/positions.json?markdown=true&search=${argv.technology}`).
        then(response => {
            response.data.forEach(jobData => {
                table.push(
                    [jobData.company, jobData.title, jobData.location, jobData.type, jobData.url]
                    );
                });
                
                console.log(table.toString());
            });
    }
});

// Create a search by location and technology
yargs.command({
    command: "search",
    describe: "Job search by location and technology",
    builder: {
        location: {
            describe: "Location",
            demandOption: true,
            type: 'string'
        },
        technology: {
            describe: "Technology",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        axios.get(` https://jobs.github.com/positions.json?markdown=true&location=${argv.location}&search=${argv.technology}`).
        then(response => {
            response.data.forEach(jobData => {
                table.push(
                    [jobData.company, jobData.title, jobData.location, jobData.type, jobData.url]
                    );
                });
                
                console.log(table.toString());
            });
    }
})

yargs.argv;