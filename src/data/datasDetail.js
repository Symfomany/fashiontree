export const headers = [
  {
    text: '',
    align: 'left',
    value: 'name',
  },
  {
    text: '2016',
    align: 'center',
    value: '2016',
  },
  {
    text: '2017',
    align: 'center',
    value: '2017',
  },
  {
    text: '2018',
    align: 'center',
    value: '2018',
  },
  {
    text: 'Benchmark',
    align: 'center',
    value: 'benchmark',
  },
];

export const desserts = [
  {
    name: 'Frozen Yogurt',
    category: 'Labelisation et Certification',
    poid: 12,
  },
  {
    name: "Engagement et politique ESG de l'administrateur du bien",
    category: 'Gouvernance',
  },
  {
    name: "Engagements et politiques ESG de l'administrateur du bien",
    category: 'Social',
    poid: 10,
  },
  {
    name: "Politiques ESG de l'administrateur du bien",
    category: 'Environement',
    poid: 12,
  },
  {
    name: 'Gingerbread',
    category: 'Environement',
    poid: 12,
  },
  {
    name: 'Jelly bean',
    category: 'Social',
    poid: 11,
  },
  {
    name: 'Lollipop',
    category: 'Gouvernance',
    poid: 12,
  },
  {
    name: 'Honeycomb',
    category: 'Labelisation',
    poid: 8,
  },
  {
    name: 'Donut',
    category: 'Labelisation',
    poid: 11,
  },
  {
    name: 'KitKat',
    category: 'Social',
    poid: 15,
  },
];

export const entreprises = [
  {
    id: 1,
    name: "Ephad les hespérides des monts d'or",
    sector: 'Immobilier médical',
    noteG: 76,
    notes: {
      2018: 75,
      2017: 60,
      2016: 50,
    },
    familles: [
      {
        title: 'Labelisation et certification',
        note: {
          2016: 70,
          2017: 60,
          2018: 80,
        },
        benchmark: 90,
        subfamilles: [
          {
            title: 'Labelisation et certification',
            note: {
              2016: 20,
              2017: 30,
              2018: 70,
            },
            benchmark: 68,
          },
        ],
      },

      {
        title: 'Gouvernance',
        note: {
          2016: 30,
          2017: 20,
          2018: 60,
        },
        benchmark: 20,
        subfamilles: [
          {
            title: "Engagements et politiques ESG de l'aministrateur du bien",
            note: {
              2016: 40,
              2017: 70,
              2018: 50,
            },
            benchmark: 68,
          },
          {
            title: 'Engagements et politiques ESG des exploitants',
            note: {
              2016: 20,
              2017: 30,
              2018: 80,
            },
            benchmark: 37,
          },
          {
            title: 'Sensibilisation des visiteurs',
            note: {
              2016: 70,
              2017: 50,
              2018: 60,
            },
            benchmark: 80,
          },
        ],
      },

      {
        title: 'Social',
        note: {
          2016: 30,
          2017: 20,
          2018: 60,
        },
        benchmark: 80,
        subfamilles: [
          {
            title: 'Santé - Sécurité',
            note: {
              2016: 20,
              2017: 30,
              2018: 20,
              benchmark: 78,
            },
          },
          {
            title: 'Santé - Sécurité',
            note: {
              2016: 30,
              2017: 70,
              2018: 40,
              benchmark: 25,
            },
          },
          {
            title: 'Gestion des impacts sociétaux',
            note: {
              2016: 50,
              2017: 30,
              2018: 90,
              benchmark: 70,
            },
          },
        ],
      },

      {
        title: 'Environement',
        note: {
          2016: 30,
          2017: 20,
          2018: 60,
        },
        benchmark: 60,
        subfamilles: [
          {
            title: 'Energie',
            note: {
              2016: 20,
              2017: 80,
              2018: 50,
              benchmark: 58,
            },
          },
          {
            title: 'Emission de gaz à effet de serre',
            note: {
              2016: 60,
              2017: 20,
              2018: 30,
              benchmark: 75,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Commerce Immo',
    sector: 'Immobilier commercial',
    noteG: 37,
    notes: {
      2018: 35,
      2017: 50,
      2016: 20,
    },
    benchmark: 55,
    familles: [
      {
        title: 'Gouvernance',
        note: {
          2016: 20,
          2017: 10,
          2018: 50,
        },
        benchmark: 80,
        subfamilles: [
          {
            title: "Engagements et politiques ESG de l'aministrateur du bien",
            note: {
              2016: 20,
              2017: 40,
              2018: 10,
            },
            benchmark: 28,
          },
          {
            title: 'Sensibilisation des visiteurs',
            note: {
              2016: 60,
              2017: 45,
              2018: 10,
            },
            benchmark: 60,
          },
        ],
      },

      {
        title: 'Labelisation et certification',
        note: {
          2016: 20,
          2017: 40,
          2018: 90,
        },
        benchmark: 20,
        subfamilles: [
          {
            title: 'Labelisation et certification',
            note: {
              2016: 80,
              2017: 50,
              2018: 40,
            },
            benchmark: 58,
          },
        ],
      },

      {
        title: 'Social',
        note: {
          2016: 30,
          2017: 20,
          2018: 60,
        },
        benchmark: 65,
        subfamilles: [
          {
            title: 'Santé - Sécurité',
            note: {
              2016: 20,
              2017: 30,
              2018: 20,
            },
            benchmark: 78,
          },
          {
            title: 'Santé - Sécurité',
            note: {
              2016: 30,
              2017: 70,
              2018: 40,
            },
            benchmark: 25,
          },
          {
            title: 'Gestion des impacts sociétaux',
            note: {
              2016: 50,
              2017: 30,
              2018: 90,
            },
            benchmark: 70,
          },
        ],
      },
    ],
  },
];
