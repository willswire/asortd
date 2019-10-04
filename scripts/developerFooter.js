const DEVELOPERS = [
    {
        "name": "Muhammet Aydin",
        "email": "muhammet@udel.edu"
    },
    {
        "name": "Scott Benton",
        "email": "scott.ma.benton@gmail.com"
    },
    {
        "name": "CJ Lambert",
        "email": "clambert@udel.edu"
    },
    {
        "name": "Connor Onweller",
        "email": "onweller@udel.edu"
    },
    {
        "name": "Will Walker",
        "email": "wwalker@udel.edu"
    }
];

$(() => {
    const developerHTML = DEVELOPERS.map((developer) => {
        return '<button class="developer-holder" onclick="openMailTo(\'' + developer.email + '\')">'+ developer.name + '<i class="fas fa-envelope mailto-button"></i></button>';
    })
    $("#developer-div").html(developerHTML);
    
})

function openMailTo(email){
    window.location.href = 'mailto:' + email;
}