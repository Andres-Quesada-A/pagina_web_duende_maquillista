export const location = {
  provinces: [
    {
      name: "San José",
      cantons: [
        {
          name: "San José",
          districts: [
            { name: "Carmen", metropolitanArea: true },
            { name: "Merced", metropolitanArea: true },
            { name: "Hospital", metropolitanArea: true },
            { name: "Catedral", metropolitanArea: true },
            { name: "Zapote", metropolitanArea: true },
          ],
        },
        {
          name: "Escazú",
          districts: [
            { name: "Escazú", metropolitanArea: true },
            { name: "San Antonio", metropolitanArea: true },
            { name: "San Rafael", metropolitanArea: true },
          ],
        },
      ],
    },
    {
      name: "Alajuela",
      cantons: [
        {
          name: "Alajuela",
          districts: [
            { name: "Alajuela", metropolitanArea: true },
            { name: "San José", metropolitanArea: true },
            { name: "Carrizal", metropolitanArea: true },
            { name: "San Antonio", metropolitanArea: true },
          ],
        },
        {
          name: "San Ramón",
          districts: [
            { name: "San Ramón", metropolitanArea: false },
            { name: "Santiago", metropolitanArea: false },
            { name: "San Juan", metropolitanArea: false },
            { name: "Piedades Norte", metropolitanArea: false },
            { name: "Piedades Sur", metropolitanArea: false },
          ],
        },
      ],
    },
  ],
};
