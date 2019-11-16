// Information about the building. 

export const BUILDING = "Otakaari 18 A";

export const RESIDENTS = [
    {
        floor: 1,
        tenants: [
            { names: ["Ellie Example"], number: 1 },
            { names: ["Anna Asuntäällä"], number: 2 },
        ],
    },
    {
        floor: 2,
        tenants: [
            { names: ["Jaakko Jokunen"], number: 3 },
            { names: ["Teemu Tottakai"], number: 4 },
        ],
    },
    {
        floor: 3,
        tenants: [
            { names: ["Assi Asukas", "Anssi Asuja"], number: 5 },
            { names: ["Timo Talonpoika"], number: 6 },
        ],
    },
];

export const MESSAGES = [
    {
      text: "Hey all! I'm planning on having friends over on Friday 23.11., sorry if we make too much noise! We'll leave around 23.",
      from: "Teemu from A4",
      important: false,
    },
    {
        text: "There will be a break in the availability of hot water in 19.11. between 8–12. Sorry for the inconvenience.",
        from: "AYY",
        important: true,
    },
    {
        text: "Hi! I think I dropped my a glove in the hall last week, if someone happened to pick it up could you please drop it to my mailbox?",
        from: "Assi, A5",
        important: false,
    },
];